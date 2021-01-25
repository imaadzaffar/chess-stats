import React from 'react'
import Flip from 'react-reveal/Flip'
import chess from '../../img/chess.png'

const PlayerChessCard = ({ item }) => {
  const [profile, isOnline, stats] = item
  const { username, title, url } = profile
  const { chess_daily: daily, chess_bullet: bullet, chess_blitz: blitz, chess_rapid: rapid } = stats

  let usernameText = username
  if (title) {
    usernameText = `[${title}] ${username}`
  }
  const { online } = isOnline
  const classesOnline = online ? 'circle online' : 'circle offline'

  return (
    <Flip top>
      <div className="card-player">
        <div className="card-top">
          <div className={classesOnline} />
          <a href={url} target="_blank" rel="noopener noreferrer" className="username">
            {usernameText}
          </a>
          <img src={chess} alt="Chess.com icon" className="icon-platform" />
        </div>
        {bullet && <p>Bullet: {bullet.last.rating}</p>}
        {blitz && <p>Blitz: {blitz.last.rating}</p>}
        {rapid && <p>Rapid: {rapid.last.rating}</p>}
        {daily && <p>Daily: {daily.last.rating}</p>}
      </div>
    </Flip>
  )
}

export default PlayerChessCard
