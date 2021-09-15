import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction.js';
import { Link, useParams } from 'react-router-dom';

import Product from '../components/Product.js'
import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'
import  '../css/search.css';

export default function SearchScreen() {
    const [filterIsOpen, setfilterIsOpen] = useState(false);
    const { pageNumber = 1, limit = 12, name = '', category = '' } = useParams();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    const dispatch = useDispatch();
 

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || pageNumber;
        // const filterCategory = filter.category || category;
        // const sortOrder = filter.order || order;
        // const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        // const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/category/pageNumber/${filterPage}`;
    };



    useEffect(() => {
        dispatch(listProducts({ pageNumber, limit, category, name }));
    }, [dispatch, pageNumber, limit, category, name]);


    return (
        <div>
            <div className="shop-sidebar">
            <div className="filterbtn">
            <span onClick={() => setfilterIsOpen(!filterIsOpen)} className="btn-filter" >Lọc</span>
            </div>
            <div className={filterIsOpen ? 'filter' : ''} id="filterbar">
               <div className="filter-content">
                    <ul className="filter-data">
                        <h3 className="text-sortby">Sort By</h3>
                        <li>Giá: Từ Thấp đến Cao</li>
                        <li>Giá: Từ Cao đến Thấp</li>
                    </ul>
                    <ul className="filter-data" >
                        <h3 className="text-sortby">Giá</h3>
                        <li>0 - 200,000₫</li>
                        <li>200,000₫ - 400,000₫</li>
                        <li>400,000₫ - 600,000₫</li>
                        <li>600,000₫ - 800,000₫</li>
                        <li>800,000₫ - 1,000,000₫</li>
                    </ul>
               </div>
            </div>
            </div>
            {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                <div className="popular_container">
                    {
                        products?.map(product => (
                            <Product key={product._id} product={product}></Product>
                        ))
                    }
                </div>}
            {pages > 1 && (
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
            )}
        </div>
    )
}
