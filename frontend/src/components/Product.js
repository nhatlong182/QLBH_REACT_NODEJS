import React from 'react'
import { Link } from 'react-router-dom'
import '../css/products.css'

export default function Product(props) {
    const { product } = props;

    return (
        <div key={product._id} className="card">
            {product.isSale && (<span className="smart">-{product.saleOff}%</span>)}
            <Link to={`/products/${product._id}`}>
                <img className="medium" src={product.image} alt={product.name} />
            </Link>
            <div className="card-body">
                <Link to={`/products/${product._id}`}>
                    <h2 className="product-name">{product.name}</h2>
                </Link>
                {product.isSale ?
                    (
                        <div className="price-container">
                            <span className="price-new">{(product.price - (product.price * product.saleOff / 100)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            <span className="price-old">{(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                    )
                    : (<span className="price-normal">{(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>)}
            </div>

        </div>
    )
}
