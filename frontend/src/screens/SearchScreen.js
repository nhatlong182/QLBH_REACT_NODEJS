import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction.js';
import { Link, useParams } from 'react-router-dom';

import Product from '../components/Product.js'
import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'
import '../css/search.css';

export default function SearchScreen() {
    const [filterIsOpen, setfilterIsOpen] = useState(false);

    const { pageNumber = 1, limit = 12, name = 'all', category = 'all', min = 0, max = 0, sort = 'default' } = useParams();


    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    const Category = useSelector((state) => state.categoryList)
    const { categories } = Category;
    const dispatch = useDispatch();


    const getFilterUrl = (filter) => {
        const filterPage = filter.page || pageNumber;

        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const sortOrder = filter.sort || sort;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/sort/${sortOrder}/pageNumber/${filterPage}`;
    };

    useEffect(() => {
        dispatch(
            listProducts({
                pageNumber,
                limit,
                category: category === 'all' ? '' : category,
                name: name === 'all' ? '' : name,
                min,
                max,
                sort: sort === 'default' ? '' : sort,
            })
        );
    }, [dispatch, pageNumber, limit, category, name, min, max, sort]);


    return (
        <div>
            <div className="category-list">
                <ul className="">
                    <li>
                        <Link to={getFilterUrl({ category: 'all' })}>Mặc định</Link>
                    </li>
                    {categories?.map((category, index) => (
                        <li key={index} className="">
                            <Link to={getFilterUrl({ category: category, })}>{category}</Link>
                        </li>
                    ))}

                </ul>
            </div>
            <div className="shop-sidebar">
                <div className="filterbtn">
                    <span onClick={() => setfilterIsOpen(!filterIsOpen)} className="btn-filter" >Lọc</span>
                </div>
                <div className={filterIsOpen ? 'filter' : ''} id="filterbar">
                    <div className="filter-content">
                        <ul className="filter-data">
                            <h3 className="text-sortby">Sort By</h3>
                            <li><Link to={getFilterUrl({ sort: 'default', })}>Mặc định</Link></li>
                            <li><Link to={getFilterUrl({ sort: 'lowest', page: 1 })}>Giá: Từ Thấp đến Cao</Link></li>
                            <li><Link to={getFilterUrl({ sort: 'highest', page: 1 })}>Giá: Từ Cao đến Thấp</Link></li>

                        </ul>
                        <ul className="filter-data" >
                            <h3 className="text-sortby">Giá</h3>
                            <li><Link to={getFilterUrl({ min: 0, max: 0, page: 1 })}>Mặc định</Link></li>
                            <li><Link to={getFilterUrl({ min: 1, max: 199999, page: 1 })}>dưới 200,000₫</Link></li>
                            <li><Link to={getFilterUrl({ min: 200000, max: 400000, page: 1 })}>200,000₫ - 400,000₫</Link></li>
                            <li><Link to={getFilterUrl({ min: 400000, max: 600000, page: 1 })}>400,000₫ - 600,000₫</Link></li>
                            <li><Link to={getFilterUrl({ min: 600000, max: 800000, page: 1 })}>600,000₫ - 800,000₫</Link></li>
                            <li><Link to={getFilterUrl({ min: 800000, max: 1000000, page: 1 })}>800,000₫ - 1,000,000₫</Link></li>
                            <li><Link to={getFilterUrl({ min: 1000000, max: 10000000, page: 1 })}>trên 1,000,000₫</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            {
                !pages ? (<div className="popular_container"> Không tìm thấy sản phẩm</div>)
                    : (
                        <div>
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
        </div>
    )
}
