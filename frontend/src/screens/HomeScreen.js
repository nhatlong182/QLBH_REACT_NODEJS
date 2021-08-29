import React, { useEffect } from 'react'
import Product from '../components/Product.js'
import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'
import { useDispatch, useSelector } from 'react-redux';
import { popularProducts, saleOffProducts } from '../actions/productAction.js';
import "../css/home.css"

export default function HomeScreen() {
    const popularProduct = useSelector((state) => state.popularProductList);
    const { loading, error, products } = popularProduct;

    const saleOffProduct = useSelector((state) => state.saleOffProductList)
    const { loading: loadingSales, error: errorSale, saleProduct } = saleOffProduct;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(popularProducts());
        dispatch(saleOffProducts());
    }, [dispatch]);

    return (
        <div>
            <div className="">
                <img className="slider" src="/images/slider_1.jpg" alt="slider"></img>
            </div>
            <div>
                <h2 className="popular_title">SẢN PHẢM NỔI BẬT</h2>
                {
                    loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                        <div className="popular_container">
                            {
                                products?.map(product => (
                                    <Product key={product._id} product={product}></Product>
                                ))
                            }
                        </div>
                }
            </div>
            <div>
                <h2 className="popular_title">ĐANG KHUYẾN MÃI</h2>
                <h3 className="popular_sub_title">Giảm giá</h3>
                {
                    loadingSales ? <LoadingBox></LoadingBox> : errorSale ? <MessageBox variant="danger">{error}</MessageBox> :
                        <div className="popular_container">
                            {
                                saleProduct?.map(product => (
                                    <Product key={product._id} product={product}></Product>
                                ))
                            }
                        </div>
                }
            </div>

        </div>
    )
}
