import '../styles/global.scss';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster 
        position="bottom-center"
        reverseOrder={false}
      />
    </>
  )
}

export default MyApp
