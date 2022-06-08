import {Button} from 'react-bootstrap';
import {useUser} from '@auth0/nextjs-auth0';
import HNAccess from '../components/HNAccess';
import HAccess from '../components/HAccess';
import PostTable from '../components/PostTable';
import {useRouter} from 'next/router';
import {get_posts} from '../API Services/posts'
import { check_new_user } from '../API Services/users';
import {find_post_count_by_user} from '../API Services/posts';

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
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head> 
        <div className = "page-holder">
          <HAccess user_id = {user.sub}/>
          <div className = "posts-display-home">Weekly Entries</div>
          <PostTable posts = {props.table_posts} ALT_API_URL = {props.ALT_API_URL}/>
          <Button style = {{fontSize:'1.5vw', left: '40.5%', marginTop: '2%', fontWeight:'bold', borderColor:'white', borderWidth:'medium'}}onClick = {onClick} className = "create-post-button" variant="dark">Create Entry</Button>
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