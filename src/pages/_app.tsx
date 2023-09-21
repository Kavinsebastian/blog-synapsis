import '@/ui/assets/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/ui/layouts/header'
import Footer from '@/ui/layouts/footer'
import NotifyProvider from '@/ui/context/Notify/NotifyProvider'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotifyProvider>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <div className="my-10 h-full w-10/12 mx-auto">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </NotifyProvider>
  )
}
