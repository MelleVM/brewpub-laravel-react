import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"
import {Context} from "../../../Context"
import SummaryQuantity from "../../../components/SummaryQuantity"
import ProductsModal from "../../../misc/ProductsModal"
import { find } from "lodash"

function Edit() {
    const {settings, notify, products, findProduct, findOrder, retrieveOrders, formatPrice, getTotalPrice} = useContext(Context)
    const { orderId } = useParams()
    const [order, setOrder] = useState({ table_id: 1, employee_id: 3, products: [] })
    const [orderObject, setOrderObject] = useState(findOrder(orderId)) 
    const [isProductModalActive, setIsProductModalActive] = useState(false)


    let history = useHistory();

    function addToOrder(product) {
        const orderCopy = { ...order, products: [...order.products, product] }
        setOrder(orderCopy)

        setIsProductModalActive(false)
    }

    function editOrder(event) {
        event.preventDefault()

        axios.put(`${settings.API_URL}/api/orders/${orderObject.id}`, order)
            .then(response => {
                retrieveOrders()
                history.push('/orders/waiter')
                notify("success", "Order has been updated")
            })
            .catch((error) => {
                console.log(error);
            })
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


    useEffect(() => {
        if(orderId && order.products <= 0) {
            const oo = findOrder(orderId) 
            setOrderObject(oo)

            if(oo) {
                setOrder(prev => ({...prev, table_id: oo.table_id, employee_id: oo.employee_id}))

                oo.products.map(product => {
                    setOrder(prev => ({...prev, products: [...prev.products, {id: product.id, quantity: product.pivot.quantity}]}))
                })
            }

        }
    }, [findOrder])

    return (
        <div className="container container-center edit-order-container">
            <form onSubmit={editOrder} className="edit-order-form">
                <div className="order-header">
                    <h1 className="page-title">Table #{order.table_id}</h1>
                    <div onClick={() => setIsProductModalActive(prev => !prev)} className="btn btn-create">
                        <i className="ri-add-line" />
                        ADD PRODUCT
                    </div>
                </div>

                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-products">
                        {order && products && order.products.map(product => {

                            const productObject = findProduct(product.id)

                            if(productObject) {
                                return (
                                    <div key={product.id} className="summary-product">{productObject.name} <div className="right">{formatPrice(productObject.price)} <SummaryQuantity quantity={product.quantity} id={productObject.id} increment={increment} decrement={decrement} /></div></div>
                                )
                            }

                        })}
                    </div>
                    <div className="summary-total">Total: 
                        <div className="price">{formatPrice(getTotalPrice(order.products))}</div>
                        <div className="right">
                            <button type="submit" className="btn btn-create">Confirm</button>
                        </div>
                    </div>
                </div>

            </form>

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

export default Edit