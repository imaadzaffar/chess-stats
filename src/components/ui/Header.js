import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChess } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <section>
            <h1><FontAwesomeIcon icon={faChess} /> Chess Stats</h1>
        </section>
    )
}

export default Header
