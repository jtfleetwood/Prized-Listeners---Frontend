import HAccess from '../../components/HAccess';
import { useUser } from '@auth0/nextjs-auth0';
import {get_user_win_count} from '../../API Services/users';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {Button} from 'react-bootstrap';

const Profile = (props) => {
    

    const {user, isLoading} = useUser();
    const router = useRouter();

    if (user && !isLoading) {
       
        return (
            <>
                <div className = "page-holder">
                    <HAccess current_page = "profile" user_id = {user.sub}/>
                    <div className = "profile-info-container">
                    <img className = "profile-picture" src={user.picture}></img>
                        <div className = "profile-info-heading">Email:
                         <span className = "profile-info-content">{user.name}</span>
                        </div>
                        <div className = "profile-info-heading">Display Name:
                         <span className = "profile-info-content">{user.nickname}</span>
                        </div>
                        <div className = "profile-info-heading">Wins:
                         <span className = "profile-info-content">{props.win_count}</span>
                        </div>
                    </div>
                    <Button onClick = {(e) => router.push('../account_settings')}style = {{fontSize:'1.5vw', fontWeight:'bold', borderColor:'white', borderWidth:'medium'}}className = "create-post-button" variant="dark">Edit Information</Button>
                </div>
            </>
        )

    }

    else {
        return <div>Loading!</div>
    }
        
}

export async function getServerSideProps(context) {
    // Actual need of API URL is called in browser-side code, thus not available as process.env var. Also not able to config with dotenv pkg due to pkg not being available on server side.
    // See cannot resolve: fs module w/ NextJS for more info... 
    const ALT_API_URL = process.env.API_URL;
    const win_count = await get_user_win_count(context.params.user_id, process.env.API_URL);
    return {props : {ALT_API_URL, win_count}};
}


export default Profile;