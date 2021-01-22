import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Header from './components/ui/Header'
import Search from './components/ui/Search'
import UserLayout from './components/stats/UserLayout'
import FriendsLayout from './components/stats/FriendsLayout'

const App = () => {
    const [userItem, setUserItem] = useState()
    const [friendsItems, setFriendsItems] = useState([])
    const [isUserBlank, setIsUserBlank] = useState(true)
    const [isFriendsBlank, setIsFriendsBlank] = useState(true)
    const [isUserLoading, setIsUserLoading] = useState(false)
    const [isFriendsLoading, setIsFriendsLoading] = useState(false)
    const [username, setUsername] = useState('')

    axios.defaults.baseURL = 'https://lichess.org/api/'
    const source = useRef(null)

    const getSource = () => {
        if (source.current == null) {
            const CancelToken = axios.CancelToken;
            source.current = CancelToken.source();
        }
        return source.current;
    }
    
    const fetchUserItem = () => {
        axios.get(`/user/${username}`)
            .then(response => {
                let userData = response.data
                setUserItem(userData)
            })
            .catch(error => {
                console.log(error)
                setUserItem({})
            })
            .then(() => {
                setIsUserLoading(false)
            })
    }

    const fetchFriendsItems = (username) => {
        setIsFriendsBlank(false)
        setIsFriendsLoading(true)

        console.log(`getting friends data for ${username}`)
        axios.get(`/user/${username}/following`, {
            cancelToken: getSource().token
        })
            .then(response => {
                let data = response.data
        
                // Clean data response
                let string_clean = ''
                if (typeof data === 'string') {
                    string_clean = '[' + data.replace(/\n/g, ',').slice(0, -1) + ']'
                } else {
                    string_clean = '[' + JSON.stringify(data) + ']'
                }
                
                let friendsData = JSON.parse(string_clean)
                setFriendsItems(friendsData)
            })
            .catch(error => {
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
        if (username.length > 0) {
            console.log('running username block')

            if (source.current != null) {
                source.current.cancel()
                source.current = null
            }
    
            setFriendsItems([])
            setIsUserBlank(false)
            setIsFriendsBlank(true)
            setIsUserLoading(true)
            
            fetchUserItem(username)
        }
    }, [username])

    return (
        <div className="container">
            <Header />
            <Search getUsername={(username) => setUsername(username)} />
            <UserLayout 
                userItem={userItem} 
                isBlank={isUserBlank} 
                isLoading={isUserLoading} 
                getFriendsData={(username) => fetchFriendsItems(username)}
            />
            <FriendsLayout friendsItems={friendsItems} isBlank={isFriendsBlank} isLoading={isFriendsLoading} />
        </div>
    )
}

export default App
