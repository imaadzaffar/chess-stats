import React from 'react'
import PlayerCard from './PlayerCard'

const PlayerLayout = ({ items, isLoading }) => {
    return ( isLoading ? <h2>Loading...</h2> :
        <div>
            {items.map(item => (
                <PlayerCard item={item} key={item.id} />
            ))}
        </div>
    )
}

export default PlayerLayout
