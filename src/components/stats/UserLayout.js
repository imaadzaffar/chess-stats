import React from 'react'
import PlayerCard from './PlayerCard'
import Loading from '../ui/Loading'

const UserLayout = ({ userItem, isBlank, isLoading, getFriendsData }) => {
    if (isBlank) {
        return null
    }
    else if (isLoading) {
        return <Loading />
    } else {
        if (userItem.closed) {
            return <p className="error-text">Player account closed.</p>
        }
        if (Object.keys(userItem).length > 0) {
            return (
                <section>
                    <h2>User Stats</h2>
                    <div style={{ marginBottom: "10px" }}>
                        <PlayerCard item={userItem} key={userItem.id} />
                    </div>
                    <button onClick={() => getFriendsData(userItem.username)}>Get friends stats</button>
                </section>
            )
        } else {
            return <p className="error-text">Player not found.</p>
        }
    }
}

export default UserLayout
