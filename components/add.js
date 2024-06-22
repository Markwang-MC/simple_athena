import {useEffect,useState,useRef} from "react"
import openDB from "../lib/indexdb"
import query from './query';
import textanalyze from './textanalyze';

import JSZip from 'jszip';

export default function Add({data,setData}) {
  let input = useRef(null)
  return (
    <div onContextMenu={()=>{
      openDB()
      .then((_db)=>{
        _db.clear_table({
          tableName: 'blobs'
        })
        setData(null)
        console.log('clear');
      })
    }} onClick={()=>input.current.click()}>
    <div className='w-[100vw] py-1 mb-10 text-center text-4xl bg-black text-white '> + </div>
    <input ref={input} className="hidden block border-2 border-solid" type='file' multiple placeholder='files' name="files" onChange={(e)=>{
      // openDB()
      // .then((_db)=>{
      //   _db.clear_table({
      //     tableName: 'blobs'
      //   })
      //   console.log('clear');
      // })
      //
      // return ;
      e.preventDefault()
      let form = e.target
      let _files = form.files[0]
      const zip = new JSZip();

      Promise.all([_files])
      .then((data)=>{
        const reader = new FileReader();
        reader.onload = function (e) {
          zip.loadAsync(_files).then((zip)=>{
            let files = Object.keys(zip.files)
            let textfiles = []
            files = files.map((item)=>{
              return zip.files[item];
            })


            Promise.all([files])
            .then((data)=>{
              data = data[0]
              let _arr = []
              data.map((item)=>{
                if (item.name.indexOf('.srt')>-1) {
                  _arr.push({title:item.name.split('.srt')[0]})
                  _arr.push(item)
                  data.map((audioname)=>{
                    if (audioname.name.indexOf(item.name.split('.srt')[0])>-1&&audioname.name.indexOf('.srt')<0) _arr.push(audioname)
                  })
                }
              })

              _arr = _arr.map((item)=>{
                if (item.name&&item.name.indexOf('.srt')>-1) return item.async('text')
                else if (item.name)return item.async('blob')
                return item;
              })
              // console.log(_arr);
              Promise.all([..._arr])
              .then((newdata)=>{
                newdata = newdata.map((item,i)=>{
                  if (typeof item=='string') return textanalyze(item,'chapters')
                  if (item.title) return item.title;
                  return item;
                })
                let _blobs = []
                for (var i = 0; i < newdata.length; i+=3) {
                  _blobs.push({id:newdata[i],title:newdata[i],text:newdata[i+1],audio:newdata[i+2]})
                }
                let db;
                openDB()
                .then((_db)=>{
                  db = _db
                  return query(_db,'blobs',()=>true)
                })
                .then((_data)=>{
                  if (data[data.length-1].num) {
                    _blobs = _blobs.map((item,i)=>{
                      item.num = data[data.length-1].num+1+i+1
                      return item
                    })
                  }
                  else {
                    _blobs = _blobs.map((item,i)=>{
                      item.num = i+1
                      return item;
                    })
                  }
                  console.log([..._data,..._blobs]);
                  setData([..._data,..._blobs])
                  db.insert({
                    tableName: 'blobs',
                    data: _blobs,
                    success: () => console.log('添加成功'),
                  });
                })

              })
            })
          })

        }
        reader.readAsArrayBuffer(_files);


      })
    }}/>

    </div>
  )
}
