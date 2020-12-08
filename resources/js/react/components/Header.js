import React, {useState} from "react"
import {useLocation} from "react-router-dom"
import Navbar from "./Navbar"

function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const location = useLocation();

    function getLocation() {
        if(location.pathname.includes("/orders/bartender")) {
            return <>ORDERS <i className="ri-arrow-right-s-line" /> BARTENDER</>
        }
        else if(location.pathname.includes("/orders/waiter")) {
            return <>ORDERS <i className="ri-arrow-right-s-line" /> WAITER</>
        }
        else if(location.pathname.includes("/orders/customer")) {
            return <>ORDERS <i className="ri-arrow-right-s-line" /> CUSTOMER</>
        }
    }

    return (
        <>
            <div className="header">
                <div className="header-container">
                    <div onClick={() => setIsNavOpen(prev => !prev)} className="menu-btn">
                        <i className="ri-menu-4-fill" />
                    </div>
                    <div className="location">
                        {getLocation()}
                    </div>
                </div>
            </div>

            <Navbar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        </>
    )
}

export default Header