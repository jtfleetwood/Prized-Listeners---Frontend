/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Modified handleAuth method to ensure bearer token is attached to user requests
 * upon login.
 * ****************************************************************************/

import { handleAuth, handleLogin} from '@auth0/nextjs-auth0';

// Generating bearer token for audience API upon logging in.
export default handleAuth({
    async login(req, res) {
      try {
        await handleLogin(req, res, {
          authorizationParams: {
            audience: 'https://prized-listeners-backend.herokuapp.com/', // or AUTH0_AUDIENCE
            // Add the `offline_access` scope to also get a Refresh Token
            scope: '' // or AUTH0_SCOPE,
          }
        });
      } catch (error) {
        res.status(error.status || 400).end(error.message);
      }
    }
  });

