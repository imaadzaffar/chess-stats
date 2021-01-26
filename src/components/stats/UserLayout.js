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
  const userCards = [userLichessItem, userChessItem].reduce((result, userItem, index) => {
    if (userItem) {
      if (index === 0) {
        if (!userItem.closed) {
          result.push(<PlayerLichessCard item={userItem} />)
        }
      } else {
        result.push(<PlayerChessCard item={userItem} />)
        console.log(userItem)
      }
    }
    return result
  }, [])
  if (userCards.length > 0) {
    return (
      <div className="section">
        <Fade>
          <h2>User Stats</h2>
        </Fade>
        <div className="card-layout">{userCards}</div>
        <Fade>
          <button type="button" onClick={getFriendsData} className="button-friends">
            Get friends stats (lichess)
          </button>
        </Fade>
      </div>
    )
  }
  return <p className="error-text">Player not found.</p>
}

export default UserLayout
