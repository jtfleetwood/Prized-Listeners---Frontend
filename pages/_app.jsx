/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Base App component.
 * ****************************************************************************/

import React from 'react';
import Head from 'next/head';
import { UserProvider} from '@auth0/nextjs-auth0';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css'
import { SSRProvider } from 'react-bootstrap';

// Wrapping with appropriate head info, UserProvider (Auth0), and SSRProvider (NextJS).
export default function App({ Component, pageProps }) {

  return (
    <>
    <SSRProvider>
      <Head>
        <meta name="application-name" content = "Prized Listeners"/>
        <meta name="description" content = "We embrace your love for music, and friendly competition!"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="apple-mobile-web-app-capable" content = "yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content = "default"/>
        <meta name ="apple-mobile-web-app-title" content = "Prized Listeners"/>
        <title>Prized Listeners</title>
        <link rel = "manifest" href="manifest.json"></link>
      </Head>
      <UserProvider>
          <Component {...pageProps} />
      </UserProvider>
      </SSRProvider>
    </>
    
  );
}
