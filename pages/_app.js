import "@/styles/globals.css";
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  
  return <Component {...pageProps} />;
}
