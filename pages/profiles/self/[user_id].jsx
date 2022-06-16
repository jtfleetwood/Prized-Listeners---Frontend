import HAccess from '../../../components/HAccess';
import { useUser } from '@auth0/nextjs-auth0';
import {get_user_win_count} from '../../../API Services/users';
import { useRouter } from 'next/router';

const SelfProfile = (props) => {
    

    const {user, isLoading} = useUser();

    if (user && !isLoading) {
       
        return (
            <>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </head>
                <div className = "page-holder">
                    <HAccess current_page = "profile-self" user_id = {user.sub}/>
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


export default SelfProfile;