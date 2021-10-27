import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { deleteUser, listUser, authorizeWebmaster, unAuthorizeWebmaster } from '../actions/userAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DELETE_RESET } from '../constants.js';

export default function TableUser() {
    const userList = useSelector((state) => state.listUser);
    const { loading, error, users, page, pages } = userList;

    const userDelete = useSelector((state) => state.deleteUser);
    const { error: errorDelete, success: successDelete, } = userDelete;

    const userUpdate = useSelector((state) => state.updateUser);
    const { error: errorUpdate, success: successUpdate } = userUpdate;

    const [pageNumber, setPageNumber] = useState(1)
    const [name, setName] = useState('')


    const dispatch = useDispatch()

    const deleteUserHandler = async (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
            dispatch(deleteUser(userId));
        }
    }

    const searchHandle = () => {
        if (name === '') {
            dispatch(listUser({ pageNumber, name }))
        }
        else {
            dispatch(listUser({ name }))
        }
    }

    useEffect(() => {
        if (successDelete) {
            swal({
                text: "Xóa tài khoản thành công",
                icon: "success",
                button: false,
                timer: 1500,
            });
            dispatch({ type: USER_DELETE_RESET });
        }
        dispatch(listUser({ pageNumber }));
    }, [dispatch, pageNumber, successDelete, successUpdate]);

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : errorDelete ? (
        <MessageBox variant="danger">{errorDelete}</MessageBox>
    ) : errorUpdate ? (
        <MessageBox variant="danger">{errorUpdate}</MessageBox>
    ) : (
        <div className="col-md-12">
            <div className="table-responsive">
                <h1 className="title-order">Danh sách tài khoản</h1>
                <i className="fas fa-search"></i>
                <input className="search-text" placeholder="Tìm kiếm..." type="search" value={name} onChange={(e) => setName(e.target.value)}></input>
                <button className="sp-search" type="button" onClick={() => searchHandle()}>Tìm kiếm</button>
                <table className="table table-borderless table-data3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>EMAIL</th>
                            <th>TÊN</th>
                            <th>Chức vụ</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.isAdmin ? <span className="admin">Admin</span> : user.isWebmaster ? <span className="webmaster">Webmaster</span> : "User"}</td>
                                <td>
                                    {!user.isAdmin && (
                                        user.isWebmaster ? (
                                            <button
                                                type="button"
                                                className="small"
                                                id="btn-1"
                                                onClick={() => dispatch(unAuthorizeWebmaster(user._id))}
                                            >
                                                Thu quyền
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="small"
                                                id="btn-2"
                                                onClick={() => dispatch(authorizeWebmaster(user._id))}
                                            >
                                                Cấp quyền
                                            </button>
                                        ))}
                                    {
                                        user.isAdmin ? (
                                            <button
                                                type="button"
                                                className="small"
                                                id="btn-3"
                                                disabled
                                                onClick={() => deleteUserHandler(user._id)}
                                            >
                                                Xóa
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="small"
                                                id="btn-3"
                                                onClick={() => deleteUserHandler(user._id)}
                                            >
                                                Xóa
                                            </button>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {pages > 1 && (
                <ul className="row center pagination">
                    {[...Array(pages).keys()].map((x) => (
                        <li
                            className={x + 1 === page ? 'page-link active' : 'page-link'}
                            key={x + 1}
                            onClick={() => setPageNumber(x + 1)}
                        >
                            {x + 1}
                        </li>
                    ))}
                </ul>
            )}
        </div >
    )
}
