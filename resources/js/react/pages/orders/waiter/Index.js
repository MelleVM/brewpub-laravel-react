import React, {useState, useEffect, useContext} from "react"
import {Context} from "../../../Context"
import {Link} from "react-router-dom"
import axios from "axios"
import MobileCreateButton from "../../../components/MobileCreateButton"

function Index() {
    const [isTableModalActive, setIsTableModalActive] = useState(false)
    const [tableId, setTableId] = useState()
    const {settings, retrieveOrders, notify, orders, tables} = useContext(Context)

    function deleteOrder(id) {
        axios.delete(`${settings.API_URL}/api/orders/${id}`)
            .then(response => {
                notify("success", "Order has been removed")
                retrieveOrders()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function handleChange(e) {
        e.preventDefault()

        const {value, name} = e.target

        if(name == "table") {
            setTableId(value)
        }
    }

    return (
        <div className="container orders-container">
            <div className="table-wrapper">
                <div className="table-header grid-1">
                        <select value={tableId} name="table" onChange={handleChange} className="filter filter-table">
                            <option value="">All Tables</option>
                            {tables && tables.map(table => <option value={table.id} key={table.id}>Table #{table.id}</option> )}
                        </select>

                    <div onClick={() => setIsTableModalActive(prev => !prev)} className="btn btn-create create-order-btn">
                        <i className="ri-add-line" /> CREATE ORDER
                    </div>
                </div>

                <div className="table-container">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Table</th>
                                <th>Employee</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.map(order => {
                                if (!tableId || order.table_id == tableId)
                                    return (
                                        <tr key={order.id}>
                                            <td>{order.table.number}</td>
                                            <td>{order.employee ? order.employee.name : "none"}</td>
                                            <td className="td-actions-waiter">
                                                <Link to={`/orders/waiter/edit/${order.id}`} className="btn btn-edit"><span>EDIT</span></Link>
                                                <button onClick={() => deleteOrder(order.id)} className="btn btn-delete"><span>DELETE</span></button>
                                            </td>
                                        </tr>
                                    )
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
                            <Link key={table.id} to={`/orders/waiter/create/${table.id}`} className="table">{table.number}</Link>
                        )}
                    </div>
                </div>
            </div>

            <MobileCreateButton onClick={() => setIsTableModalActive(prev => !prev)} />
        </div>
    )
}

export default Index