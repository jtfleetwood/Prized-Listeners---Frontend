import {Button} from 'react-bootstrap';
import {useUser} from '@auth0/nextjs-auth0';
import HNAccess from '../components/HNAccess';
import HAccess from '../components/HAccess';
import PostTable from '../components/PostTable';
import {useRouter} from 'next/router';
import {get_posts} from '../API Services/posts'
import { check_new_user } from '../API Services/users';
import {find_post_count_by_user} from '../API Services/posts';
import Post from '../components/post';

const Home = (props) => {
  const {user} = useUser();
  const router = useRouter();

  const on_sign_in = async () => {
    await check_new_user(user.sub, props.ALT_API_URL);
  }

  if (!user) {
    return(
      <>
        <div className = "page-holder">
          <HNAccess/>
          <div className= "welcome-message">LISTEN.</div>
          <div className="welcome-message" style = {{color:"white"}}>SHARE.</div>
          <div className="welcome-message">COMPETE.</div>
        </div>
      </>
    );
  }

  else {
    on_sign_in();

    return (
      <>
        <div className = "page-holder">
          <HAccess/>
          <div className = "posts-display-home"><em>Weekly Entries</em></div>
          <PostTable ALT_API_URL = {props.ALT_API_URL} posts = {props.table_posts}></PostTable>
          <br></br>
        </div>
        
      
    </>
    )
  }

}

export default Home;

export async function getServerSideProps() {
  const table_posts = await get_posts();
  const ALT_API_URL = process.env.API_URL;

  return {props : {table_posts, ALT_API_URL}};
}