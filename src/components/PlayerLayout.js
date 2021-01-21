import React from 'react'
import PlayerCard from './PlayerCard'
import Loading from './Loading'

const PlayerLayout = ({ items, isLoading }) => {
    return isLoading ? ( 
        <Loading />
    ) : (
        <div className="card-layout">
            {items.map(item => (
                <PlayerCard item={item} key={item.id} />
            ))}
        </div>
    )
}

export default PlayerLayout
