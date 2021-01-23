import React from 'react'

const PlayerCard = ({
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
      <div className={classesOnline} />
      <a href={url} target="_blank" rel="noopener noreferrer" className="username">
        {usernameText}
      </a>
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

export default PlayerCard
