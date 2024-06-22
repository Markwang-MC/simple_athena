import Link from 'next/link';
export default function Button({src,title,type}) {
  if (type='a') return (
    <a href={src} target="_blank" className="m-0">
      <div className="inline-block relative">
        <div className='gradient-border md:p-[3px] md:border-[10px] p-[1px] border-[3px] border-transparent border-solid border text-center text-sm md:text-xl'>
          read source
        </div>
        <div className='bg'></div>
      </div>
    </a>
  )

  return (
    <Link href={src}>
      <div className="inline-block relative">
        <div className='gradient-border md:p-[3px] md:border-[10px] p-[1px] border-[3px] border-transparent border-solid border text-center text-sm md:text-xl'>
          read source
        </div>

        <div className='bg'></div>
      </div>
    </Link>
  )
}
