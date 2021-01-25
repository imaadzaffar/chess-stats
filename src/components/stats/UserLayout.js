import React from 'react'
import Fade from 'react-reveal/Fade'
import PlayerLichessCard from './PlayerLichessCard'
import PlayerChessCard from './PlayerChessCard'
import Loading from '../ui/Loading'

const UserLayout = ({ userLichessItem, userChessItem, isBlank, isLoading, getFriendsData }) => {
  if (isBlank) {
    return null
  }
  if (isLoading) {
    return <Loading />
  }
  const userCards = [userLichessItem, userChessItem].map((userItem, index) => {
    if (index === 0) {
      return <PlayerLichessCard item={userItem} />
    }
    return <PlayerChessCard item={userItem} />
  })
  if (userLichessItem || userChessItem) {
    if (Object.keys(userLichessItem).length > 0) {
      if (userLichessItem.closed) {
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
