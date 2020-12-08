import React, {useContext} from "react"
import {Context} from "../Context"

function ProductsModal({order, addToOrder, isProductModalActive, setIsProductModalActive}) {
    const {products, formatPrice} = useContext(Context)

    return (
        <div className={`modal-parent ${isProductModalActive && "active"}`}>
            <div className="modal select-product-modal">
                <div className="products">
                    {products.map(product => {
                        let alreadyInOrder = false

                        order.products.map(prod => {
                            if(prod.id === product.id) {
                                alreadyInOrder = true
                            }
                        })

                        return (
                            <div key={product.id} onClick={() => !alreadyInOrder && addToOrder({id: product.id, quantity: 1})} className={`product ${alreadyInOrder && "disabled"}`}>
                                {product.name}
                                <div className="right">{formatPrice(product.price)}</div>
                            </div>
                        )
                    }
                    )}
                </div>
                <div className="modal-footer">
                    <div onClick={() => setIsProductModalActive(false)} className="btn btn-cancel">
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsModal