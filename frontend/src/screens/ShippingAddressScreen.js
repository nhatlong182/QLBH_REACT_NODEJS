import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';


import "../css/shippingAddress.css"

export default function ShippingAddressScreen() {

    // const cart = useSelector((state) => state.cart);
    // const { shippingAddress } = cart;

    const [data, setData] = useState([]);

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');

    const [isDisable, setIsDisable] = useState(true);
    const [arrayDistricts, setArrayDistricts] = useState([]);


    const selectHandler = (e) => {
        setCity(e.target.value)
        setIsDisable(false)
        setArrayDistricts(data[e.target.selectedIndex - 1].districts)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(fullName)
        console.log(phone)
        console.log(address, district, city)
        console.log(" ")
    };

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
                <form className="form" onSubmit={submitHandler}>
                    <div>
                        <h1>Thông tin mua hàng</h1>
                    </div>
                    <div>
                        <label htmlFor="fullName">Họ và tên</label>
                        <input
                            className="select-input"
                            type="text"
                            id="fullName"
                            placeholder="Họ và tên"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                            className="select-input"
                            type="text"
                            id="phone"
                            placeholder="SĐT"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="address">Địa chỉ</label>
                        <input
                            className="select-input"
                            type="text"
                            id="address"
                            placeholder="Địa chỉ"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></input>
                    </div>

                    <div className='option-custom'>
                        <label htmlFor="city">Tỉnh thành</label>
                        <select id='city' className='select-input' value={city} onChange={(e) => selectHandler(e)}>
                            <option key={0} value={''}> {"---"}</option>
                            {data.map((item, index) => (
                                <option key={index} value={item.name}> {item.name} </option>
                            ))}
                        </select>
                    </div>
                    <div className='option-custom'>
                        <label htmlFor="district">Quận huyện</label>
                        <select id='district' className='select-input' value={district} onChange={(e) => setDistrict(e.target.value)} disabled={isDisable}>
                            <option key={0} value={''}> {"---"}</option>
                            {arrayDistricts.map((item, index) => (
                                <option key={index} value={item.name}> {item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label />
                        <button className="primary" type="submit">
                            Tiếp tục
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}
