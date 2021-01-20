import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Header from './components/Header'
import PlayerLayout from './components/PlayerLayout'

const App = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchItems = async (username) => {
            axios.defaults.baseURL = 'https://lichess.org/api/'
            const results = await axios.all([axios.get(`/user/${username}`), axios.get(`/user/${username}/following`)])

            let user_data = results[0].data
            let friends_response = results[1].data

            // Clean data response
            let string_clean = "[" + friends_response.replace(/\n/g, ",").slice(0, -1) + "]"
            let full_data = JSON.parse(string_clean)
            full_data.unshift(user_data)
            
            // console.log(full_data)
            setItems(full_data)
            setIsLoading(false)
        }
        
        fetchItems('iszaffar')
    }, [])

    return (
        <div className="App">
            <Header />
            <PlayerLayout items={items} isLoading={isLoading} />
        </div>
    )
}

export default App
