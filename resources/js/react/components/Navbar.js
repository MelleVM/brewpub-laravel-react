import { fromPairs } from "lodash"
import React from "react"
import {NavLink} from "react-router-dom"

function Navbar(props) {
    return (
        <div className={`${props.isNavOpen && "active"} sidebar`}>
            <div onClick={() => props.setIsNavOpen(prev => !prev)} className="menu-btn">
                <i className="ri-menu-4-fill" />
            </div>

            <div className="logo-container">
                <img src="/storage/images/logo.png" className="logo" />
            </div>

            <div className="nav-links">
                <NavLink className="nav-link" onClick={() => props.setIsNavOpen(false)} activeClassName="active" to="/orders/waiter">
                    <i className="ri-file-list-line" /> Waiter View
                </NavLink>
                <NavLink className="nav-link" onClick={() => props.setIsNavOpen(false)} activeClassName="active" to="/orders/bartender">
                    <i className="ri-file-list-line" /> Bartender View
                </NavLink>
                <NavLink className="nav-link" onClick={() => props.setIsNavOpen(false)} activeClassName="active" to="/orders/customer">
                    <i className="ri-file-list-line" /> Customer View
                </NavLink>
            </div>
        </div> 
    )
}

export default Navbar