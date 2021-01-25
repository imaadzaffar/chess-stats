import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Bounce from 'react-reveal/Bounce'
import Header from './components/ui/Header'
import Search from './components/ui/Search'
import UserLayout from './components/stats/UserLayout'
import FriendsLayout from './components/stats/FriendsLayout'

const App = () => {
  const [userChessItem, setUserChessItem] = useState()
  const [userLichessItem, setUserLichessItem] = useState()
  const [friendsItems, setFriendsItems] = useState([])
  const [isUserBlank, setIsUserBlank] = useState(true)
  const [isFriendsBlank, setIsFriendsBlank] = useState(true)
  const [isUserLoading, setIsUserLoading] = useState(false)
  const [isFriendsLoading, setIsFriendsLoading] = useState(false)
  const [username, setUsername] = useState('')

  const chessAPI = axios.create({ baseURL: 'https://api.chess.com/pub/' })
  const lichessAPI = axios.create({ baseURL: 'https://lichess.org/api/' })
  axios.defaults.baseURL = 'https://lichess.org/api/'
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
    const fetchUserItems = () => {
      axios
        .all([
          lichessAPI(`/user/${username}`),
          chessAPI(`/player/${username}`),
          chessAPI(`/player/${username}/is-online`),
          chessAPI(`/player/${username}/stats`),
        ])
        .then((results) => {
          const userData = results.map((response) => response.data)
          console.log(userData)
          const [userLichess, ...userChess] = userData
          setUserLichessItem(userLichess)
          setUserChessItem(userChess)
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.status)
            console.log(error.response.data)
          } else {
            console.log('Error', error.message)
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
