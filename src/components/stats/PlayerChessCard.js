import React from 'react'
import Flip from 'react-reveal/Flip'
import chess from '../../img/chess.png'

const PlayerChessCard = ({
  item: {
    username,
    title,
    url,
    stats: { chess_daily: daily, chess_bullet: bullet, chess_blitz: blitz, chess_rapid: rapid },
  },
}) => {
  let usernameText = username
  if (title) {
    usernameText = `[${title}] ${username}`
  }
  // const { online } = isOnline
  const online = false
  const classesOnline = online ? 'circle online' : 'circle offline'

  return (
    <Flip top>
      <div className="card-player">
        <div className="card-top">
          <div className={classesOnline} />
          <h3 className="username">{usernameText}</h3>
          <a href={url} target="_blank" rel="noopener noreferrer" className="icon-wrap">
            <img src={chess} alt="Chess.com icon" className="icon-platform" />
          </a>
        </div>
        {bullet && (
          <p>
            Bullet: {bullet.last.rating} | {bullet.record.win + bullet.record.loss + bullet.record.draw} games
          </p>
        )}
        {blitz && (
          <p>
            Blitz: {blitz.last.rating} | {blitz.record.win + blitz.record.loss + blitz.record.draw} games
          </p>
        )}
        {rapid && (
          <p>
            Rapid: {rapid.last.rating} | {rapid.record.win + rapid.record.loss + rapid.record.draw} games
          </p>
        )}
        {daily && (
          <p>
            Daily: {daily.last.rating} | {daily.record.win + daily.record.loss + daily.record.draw} games
          </p>
        )}
      </div>
    </Flip>
  )
}

export default PlayerChessCard
