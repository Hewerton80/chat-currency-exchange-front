import Providers from '../contexts';
import { GlobalStyle  } from '../styles/global';

function MyApp({ Component, pageProps }) {

  return (
    <>
      <GlobalStyle />
      <Providers>
          <Component {...pageProps} />
      </Providers>
    </>
  )
}

export default MyApp;
