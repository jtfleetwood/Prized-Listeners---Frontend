/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Basic component that maps out rankings array to make a leaderboard.
 * ****************************************************************************/

// Displays user leaderboards.
const UserStanding = ({rank, users}) => {
    return (
        <div className = "leaderboard-rank">
        #{rank}
            {users.map(user => <div><a className = "leaderboard-user" href = {`/profiles/${user.user_id}`}>{user.nickname}</a></div>)}
        <hr className = "rank-separate"></hr>
        </div>
    )
        
}

export default UserStanding;