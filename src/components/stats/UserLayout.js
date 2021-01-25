import React from 'react'
import Fade from 'react-reveal/Fade'
import Flip from 'react-reveal/Flip'
import PlayerCard from './PlayerCard'
import Loading from '../ui/Loading'

const UserLayout = ({ userItems, userItems: [userLichess, userChess], isBlank, isLoading, getFriendsData }) => {
  if (isBlank) {
    return null
  }
  if (isLoading) {
    return <Loading />
  }
  if (userItems.length > 0) {
    console.log(userLichess)
    console.log(userChess)
    if (Object.keys(userLichess).length > 0) {
      if (userLichess.closed) {
        return <p className="error-text">Player account closed.</p>
      }
      return (
        <section>
          <Fade>
            <h2>User Stats</h2>
          </Fade>
          <div style={{ marginBottom: '10px' }}>
            <Flip top>
              <PlayerCard item={userLichess} />
            </Flip>
          </div>
          <Fade>
            <button type="button" onClick={getFriendsData}>
              Get friends stats
            </button>
          </Fade>
        </section>
      )
    }
  }
  return <p className="error-text">Player not found.</p>
}

export default UserLayout
