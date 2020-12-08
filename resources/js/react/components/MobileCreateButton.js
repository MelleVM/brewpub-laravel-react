import React from "react"
import {Link} from "react-router-dom"

function MobileCreateButton({to, onClick}) {

    if(to) {
        return (
            <Link to={to} className="mobile-create-btn">
                <i className="ri-add-line" /> 
            </Link>
        )
    } else {
        return (
            <div onClick={onClick} className="mobile-create-btn">
                <i className="ri-add-line" />
            </div>
        )
    }
}

export default MobileCreateButton