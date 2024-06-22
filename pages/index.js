import {useRef,useEffect,useState} from 'react'
import Add from '../components/add'
import Page from '../components/page'

import openDB from "../lib/indexdb"
import query from '../components/query';
import AudioControls from '../components/audioControls'

export default function Index() {
  const [data,setData] = useState(null)
  const [page,setPage] = useState(null)

  const [audio,setAudio] = useState(null)
  useEffect(()=>{
    openDB()
    .then((_db)=>query(_db,'blobs',()=>true))
    .then((_data)=>{
      for (var i = 0; i < _data.length; i++) {
        if (_data[i+1]&&_data[i].num<_data[i+1].num) {
          let _item = _data[i]
          _data[i] = _data[i+1]
          _data[i+1] = _item
        }
      }
      setData(_data)
    })
  },[])

  if (page) return <Page text={page.text} audio={page.audio} setPage={setPage} page={page}/>;
  return (
    <div className=' w-[100vw] min-h-[100vh]'>
      <Add data={data} setData={setData}/>
      <div className='md:space-y-40 space-y-10 flex flex-col md:text-4xl text-sm place-items-center'>
        {
          data&&data.map((item,i)=>{
            return (
              <div key={i} className='underline font-bold' onClick={()=>setPage(item)}>
                <span>{item.num}: </span>
                <span>{item.title.replace(/_/g,' ')}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

// suno.com
