import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction.js';

import Product from '../components/Product.js'
import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'

export default function SearchScreen() {

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>
            {
                loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                    <div className="row center">
                        {
                            products.map(product => (
                                <Product key={product._id} product={product}></Product>
                            ))
                        }
                    </div>
            }
        </div>
    )
}
