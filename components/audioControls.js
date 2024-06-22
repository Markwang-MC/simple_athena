import Progress from './progress'
export default function AudioControls({id,data,audio,player,setTitle,setAudio,refresh,setRefresh}) {
  return (
    <div className='py-5 md:flex space-x-40'>
      <div className='flex place-items-center space-x-5'>
        <div onClick={()=>{
          player.pause()
          setAudio({id:id-1,item:data[id-1]})
          setTitle(data[id-1].name)
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-[25px] w-[25px] bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>
        </div>

        <div onClick={(e)=>{
          player.paused?player.play():player.pause()
          setRefresh(!refresh)
        }}>
          {
            player.paused?(
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-[25px] w-[25px] bi bi-play-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
              </svg>
            ):(
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-[25px] w-[25px] bi bi-pause-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>
              </svg>
            )
          }
        </div>
        <div onClick={()=>{
          player.pause()
          setAudio({id:id+1,item:data[id+1]})
          setTitle(data[id+1].name)
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-[25px] w-[25px] bi bi-arrow-right-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
          </svg>
        </div>

      </div>
    </div>
  )
}
