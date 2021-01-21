import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessRook } from '@fortawesome/free-solid-svg-icons'

const Loading = () => {
    return (
        <FontAwesomeIcon icon={faChessRook} size="5x" style={{ "color": "#4F3BC8", "marginTop": "50px" }} spin />
    )
}

export default Loading
