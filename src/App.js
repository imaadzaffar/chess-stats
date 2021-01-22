import React, { useState, useEffect } from 'react'
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
    
    useEffect(() => {
        const fetchUserItem = () => {
            setIsUserBlank(false)
            setIsFriendsBlank(true)
            setIsUserLoading(true)

            axios.get(`/user/${username}`)
                .then(response => {
                    let userData = response.data
                    console.log(response)
                    
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
        
        if (username.length > 0) {
            setFriendsItems([])
            fetchUserItem(username)
        }
    }, [username])

    const fetchFriendsItems = (username) => {
        setIsFriendsBlank(false)
        setIsFriendsLoading(true)

        axios.get(`/user/${username}/following`)
            .then(response => {
                let data = response.data
                console.log(data)
        
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
                console.log(error)
                setFriendsItems([])
            })
            .then(() => {
                setIsFriendsLoading(false)
            })
    }

    return (
        <div className="container">
            <Header />
            <Search getUsername={(username) => setUsername(username)} />
            <UserLayout userItem={userItem} isBlank={isUserBlank} isLoading={isUserLoading} getFriendsData={(username) => fetchFriendsItems(username)} />
            <FriendsLayout friendsItems={friendsItems} isBlank={isFriendsBlank} isLoading={isFriendsLoading} />
        </div>
    )
}

export default App
