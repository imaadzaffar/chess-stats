import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = ({ getUsername }) => {
  const [text, setText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    getUsername(text)
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search for player" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit" value="Submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  )
}

export default Search
