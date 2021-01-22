import React from 'react'
import PlayerCard from './PlayerCard'
import Loading from '../ui/Loading'
import Fade from 'react-reveal/Fade'
import Flip from 'react-reveal/Flip'

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
                    <Fade>
                        <h2>User Stats</h2>
                    </Fade>
                        <div style={{ marginBottom: "10px" }}>
                            <Flip top>
                                <PlayerCard item={userItem} key={userItem.id} />
                            </Flip>
                        </div>
                    <Fade>
                        <button onClick={() => getFriendsData(userItem.username)}>Get friends stats</button>
                    </Fade>
                </section>
            )
        } else {
            return <p className="error-text">Player not found.</p>
        }
    }
}

export default UserLayout
