import React from 'react'
import PlayerCard from './PlayerCard'
import Loading from '../ui/Loading'

const UserLayout = ({ userItem, isBlank, isLoading, getFriendsData }) => {
    console.log(userItem)
    
    if (isBlank) {
        return null
    }
    else if (isLoading) {
        return <Loading />
    } else {
        if (typeof userItem !== 'undefined') {
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
            return <p className="error-text">Couldn't find user.</p>
        }
    }
}

export default UserLayout
