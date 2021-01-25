import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import ChessWebAPI from 'chess-web-api'
import './App.css'
import Bounce from 'react-reveal/Bounce'
import Header from './components/ui/Header'
import Search from './components/ui/Search'
import UserLayout from './components/stats/UserLayout'
import FriendsLayout from './components/stats/FriendsLayout'

const App = () => {
  const [userLichessItem, setUserLichessItem] = useState()
  const [userChessItem, setUserChessItem] = useState()
  const [friendsItems, setFriendsItems] = useState([])
  const [isUserBlank, setIsUserBlank] = useState(true)
  const [isFriendsBlank, setIsFriendsBlank] = useState(true)
  const [isUserLoading, setIsUserLoading] = useState(false)
  const [isFriendsLoading, setIsFriendsLoading] = useState(false)
  const [username, setUsername] = useState('')

  // const chessAPI = axios.create({
  //   baseURL: 'https://cors-anywhere.herokuapp.com/https://api.chess.com/pub/',
  //   headers,
  // })
  const chessAPI = new ChessWebAPI()
  const lichessAPI = axios.create({
    baseURL: 'https://lichess.org/api/',
  })
  const source = useRef(null)

  const getSource = () => {
    if (source.current == null) {
      const { CancelToken } = axios
      source.current = CancelToken.source()
    }
    return source.current
  }

  const fetchFriendsItems = () => {
    setIsFriendsBlank(false)
    setIsFriendsLoading(true)

    lichessAPI(`/user/${username}/following`, {
      cancelToken: getSource().token,
    })
      .then((response) => {
        const { data } = response

        // Clean data response
        let dataFormatted = ''
        if (typeof data === 'string') {
          dataFormatted = `[${data.replace(/\n/g, ',').slice(0, -1)}]`
        } else {
          dataFormatted = `[${JSON.stringify(data)}]`
        }

        const friendsData = JSON.parse(dataFormatted)
        setFriendsItems(friendsData)
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request cancelled', error.message)
        } else {
          console.log(error.message)
          setFriendsItems([])
        }
      })
      .then(() => {
        setIsFriendsLoading(false)
      })
  }

  useEffect(() => {
    const promises = [lichessAPI(`/user/${username}`), chessAPI.getPlayer(username), chessAPI.getPlayerStats(username)]
    const promisesResolved = promises.map((promise) => promise.catch((error) => ({ error })))
    const checkFailed = (then) => (responses) => {
      const someFailed = responses.some((response) => response.error)
      if (someFailed) {
        throw responses
      }
      return then(responses)
    }

    const fetchUserItems = () => {
      axios
        .all(promisesResolved)
        .then(
          checkFailed((results) => {
            console.log('SUCCESS', results)

            const userData = results.map((response) => {
              if (response.data) return response.data
              return response.body
            })
            const [userLichess, ...[userProfile, userStats]] = userData

            setUserLichessItem(userLichess)

            if (userProfile && userStats) {
              const userChess = { ...userProfile, stats: { ...userStats } }
              setUserChessItem(userChess)
            } else {
              setUserChessItem()
            }
          })
        )
        .catch((error) => {
          console.log('FAIL', error)

          const errorResponse = error.map((e) => {
            if (e.data) {
              return e.data
            }
            if (e.body) {
              return e.body
            }
            console.log('Error', e.error)
            return e.message
          })

          const [userLichess, ...[userProfile, userStats]] = errorResponse

          if (userLichess) {
            setUserLichessItem(userLichess)
          } else {
            setUserLichessItem()
          }

          if (userProfile && userStats) {
            const userChess = { ...userProfile, stats: { ...userStats } }
            setUserChessItem(userChess)
          } else {
            setUserChessItem()
          }
        })
        .then(() => {
          setIsUserLoading(false)
        })
    }

    if (username.trim().length > 0) {
      if (source.current != null) {
        source.current.cancel()
        source.current = null
      }

      setFriendsItems([])
      setIsUserBlank(false)
      setIsFriendsBlank(true)
      setIsUserLoading(true)

      fetchUserItems(username)
    } else {
      setIsUserBlank(true)
      setIsFriendsBlank(true)
    }
  }, [username])

  return (
    <div className="container">
      <Bounce>
        <Header />
        <Search getUsername={(u) => setUsername(u)} />
      </Bounce>
      <UserLayout
        userLichessItem={userLichessItem}
        userChessItem={userChessItem}
        isBlank={isUserBlank}
        isLoading={isUserLoading}
        getFriendsData={fetchFriendsItems}
      />
      <FriendsLayout friendsItems={friendsItems} isBlank={isFriendsBlank} isLoading={isFriendsLoading} />
    </div>
  )
}

export default App
