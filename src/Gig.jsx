import React from 'react'

function Gig(props) {
    return (
        <div className = "gig">
            <p className="description__body">{props.description}</p>
            <p><span>N{props.amount}</span></p>
        </div>
    )
}

export default Gig
