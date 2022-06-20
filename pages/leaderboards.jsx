import { get_users } from "../API Services/users"
import HAccess from "../components/HAccess";
import UserStanding from "../components/UserStanding";
import Footer from "../components/Footer";
import { useUser } from "@auth0/nextjs-auth0";

const create_standings = (users) => {
    var standings = [[]];
    var max = 10000000;
    var current_standing = -1;


    // We know win_count is coming in descending order, hence use of max...
    for (let i = 0; i < users.length; i++) {
        if ((users[i].app_metadata.win_count + users[i].app_metadata.tie_count) < max) {
            max = users[i].app_metadata.win_count + users[i].app_metadata.tie_count;
            standings[++current_standing] = new Array();
            standings[current_standing].push(users[i]);
        }

        else if ((users[i].app_metadata.win_count + users[i].app_metadata.tie_count) === max) {
            standings[current_standing].push(users[i]);
        }
    }

    return standings;
}

const Leaderboard = ({users}) => {
    const {user, isLoading} = useUser();

    users.sort((a, b) => (b.app_metadata.win_count + b.app_metadata.tie_count) - (a.app_metadata.win_count + a.app_metadata.tie_count));

    const standings = create_standings(users);

    if (user && !isLoading) {
        return (
            <div className = "page-holder">
                <HAccess/>
                <div className = "leaderboard-title">Current Standings</div>
                {standings.map((users_, rank_) => <UserStanding users = {users_} rank = {rank_ + 1}/>)}
                <Footer/>
            </div>
        )

    }

    else if (user && isLoading) {
        return <div>Loading!</div>
    }

    else {
        return <div>You're not authorized to access this page!</div>
    }

    

}

export default Leaderboard;

export async function getServerSideProps() {
    const users = await get_users(process.env.API_URL);

    return {props : {users}}
}