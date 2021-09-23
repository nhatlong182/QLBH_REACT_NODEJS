import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { productDetail, updateProduct } from '../actions/productAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants.js';
import axios from 'axios';

export default function EditProductScreen(props) {
    const productId = props.match.params.id

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

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
        if (e.target.value === "true") { setIsSale(true); }
        else {
            setIsSale(false);
            setSaleOff('0')
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(updateProduct(productId, name, price, image, category, brand, countInStock, description, isSale, saleOff))
    }

    return (
        <div>
            <Link to="/admin/tableProduct">Trở lại</Link>

            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Thêm sản phẩm</h1>
                </div>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : errorUpdate ? (<MessageBox variant="danger">{errorUpdate}</MessageBox>) :
                    (
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
                                <img src={image} alt={name} className="img_edit"></img>
                            </div>
                            <div>
                                <label htmlFor="imageFile">Hình ảnh:</label>
                                <input
                                    type="file"
                                    id="imageFile"
                                    label="Choose Image"
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
                            <div className="" onChange={radioIsSaleHandler}>
                                <label htmlFor="sale">Giảm giá</label>
                                <input className="male" type="radio" id="sale" name="sale" value="true" />
                                <label htmlFor="notSale">Không giảm giá</label>
                                <input className="male" type="radio" id="notSale" name="sale" value="false" />
                            </div>
                            <div>
                                <label htmlFor="saleOff">Phần trăm giảm giá:</label>
                                <input
                                    id="saleOff"
                                    type="text"
                                    placeholder="Phần trăm giảm giá:"
                                    value={saleOff}
                                    disabled={Boolean(!isSale)}
                                    onChange={(e) => setSaleOff(e.target.value)}
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
                                    Cập nhật
                                </button>
                            </div>
                        </>
                    )}
            </form>
        </div >
    )
}
