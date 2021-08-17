import React, { useEffect } from 'react'
import Product from '../components/Product.js'
import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'
import { useDispatch, useSelector } from 'react-redux';
import { popularProducts } from '../actions/productAction.js';

export default function HomeScreen() {
    const productList = useSelector((state) => state.homeProductList);
    const { loading, error, products } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(popularProducts());
    }, [dispatch]);

    return (
        <div>
            <div className="">
                <img className="slider" src="/images/slider_1.jpg" alt="slider"></img>
            </div>
            <h2>Một số sản phẩm nổi bật</h2>
            {
                loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                    <div className="row center">
                        {
                            products?.map(product => (
                                <Product key={product._id} product={product}></Product>
                            ))
                        }
                    </div>
            }

        </div>
    )
}
