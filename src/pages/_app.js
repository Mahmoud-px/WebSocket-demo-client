import React from 'react'
import Head from 'next/head'
import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>WebSocket-Demo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="WebSocket-Demo" />
        <link rel="icon" href="/favicon.ico" sizes="32x32"/>
      </Head>

      <Component {...pageProps} />

    </>
  )
}

export default MyApp;
