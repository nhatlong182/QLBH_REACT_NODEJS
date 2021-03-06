import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderAction.js';
import { ORDER_CREATE_RESET } from '../constants.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


import "../css/shippingAddress.css"

export default function ShippingAddressScreen(props) {

    const cart = useSelector((state) => state.cart);

    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((sum, i) => sum + i.qty * i.price, 0)
    );
    cart.shippingPrice = 0;
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;


    const [data, setData] = useState([]);

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');

    const [isDisable, setIsDisable] = useState(true);
    const [arrayDistricts, setArrayDistricts] = useState([]);

    const dispatch = useDispatch();



    const selectHandler = (e) => {
        setCity(e.target.value)
        setIsDisable(false)
        e.target.selectedIndex - 1 < 0 ? setArrayDistricts(data[0].districts) : setArrayDistricts(data[e.target.selectedIndex - 1].districts)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const shippingAddress = {}
        shippingAddress.fullName = fullName
        shippingAddress.phone = phone
        shippingAddress.address = address
        shippingAddress.city = city
        shippingAddress.district = district
        cart.shippingAddress = shippingAddress

        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));

    };

    useEffect(() => {

        setFullName(userInfo.name)
        setPhone(userInfo.phone)

        if (success) {
            swal({
                text: "????t h??ng th??nh c??ng!!!",
                icon: "success",
                button: false,
                timer: 1500,
            });
            props.history.push(`/order/${order._id}`);

            dispatch({ type: ORDER_CREATE_RESET });
        }
        // eslint-disable-next-line
    }, [dispatch, success, order, props.history])

    useEffect(() => {
        async function fetchAPI() {
            const response = await axios.get("https://provinces.open-api.vn/api/?depth=2")
            setData(response.data)
        }
        fetchAPI()

    }, [])

    return (
        <div>
            <div className="left">
                <label></label>
                <form className="form" onSubmit={submitHandler}>
                    <label>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </label>
                    <div>
                        <h1>Th??ng tin mua h??ng</h1>
                    </div>
                    <div>
                        <label htmlFor="fullName">H??? v?? t??n</label>
                        <input
                            className="select-input"
                            type="text"
                            id="fullName"
                            placeholder="H??? v?? t??n"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="phone">S??? ??i???n tho???i</label>
                        <input
                            className="select-input"
                            type="text"
                            id="phone"
                            placeholder="S??T"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="address">?????a ch???</label>
                        <input
                            className="select-input"
                            type="text"
                            id="address"
                            placeholder="?????a ch???"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div className='option-custom'>
                        <label htmlFor="city">T???nh th??nh</label>
                        <select id='city' className='select-input' value={city} onChange={selectHandler}>
                            <option key={0} value={0}> {"---"}</option>
                            {data.map((item, index) => (
                                <option key={index} value={item.name}> {item.name} </option>
                            ))}
                        </select>
                    </div>
                    <div className='option-custom'>
                        <label htmlFor="district">Qu???n huy???n</label>
                        <select id='district' className='select-input' value={district} onChange={(e) => setDistrict(e.target.value)} disabled={isDisable}>
                            <option key={0} value={''}> {"---"}</option>
                            {arrayDistricts?.map((item, index) => (
                                <option key={index} value={item.name}> {item.name} </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label />
                        <button className="primary" type="submit">
                            Ti???p t???c
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}
