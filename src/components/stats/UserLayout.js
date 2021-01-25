import React from 'react'
import Fade from 'react-reveal/Fade'
import Flip from 'react-reveal/Flip'
import PlayerLichessCard from './PlayerLichessCard'
import PlayerChessCard from './PlayerChessCard'
import Loading from '../ui/Loading'

const UserLayout = ({ userItems, userItems: [userLichess, userChess], isBlank, isLoading, getFriendsData }) => {
  if (isBlank) {
    return null
  }
  if (isLoading) {
    return <Loading />
  }
  const userCards = []
  if (userLichess) {
    console.log(userLichess)
    userCards.push(
      <Flip top>
        <PlayerLichessCard item={userLichess} />
      </Flip>
    )
  }
  if (userChess) {
    console.log(userChess)
    userCards.push(
      <Flip top>
        <PlayerChessCard item={userChess} />
      </Flip>
    )
  }
  if (userItems.length > 0) {
    if (Object.keys(userLichess).length > 0) {
      if (userLichess.closed) {
        return <p className="error-text">Player account closed.</p>
      }
      return (
        <section>
          <Fade>
            <h2>User Stats</h2>
          </Fade>
          <div style={{ marginBottom: '10px' }}>{userCards}</div>
          <Fade>
            <button type="button" onClick={getFriendsData}>
              Get friends stats (lichess)
            </button>
          </Fade>
        </section>
      )
    }
  }
  return <p className="error-text">Player not found.</p>
}

export default UserLayout
