import React, {useState, useEffect, useContext} from "react"
import {Context} from "../../../Context"
import {Link, useParams} from "react-router-dom"
import axios from "axios"
import MobileCreateButton from "../../../components/MobileCreateButton"

function Index() {
    const { tableId } = useParams()
    const [isTableModalActive, setIsTableModalActive] = useState(false)
    const {settings, retrieveOrders, formatPrice, getTotalPrice, notify, orders, tables} = useContext(Context)

    const status = (status) => {
        switch (status) {
            case 0:
                return "In progress"
            case 1:
                return "Ready"
            case 2:
                return "Paid"
            default:
                return "Unknown"
        }
    }

    useEffect(() => {
        if(!tableId) {
            setIsTableModalActive(true)
        }
    }, [tableId])

    return (
        <div className="container orders-container">
            <div className="table-wrapper">
                <div className="table-header">
                    <Link to={`/orders/customer/create/${tableId}`} className="btn btn-create create-order-btn">
                        <i className="ri-add-line" /> CREATE ORDER
                    </Link>
                </div>

                <div className="table-container">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Table</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.map(order => {

                                if(order.table.id == tableId) {
                                    return (
                                        <tr key={order.id}>
                                            <td>{order.table.number}</td>
                                            <td>{formatPrice(getTotalPrice(order.products))}</td>
                                            <td className="td-actions-bartender">
                                                {status(order.status)}
                                            </td>
                                        </tr>
                                    )
                                }
                            }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            <div className={`modal-parent select-table-modal-parent ${isTableModalActive && "active"}`}>
                <div className="modal select-table-modal">
                    <div className="tables">
                        {tables && tables.map(table => 
                            <Link key={table.id} onClick={() => setIsTableModalActive(false)} to={`/orders/customer/${table.id}`} className="table">{table.number}</Link>
                        )}
                    </div>
                </div>
            </div>

            <MobileCreateButton to={`/orders/customer/create/${tableId}`} />
        </div>
    )
}

export default Index