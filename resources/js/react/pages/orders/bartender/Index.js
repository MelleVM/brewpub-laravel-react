import React, {useState, useEffect, useContext} from "react"
import {Context} from "../../../Context"
import {Link} from "react-router-dom"
import axios from "axios"

function Index() {
    const [isTableModalActive, setIsTableModalActive] = useState(false)
    const [tableId, setTableId] = useState()
    const { settings, retrieveOrders, notify, orders, tables } = useContext(Context)
    const [status, setStatus] = useState({})

    function editOrder(id, order) {
        axios.put(`${settings.API_URL}/api/orders/${id}`, order)
            .then(response => {
                retrieveOrders()
                notify("success", "Order has been updated")
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function handleChange(e) {
        const {value, name} = e.target

        if(name == "table") {
            setTableId(value)
        } else {
            setStatus(prev => ({...prev, [name]: value}))
            editOrder(name, {status: value})
        }
    }

    useEffect(() => {
        if(orders) {
            orders.map(order => {
                setStatus(prev => ({...prev, [`${order.id}`]: order.status}))
            })
        }   
    }, [orders])

    return (
        <div className="container orders-container">
            <div className="table-wrapper">
                <div className="table-header grid-1">
                    <select value={tableId} name="table" onChange={handleChange} className="filter filter-table">
                        <option value="">All Tables</option>
                        {tables && tables.map(table => <option value={table.id} key={table.id}>Table #{table.id}</option> )}
                    </select>
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
                                    if(!tableId || order.table_id == tableId)
                                        return (
                                            <tr key={order.id}>
                                                <td>{order.table.number}</td>
                                                <td>{order.employee ? order.employee.name : "none"}</td>
                                                <td className="td-actions-bartender">
                                                    <select name={order.id} value={status[order.id]} onChange={handleChange}>
                                                        <option value={0}>In Progress</option>
                                                        <option value={1}>Ready</option>
                                                        <option value={2}>Paid</option>
                                                    </select>
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
        </div>
    )
}

export default Index