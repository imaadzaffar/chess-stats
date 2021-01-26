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
    <form onSubmit={handleSubmit}>
      <div className="search">
        <input type="text" placeholder="Search for player" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit" value="Submit" className="button-search">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  )
}

export default Search
