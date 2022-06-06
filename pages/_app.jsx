import React from 'react';
import Head from 'next/head';
import { UserProvider, useUser } from '@auth0/nextjs-auth0';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css'

export default function App({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta name="application-name" content = "Prized Listeners"/>
        <meta name="description" content = "We embrace your love for music, and friendly competition!"/>
        <title>Prized Listeners</title>
      </Head>
      <UserProvider>
          <Component {...pageProps} />
      </UserProvider>
    </>
    
  );
}
