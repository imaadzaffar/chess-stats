import React from 'react'
import PlayerCard from './PlayerCard'

const PlayerLayout = ({ items, isLoading }) => {
    return ( isLoading ? <h2>Loading...</h2> :
        <div className="card-layout">
            {items.map(item => (
                <PlayerCard item={item} key={item.id} />
            ))}
        </div>
    )
}

export default PlayerLayout
