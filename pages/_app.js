import '../styles/globals.css'
import Footer from '../components/footer'
import Header from '../components/header'

export default function App({Component,props}) {
  return (<Component {...props}/>)
  // return (
  //   <div className='bg-black text-white'>
  //     <Header />
  //       <div className='min-h-screen'><Component {...props}/></div>
  //     <Footer />
  //   </div>
  // );
}
