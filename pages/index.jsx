import {Button} from 'react-bootstrap';
import {useUser} from '@auth0/nextjs-auth0';
import HNAccess from '../components/HNAccess';
import HAccess from '../components/HAccess';
import PostTable from '../components/PostTable';
import {useRouter} from 'next/router';
import {get_posts} from '../API Services/posts'

const Home = ({table_posts}) => {
  const {user, isLoading} = useUser();
  
  const router = useRouter();

  if (!user) {
    return(
    <HNAccess/>
    );
  }

  else {
    return (
      <> 
        <div className = "page-holder">
        <HAccess/>
        <div className = "posts-display-home">Weekly Entries</div>
        <PostTable posts = {table_posts}/>
        <Button onClick = {() => router.push("/create_new_post")} className = "create-post-button" variant="dark">Create Entry</Button>
        </div>
      
  </>
    )
  }

}

export default Home;

export async function getServerSideProps() {
  const table_posts = await get_posts();

  return {props : {table_posts}};
}