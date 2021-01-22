import React from 'react'

const PlayerCard = ({ item }) => {
    let username = item.username
    if (item.title) {
        username = `[${item.title}] ` + username
    }

    let url = item.url
    let online = item.online
    let classesOnline = online ? "circle online" : "circle offline"

    let bullet = item['perfs']['bullet']
    let blitz = item['perfs']['blitz']
    let rapid = item['perfs']['rapid']
    let classical = item['perfs']['classical']

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
