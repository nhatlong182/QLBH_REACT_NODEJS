import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productAction.js'
import { PRODUCT_CREATE_RESET } from '../constants.js';


import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import '../css/editProduct.css';


export default function CreateProductScreen(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const Category = useSelector((state) => state.categoryList)
    const { categories } = Category;

    const newProduct = useSelector((state) => state.productCreate);
    const { loading, error, success } = newProduct;

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('Mô tả');

    const [file, setFile] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (success) {
            swal({
                text: "Tạo mới sản phẩm thành công",
                icon: "success",
                button: false,
                timer: 1500,
            });
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push('/admin/tableProduct')
        }
    }, [dispatch, success, props.history]);


    const uploadFileHandler = (e) => {
        setFile(e.target.files[0])
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const bodyFormData = new FormData();
        bodyFormData.append('file', file)

        const { data } = await axios.post('/api/uploads', bodyFormData, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })

        dispatch(createProduct(name, price, '/images/' + data.filename, category, countInStock, brand, description))
    };

    return (
        <div>
            <Link to="/admin/tableProduct"> <i className="fas fa-arrow-left"></i> Trở lại</Link>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Thêm sản phẩm</h1>
                </div>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : (
                    <>
                        <div className="ui-info-head">
                            <label className="label-input" htmlFor="name">Tên sản phẩm:</label>
                            <input
                                className="next-input"
                                id="name"
                                type="text"
                                placeholder="Tên sản phẩm"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div className="ui-group">
                            <div className="ui-item">
                                <label className="label-input" htmlFor="brand">Hãng:</label>
                                <input
                                    className="next-input-1"
                                    id="brand"
                                    type="text"
                                    placeholder="Hãng"
                                    value={brand}
                                    required
                                    onChange={(e) => setBrand(e.target.value)}
                                ></input>
                                <label className="label-input-1" htmlFor="category">Loại sản phẩm:</label>
                                <select id='category' className='next-input-1' value={category} onChange={(e) => setCategory(e.target.value)}>
                                    {categories?.map((item, index) => (
                                        <option key={index} value={item.categoryId}> {item.categoryName} </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="label-input" htmlFor="price">Giá bán:</label>
                            <input
                                className="next-input"
                                id="price"
                                type="text"
                                placeholder="Giá"
                                value={price}
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label className="label-input" htmlFor="countInStock">Số lượng trong kho:</label>
                            <input
                                className="next-input"
                                id="countInStock"
                                type="text"
                                placeholder="Số lượng trong kho"
                                value={countInStock}
                                required
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label className="label-input" htmlFor="description">Mô tả:</label>
                            <textarea
                                className="next-input-2"
                                id="description"
                                rows="3"
                                type="text"
                                placeholder="Mô tả"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label className="label-input" htmlFor="imageFile">Hình ảnh:</label>
                            <input
                                type="file"
                                id="imageFile"
                                label="Choose Image"
                                onChange={uploadFileHandler}
                            ></input>
                        </div>
                        {/* <div className="ui-img">
                                <img src={image} alt={name} className="img_edit"></img>
                            </div> */}

                        <div>
                            <label></label>
                            <button className="primary" type="submit">
                                Thêm
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}
