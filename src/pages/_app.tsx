import '@/ui/assets/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/ui/layouts/header'
import Footer from '@/ui/layouts/footer'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <div className="my-10 mx-4 h-full">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}
