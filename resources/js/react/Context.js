import React, {useState, useEffect} from "react"
import {toast} from 'react-toastify';
import axios from "axios"

const Context = React.createContext() 
const settings = {API_URL: "https://mysterious-inlet-16244.herokuapp.com"} 

function ContextProvider(props) {
    const [products, setProducts] = useState()
    const [orders, setOrders] = useState()
    const [tables, setTables] = useState()

    const notify = (type, message) => toast(message, {
        position: "top-right", 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: type
    });

    function findProduct(id) {
        if (products) {
            const product = products.find(prod => prod.id === id)
            return product
        }
    }

    function findOrder(id) {
        if (orders) {
            const order = orders.find(order => order.id == id)
            return order
        }
    }

    function formatPrice(value, multiplier = 1) {
        const price = '€' + ((value / 100) * multiplier).toFixed(2)
        return price
    }

    function getTotalPrice(products) {
        let total = 0

         products.map(product => {
            const prod = findProduct(product.id)

            if(prod) {

                if(product.pivot) {
                    total = total + (prod.price * product.pivot.quantity)
                } else {
                    total = total + (prod.price * product.quantity)
                }
            }
         })

        return total
    }

    // function getTotalPrice(products) {
    //     let total = 0

    //      products.map(product => {
    //         const prod = findProduct(product.id)

    //         if(prod) {
    //             total = total + (prod.price * product.quantity)
    //         }
    //      })

    //     return total
    // }

    function retrieveOrders() {
        axios.get(`${settings.API_URL}/api/orders`)
        .then(response => {
            setOrders(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        axios.get(`${settings.API_URL}/api/products`)
        .then(response => {
            setProducts(response.data)
        })
        .catch((error) => {
            console.log(error);
        })

        retrieveOrders()

        axios.get(`${settings.API_URL}/api/tables`)
        .then(response => {
            setTables(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <Context.Provider value={{settings, notify, products, findProduct, findOrder, retrieveOrders, orders, tables, formatPrice, getTotalPrice}}>
            {props.children}
        </Context.Provider>
    )
}

export {Context, ContextProvider}