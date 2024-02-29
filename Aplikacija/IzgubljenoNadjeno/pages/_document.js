import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html>
      <Head >
        
        <link rel="shortcut icon" type="image/x-icon"href="../public/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>

      </Head>
      <body>
        <title>Izgubljeno/Nađeno</title>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}