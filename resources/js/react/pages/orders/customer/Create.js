import React, {useState, useContext} from "react"
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"
import SummaryQuantity from "../../../components/SummaryQuantity"
import ProductsModal from "../../../misc/ProductsModal"
import {Context} from "../../../Context"

function Create() {
    const { tableId } = useParams()
    const {settings, notify, products, findProduct, retrieveOrders, formatPrice, getTotalPrice} = useContext(Context)
    const [order, setOrder] = useState({ table_id: tableId, employee_id: null, products: []})
    const [isProductModalActive, setIsProductModalActive] = useState(false)

 let history = useHistory();

    function addToOrder(product) {
        const orderCopy = { ...order, products: [...order.products, product] }
        setOrder(orderCopy)

        setIsProductModalActive(false)
    }

    function createOrder() {
        if(order && order.products.length > 0) {
            axios.post(`${settings.API_URL}/api/orders`, order)
                .then(response => {
                    notify("success", "Order has been created")
                    retrieveOrders()
                    history.push(`/orders/customer/${tableId}`)
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            notify("error", "Select some beers first")
        }
    }

    function increment(id) {
        let orderCopy = { ...order, products: [] }

        order.products.map(product => {
            if(product.id === id) {
                const quantity = product.quantity + 1
                const productCopy = {...product, quantity}
                orderCopy.products.push(productCopy)
            } else {
                orderCopy.products.push(product)
            }
        })

        setOrder(orderCopy)
    }

    function decrement(id) {
        let orderCopy = { ...order, products: [] }

        order.products.map(product => {
            if (product.id === id) {
                const quantity = product.quantity - 1
                if(quantity > 0) {
                    const productCopy = { ...product, quantity }
                    orderCopy.products.push(productCopy)
                }
            } else {
                orderCopy.products.push(product)
            }
        })

        setOrder(orderCopy)
    }

    return (
        <div className="container container-center cm-create-order-container">
            <div className="page-title">
                <h1>Make an order!</h1>
            </div>

            <div className="sections">
                <div className="section">
                    <div className="orders-container">
                    <div className="table-wrapper">
                        <div className="table-header grid-1">
                            <div onClick={() => setIsProductModalActive(prev => !prev)} className="btn btn-create">
                                <i className="ri-add-line" />
                                ADD PRODUCT
                            </div>
                        </div>

                    <div className="table-container">
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(order && products) && order.products.length ? order.products.map(product => {
                                    const productObject = findProduct(product.id)

                                        if(productObject) {
                                            return (
                                                <tr key={product.id}>
                                                    <td>{productObject.name}</td>
                                                    <td>{formatPrice(productObject.price)}</td>
                                                    <td className="td-actions-customer">
                                                        <SummaryQuantity quantity={product.quantity} id={productObject.id} increment={increment} decrement={decrement} />
                                                    </td>
                                                </tr>
                                            )
                                        }
                                }) : <tr><td><h3 className="no-results">No results</h3></td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                </div>
                <div className="section section-order-summary">
                    <div className="summary-wrapper">
                        <h2>Summary</h2>
                        <div className="summary-products">

                                    {(order && products) && order.products.length ? order.products.map(product => {
                                        const productObject = findProduct(product.id)

                                            if(productObject) {
                                                return (
                                                    <div key={product.id} className="summary-product">{productObject.name} (x{product.quantity})
                                                        <div className="price">{formatPrice(productObject.price, product.quantity)}</div>
                                                    </div>
                                                )
                                            }
                                    }) : ""}

                        <div className="summary-total">
                            Total
                            <div className="price">{formatPrice(getTotalPrice(order.products))}</div>
                        </div>
                        <div onClick={createOrder} className={`btn btn-checkout ${order.products.length <= 0 && "disabled"}`}>
                                <i className="ri-bank-card-fill" /> Checkout

                            <div className="shape shape-1"></div>
                            <div className="shape shape-2"></div>
                            <div className="shape shape-3"></div>
                            <div className="shape shape-4"></div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="section"></div>
                <div className="section"></div>
            </div>

                        {products && 
                <ProductsModal
                    order={order}
                    addToOrder={addToOrder}
                    isProductModalActive={isProductModalActive}
                    setIsProductModalActive={setIsProductModalActive}
                />
            }
        </div>
    )
}

export default Create