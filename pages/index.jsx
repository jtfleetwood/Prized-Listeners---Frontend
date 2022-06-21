/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Home page.
 * ****************************************************************************/

import {useUser, getAccessToken} from '@auth0/nextjs-auth0';
import HNAccess from '../components/HNAccess';
import HAccess from '../components/HAccess';
import PostTable from '../components/PostTable';
import {get_posts} from '../API Services/posts';
import { check_new_user } from '../API Services/users';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';

// Home page
const Home = (props) => {
  // Getting current user information.
  const {user, isLoading} = useUser();
  const [loading, setLoading] = useState(false);
  
  // Checking to see if user has signed in for first time, so app metadata can be initialized.
  const on_sign_in = async () => {
    await check_new_user(user.sub, props.ALT_API_URL, props.ACCESS_TOKEN);
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
    }, 250);
  }, []);

  // Check if page loading.
  if (loading) {

      return (
          <>
              <div class="center">
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
              </div>
          </>
      )
      
  }

  // If user not logged in, display external home page.
  else if (!user) {
    return(
      <>
        <div className = "page-holder">
          <HNAccess/>
          <div className= "welcome-message">LISTEN.</div>
          <div className="welcome-message" style = {{color:"white"}}>SHARE.</div>
          <div className="welcome-message">COMPETE.</div>
          <Footer/>
        </div>
      </>
    );
  }

  // If user is logged in.
  else {
    on_sign_in();

    return (
      <>
        <div className = "page-holder">
          <HAccess/>
          <div className = "posts-display-home"><em>Weekly Entries</em></div>
          <PostTable ACCESS_TOKEN = {props.ACCESS_TOKEN} ALT_API_URL = {props.ALT_API_URL} posts = {props.table_posts}></PostTable>
          <Footer/>
        </div>
        
      
    </>
    )
  }

}

export default Home;

/*
    Getting API url from env variables, getting user access token to make API calls,
    and getting current posts for week. 

    Important: we are injecting the API_URL from environment variables as this is
    an internally used API only and no one else should have the link. It is 
    secured via JWT mechanisms, but an extra measure.
*/

export async function getServerSideProps(context) {
  
  try {
    const response = await getAccessToken(context.req, context.res);
    
    const ACCESS_TOKEN = response.accessToken;
    //const table_posts = await get_posts(ACCESS_TOKEN);
    const ALT_API_URL = process.env.API_URL;

    const table_posts = await get_posts(ACCESS_TOKEN);
    
    return {props : {table_posts, ALT_API_URL, ACCESS_TOKEN}};
  }
  // If an error occurs, sending empty array to other component for further handling.
  catch {
    const table_posts = []
    return {props: {table_posts}}
  }

  
}