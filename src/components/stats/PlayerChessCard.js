import React from 'react'
import Flip from 'react-reveal/Flip'
import classNames from 'classnames'
import chess from '../../img/chess.png'

const PlayerChessCard = ({
  item: {
    username,
    title,
    url,
    online = false,
    stats: { chess_daily: daily, chess_bullet: bullet, chess_blitz: blitz, chess_rapid: rapid },
  },
}) => {
  const usernameText = title ? `[${title}] ${username}` : username
  const onlineClass = classNames('icon-online', { online })

  return (
    <Flip top>
      <div className="card-player">
        <div className="card-top">
          <div className={onlineClass} />
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
