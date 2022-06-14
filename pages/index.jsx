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

  const onClick = async (e) => {
    e.preventDefault();
    try {
      const post_count = await find_post_count_by_user(user.sub, 0, props.ALT_API_URL);
  
  
      if (post_count) {
        alert('You already posted this week!');
        return;
      }
  
      router.push("/create_new_post");
      
    }
  
    catch(error) {
      console.log(error);
    }
  
  }

  if (!user) {
    return(
    <HNAccess/>);
  }

  else {
    on_sign_in();

    return (
      <>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </head>
        <div className = "page-holder">
          <HAccess/>
          <div className = "posts-display-home"><em>Weekly Entries</em></div>
          <PostTable ALT_API_URL = {props.ALT_API_URL} posts = {props.table_posts}></PostTable>
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