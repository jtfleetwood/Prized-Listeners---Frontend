import React from 'react';
import Head from 'next/head';
import { UserProvider, useUser } from '@auth0/nextjs-auth0';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css'
import { SSRProvider } from 'react-bootstrap';

export default function App({ Component, pageProps }) {

  return (
    <>
    <SSRProvider>
      <Head>
        <meta name="application-name" content = "Prized Listeners"/>
        <meta name="description" content = "We embrace your love for music, and friendly competition!"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <title>Prized Listeners</title>
      </Head>
      <UserProvider>
          <Component {...pageProps} />
      </UserProvider>
      </SSRProvider>
    </>
    
  );
}
