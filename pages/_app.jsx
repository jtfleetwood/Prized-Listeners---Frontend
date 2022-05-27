import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';

import '@fortawesome/fontawesome-svg-core/styles.css';
import initFontAwesome from '../utils/initFontAwesome';
import '../styles/globals.css';
import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.css'
initFontAwesome();

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
        <Component {...pageProps} />
    </UserProvider>
  );
}
