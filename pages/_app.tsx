import "../styles/globals.scss";
import "../styles/landing_page.scss";
import "../styles/donate_page.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
