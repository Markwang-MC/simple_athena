import {useRef,useEffect,useState} from 'react'
import Progress from './progress'
export default function Page({text,audio,setPage,page}) {
  const [index,setIndex] = useState(0)
  const [player,setPlayer] = useState(null)
  const [search,setSearch] = useState(null)

  useEffect(()=>{
    let _audio = document.createElement('audio')
    _audio.src = URL.createObjectURL(audio)
    _audio.oncanplay=function () {
      setPlayer(_audio)
      console.log(page);
      setIndex(JSON.parse(localStorage.getItem(page.id)))
    }
    console.log(text);
  },[])

  useEffect(()=>{
    if (!player) return ;
    function fn() {
      let _cTime = player.currentTime
      let _nTime
      _nTime = text[index+1].time
      localStorage.setItem(page.id,index.toString())
      if (_cTime<_nTime)return
      if(index==text.length-1){
        setIndex(0)
        return
      }
      setIndex(index+1)
    }

    player.addEventListener('timeupdate',fn)

    let ele=document.getElementById(index)
    if(ele){
      ele.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
    return ()=>{
      player.removeEventListener('timeupdate',fn)
    }
  },[index,player])
  if (!player) return <>loading....</>;
  return (
    <div>
      <div className='bg-purple-100 w-full flex place-items-center place-content-center h-[40px] fixed top-0 z-[10000]' onTouchStart={(e)=>{
        e.target.start=e.targetTouches[0].clientX
      }} onTouchEnd={(e)=>{
        var start = e.target.start
        var end = e.changedTouches[0].clientX
        if (end-start>20) {
          player.pause()
          setPlayer(null)
          setPage(null)
        }
      }}>
        <div className='text-sm'>{page.title}</div>
        <Progress {...{index,audio:player,setIndex:setIndex,txt:text,type:'book'}}/>
      </div>

      <div className={`${search?'block':'hidden'} bottom-0 text-center bg-purple-100 w-full h-[30px] fixed z-[10000]`}>
        <a target="_blank" onClick={()=>window.open(`https://cn.bing.com/dict/search?q=${search}&FORM=BDVSP2&qpvt=${search}`)}>{search}</a>
      </div>
      <div className='pt-[30px] px-[10%] md:space-y-10 space-y-4'>
        {
          text.map((item,i)=>{
            return (
              <div id={i} key={i} className={`${index==i?'text-sky-600	font-semibold':''} rounded my-2 px-5 py-2`} onClick={()=>{
                if (index==i) {
                  player.paused?player.play():player.pause()
                }
                else player.play()
                player.currentTime = item.time
                setIndex(i)
                if (search) setSearch(null)
              }} onContextMenu={()=>setSearch(window.getSelection().toString())}>
                {item.text}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
