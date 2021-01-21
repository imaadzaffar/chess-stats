import React from 'react'

const PlayerCard = ({ item }) => {
    let username = item.username
    let url = item.url
    let online = item.online
    console.log(JSON.stringify(item))
    let bullet = item['perfs']['bullet']
    let blitz = item['perfs']['blitz']
    let rapid = item['perfs']['rapid']
    let classical = item['perfs']['classical']
    let classesOnline = online ? "circle online" : "circle offline"

    return (
        <div className="card-player">
            <div className={classesOnline}></div>
            <a href={url} target="_blank" rel="noopener noreferrer" className="username">{username}</a>
            <p>Bullet: {bullet.rating} | {bullet.games} games</p>
            <p>Blitz: {blitz.rating} | {blitz.games} games</p>
            <p>Rapid: {rapid.rating} | {rapid.games} games</p>
            <p>Classic: {classical.rating} | {classical.games} games</p>
        </div>
    )
}

export default PlayerCard
