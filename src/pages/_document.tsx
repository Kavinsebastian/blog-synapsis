import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='relative h-full overflow-x-hidden'>
      <Head />
      <body>
        <div id="portal-container" />
        <div id="portal-backdrop" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
