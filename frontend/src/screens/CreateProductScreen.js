import React, { useEffect, useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert';

import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productAction.js'


import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET } from '../constants.js';



export default function CreateProductScreen(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

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
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Thêm sản phẩm</h1>
                </div>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Tên sản phẩm:</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Tên sản phẩm"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="price">Giá:</label>
                            <input
                                id="price"
                                type="text"
                                placeholder="Giá"
                                value={price}
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="imageFile">Hình ảnh:</label>
                            <input
                                type="file"
                                id="imageFile"
                                label="Choose Image"
                                required
                                onChange={uploadFileHandler}
                            ></input>

                        </div>
                        <div>
                            <label htmlFor="category">Loại sản phẩm</label>
                            <input
                                id="category"
                                type="text"
                                placeholder="Loại sản phẩm"
                                value={category}
                                required
                                onChange={(e) => setCategory(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="brand">Hãng</label>
                            <input
                                id="brand"
                                type="text"
                                placeholder="Hãng"
                                value={brand}
                                required
                                onChange={(e) => setBrand(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="countInStock">Số lượng trong kho:</label>
                            <input
                                id="countInStock"
                                type="text"
                                placeholder="Số lượng trong kho"
                                value={countInStock}
                                required
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="description">Mô tả:</label>
                            <textarea
                                id="description"
                                rows="3"
                                type="text"
                                placeholder="Mô tả"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
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
