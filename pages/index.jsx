import {Button} from 'react-bootstrap';
import {useUser} from '@auth0/nextjs-auth0';
import HNAccess from '../components/HNAccess';
import HAccess from '../components/HAccess';
import PostTable from '../components/PostTable';
import {useRouter} from 'next/router';
import {get_posts} from '../API Services/posts'
import { check_new_user } from '../API Services/users';



const Home = (props) => {
  const {user} = useUser();
  const router = useRouter();

  const on_sign_in = async () => {
    await check_new_user(user.sub, props.ALT_API_URL);
  }

  if (!user) {
    return(
    <HNAccess/>);
  }

  else {
    on_sign_in();

    return (
      <> 
        <div className = "page-holder">
        <HAccess/>
        <div className = "posts-display-home">Weekly Entries</div>
        <PostTable posts = {props.table_posts} ALT_API_URL = {props.ALT_API_URL}/>
        <Button onClick = {() => router.push("/create_new_post")} className = "create-post-button" variant="dark">Create Entry</Button>
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