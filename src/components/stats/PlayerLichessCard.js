import React from 'react'
import Flip from 'react-reveal/Flip'
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
    <Flip top>
      <div className="card-player">
        <div className="card-top">
          <div className={classesOnline} />
          <h3 className="username">{usernameText}</h3>
          <a href={url} target="_blank" rel="noopener noreferrer" className="icon-wrap">
            <img src={lichess} alt="Lichess.org icon" className="icon-platform" />
          </a>
        </div>
        {bullet && (
          <p>
            Bullet: {bullet.rating} | {bullet.games} games
          </p>
        )}
        {blitz && (
          <p>
            Blitz: {blitz.rating} | {blitz.games} games
          </p>
        )}
        {rapid && (
          <p>
            Rapid: {rapid.rating} | {rapid.games} games
          </p>
        )}
        {classical && (
          <p>
            Daily: {classical.rating} | {classical.games} games
          </p>
        )}
      </div>
    </Flip>
  )
}

export default PlayerLichessCard
