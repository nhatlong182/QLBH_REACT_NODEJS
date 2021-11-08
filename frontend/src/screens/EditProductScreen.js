import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { productDetail, updateProduct } from '../actions/productAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants.js';
import axios from 'axios';

import '../css/editProduct.css';

export default function EditProductScreen(props) {
    const productId = props.match.params.id

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const Category = useSelector((state) => state.categoryList)
    const { categories } = Category;

    const productDetails = useSelector((state) => state.productDetail);
    const { loading, error, product } = productDetails;

    const update = useSelector((state) => state.productUpdate);
    const { error: errorUpdate, success } = update;

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [isSale, setIsSale] = useState(false);
    const [saleOff, setSaleOff] = useState('');
    const [description, setDescription] = useState('Mô tả');

    const dispatch = useDispatch();

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file)


        try {
            const { data } = await axios.post('/api/uploads', bodyFormData, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            })
            setImage('/images/' + data.filename);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (success) {
            swal({
                text: "Cập nhật sản phẩm thành công",
                icon: "success",
                button: false,
                timer: 1500,
            });
            dispatch({ type: PRODUCT_UPDATE_RESET });
            props.history.push('/admin/tableProduct')
        }
        //lấy thông tin sản phẩm trong db
        if (!product || product._id !== productId || success) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(productDetail(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description);
            setIsSale(product.isSale);
            setSaleOff(product.saleOff);
        }

    }, [dispatch, productId, product, success, props.history]);

    const radioIsSaleHandler = (e) => {
        if (e.target.value === "true") { setIsSale(true) }
        else {
            setIsSale(false)
            setSaleOff('0')
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(updateProduct(productId, name, price, image, category, brand, countInStock, description, isSale, saleOff))
    }

    return (
        <div>
            <Link to="/admin/tableProduct"> <i className="fas fa-arrow-left"></i> Trở lại</Link>

            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sửa sản phẩm</h1>
                </div>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : errorUpdate ? (<MessageBox variant="danger">{errorUpdate}</MessageBox>) :
                    (
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
                                <div onChange={radioIsSaleHandler}>
                                    <label className="label-input" htmlFor="sale">Giảm giá</label>
                                    <input className="male" type="radio" id="sale" name="sale" value={true} />
                                    <label className="label-input" htmlFor="notSale">Không giảm giá</label>
                                    <input className="male" type="radio" id="notSale" name="sale" value={false} />
                                </div>
                                <div>
                                    <label className="label-input-sale" htmlFor="saleOff">Phần trăm giảm giá:</label>
                                    <select id='saleOff' className='next-input-1'
                                        value={saleOff}
                                        disabled={Boolean(!isSale)}
                                        onChange={(e) => setSaleOff(e.target.value)}
                                    >
                                        {[...Array(10).keys()].map(
                                            (x) => (
                                                <option key={x} value={x * 10}>
                                                    {x * 10} %
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
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
                            <div className="ui-img">
                                <img src={image} alt={name} className="img_edit"></img>
                            </div>

                            <div>
                                <label></label>
                                <button className="primary" type="submit">
                                    Cập nhật
                                </button>
                            </div>

                        </>
                    )}
            </form>
        </div >
    )
}
