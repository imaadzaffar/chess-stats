import React from 'react'
import lichess from '../../img/lichess.png'

const PlayerLichessCard = ({
  item: {
    username,
    title,
    url,
    online,
    perfs: { bullet, blitz, rapid, classical },
  },
}) => {
  let usernameText = username
  if (title) {
    usernameText = `[${title}] ${username}`
  }
  const classesOnline = online ? 'circle online' : 'circle offline'

  return (
    <div className="card-player">
      <div className="card-top">
        <div className={classesOnline} />
        <a href={url} target="_blank" rel="noopener noreferrer" className="username">
          {usernameText}
        </a>
        <img src={lichess} alt="Lichess.org icon" className="icon-platform" />
      </div>
      <p>
        Bullet: {bullet.rating} | {bullet.games} games
      </p>
      <p>
        Blitz: {blitz.rating} | {blitz.games} games
      </p>
      <p>
        Rapid: {rapid.rating} | {rapid.games} games
      </p>
      <p>
        Classic: {classical.rating} | {classical.games} games
      </p>
    </div>
  )
}

export default PlayerLichessCard
