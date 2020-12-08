import React, {useState, useContext} from "react"
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"
import { Context } from "../../../Context"
import SummaryQuantity from "../../../components/SummaryQuantity"
import ProductsModal from "../../../misc/ProductsModal"

function Create() {
    const { tableId } = useParams()
    const {settings, notify, products, findProduct, retrieveOrders, formatPrice, getTotalPrice} = useContext(Context)
    const [order, setOrder] = useState({ table_id: tableId, employee_id: 3, products: []})
    const [isProductModalActive, setIsProductModalActive] = useState(false)

    let history = useHistory();

    function addToOrder(product) {
        const orderCopy = { ...order, products: [...order.products, product] }
        setOrder(orderCopy)

        setIsProductModalActive(false)
    }

    function createOrder(event) {
        event.preventDefault()

        axios.post(`${settings.API_URL}/api/orders`, order)
            .then(response => {
                notify("success", "Order has been created")
                retrieveOrders()
                history.push('/orders/waiter')
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

    return (
        <div className="container container-center create-order-container">
            <form onSubmit={createOrder} className="create-order-form">
                <div className="order-header">
                    <h1 className="page-title">Table #{tableId}</h1>
                    <div onClick={() => setIsProductModalActive(prev => !prev)} className="btn btn-create">
                        <i className="ri-add-line" />
                        ADD PRODUCT
                    </div>
                </div>

                <div className="order-summary">
                    <h2><i className="ri-file-list-2-line" /> Summary</h2>
                    <div className="summary-products">
                        {(order && products) && order.products.length ? order.products.map(product => {
                            const productObject = findProduct(product.id)

                                if(productObject) {
                                    return (
                                        <div key={product.id} className="summary-product">{productObject.name} <div className="right">{formatPrice(productObject.price)} <SummaryQuantity quantity={product.quantity} id={productObject.id} increment={increment} decrement={decrement} /></div></div>
                                    )
                                }
                        }) : <h3>No results</h3>}
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

export default Create