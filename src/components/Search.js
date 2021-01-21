import React, { useState } from 'react'

const Search = ({ getUsername }) => {
    const [text, setText] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        getUsername(text)
    }

    return (
        <div className="search">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search for player"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    autoFocus
                />
                <button type="submit" value="Submit">Submit</button>
            </form>
        </div>
    )
}

export default Search
