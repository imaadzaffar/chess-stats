import React from 'react'
import PlayerCard from './PlayerCard'
import Loading from '../ui/Loading'

const FriendsLayout = ({ friendsItems, isBlank, isLoading }) => {
    console.log(friendsItems)

    if (isBlank) {
        return null
    }
    else if (isLoading) {
        return <Loading />
    } else {
        if (friendsItems.length > 0) {
            return (
                <section>
                    <h2>Friends Stats</h2>
                    <div className="card-layout">
                        {friendsItems.map(item => (
                            <PlayerCard item={item} key={item.id} />
                        ))}
                    </div>
                </section>
            )
        } else {
            return <p className="error-text">No friends found :(</p>
        }
    }
    
}

export default FriendsLayout
