import React from 'react'
import Fade from 'react-reveal/Fade'
import Flip from 'react-reveal/Flip'
import Loading from '../ui/Loading'
import PlayerCard from './PlayerCard'

const FriendsLayout = ({ friendsItems, isBlank, isLoading }) => {
  if (isBlank) {
    return null
  }
  if (isLoading) {
    return <Loading />
  }
  if (friendsItems.length > 0) {
    return (
      <section>
        <Fade>
          <h2>Friends Stats</h2>
        </Fade>
        <div className="card-layout">
          {friendsItems.map((item) => (
            <Flip top>
              <PlayerCard item={item} key={item.id} />
            </Flip>
          ))}
        </div>
      </section>
    )
  }
  return <p className="error-text">No friends found :(</p>
}

export default FriendsLayout
