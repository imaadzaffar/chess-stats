import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChess } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <div>
            <h1><FontAwesomeIcon icon={faChess} /> Chess Stats</h1>
        </div>
    )
}

export default Header
