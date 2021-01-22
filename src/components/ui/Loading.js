import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessPawn, faChessKnight, faChessBishop, faChessRook, faChessQueen, faChessKing } from '@fortawesome/free-solid-svg-icons'

const Loading = () => {
    let icons = [faChessPawn, faChessKnight, faChessBishop, faChessRook, faChessQueen, faChessKing]

    return (
        <FontAwesomeIcon icon={icons[Math.floor(Math.random() * icons.length)]} size="5x" style={{ "color": "#4F3BC8", "marginTop": "50px" }} spin />
    )
}

export default Loading
