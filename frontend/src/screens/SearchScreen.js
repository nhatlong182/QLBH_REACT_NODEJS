import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction.js';

import Product from '../components/Product.js'
import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'
import { Link, useParams } from 'react-router-dom';

export default function SearchScreen() {
    const { pageNumber = 1 } = useParams();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    const dispatch = useDispatch();


    const getFilterUrl = (filter) => {
        const filterPage = filter.page || pageNumber;
        // const filterCategory = filter.category || category;
        // const sortOrder = filter.order || order;
        // const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        // const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/search/pageNumber/${filterPage}`;
    };



    useEffect(() => {
        dispatch(listProducts({ pageNumber }));
    }, [dispatch, pageNumber]);


    return (
        <div>
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
            <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                    <Link
                        className={x + 1 === page ? 'active' : ''}
                        key={x + 1}
                        to={getFilterUrl({ page: x + 1 })}
                    >
                        {x + 1}
                    </Link>
                ))}

            </div>
        </div>
    )
}
