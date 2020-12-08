import React from "react"

function SummaryQuantity({quantity, id, increment, decrement}) {
    return (
        <div className="quantity">
            <i onClick={() => decrement(id)} className="ri-indeterminate-circle-fill decrement" />
            <span className="number"> {quantity} </span>
            <i onClick={() => increment(id)} className="ri-add-circle-fill increment" />
        </div>
    )
}

export default SummaryQuantity