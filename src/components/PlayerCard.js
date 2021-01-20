import React from 'react'

const PlayerCard = ({ item }) => {
    let username = item.username
    let url = item.url
    let online = item.online
    let bullet = item['perfs']['bullet']
    let blitz = item['perfs']['blitz']
    let rapid = item['perfs']['rapid']
    let classical = item['perfs']['classical']
    let onlineClasses = online ? "icon online" : "icon offline"

    console.log(item)
    return (
        <div>
            <div className={onlineClasses}></div>
            <h2><a href={url} target="_blank">{username}</a></h2>
            <p>Bullet: {bullet.rating} | {bullet.games} games</p>
            <p>Blitz: {blitz.rating} | {blitz.games} games</p>
            <p>Rapid: {rapid.rating} | {rapid.games} games</p>
            <p>Classic: {classical.rating} | {classical.games} games</p>
        </div>
    )
}

export default PlayerCard
