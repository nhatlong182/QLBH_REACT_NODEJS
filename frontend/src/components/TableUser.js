import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUser, authorizeWebmaster, unAuthorizeWebmaster } from '../actions/userAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function TableUser() {
    const userList = useSelector((state) => state.listUser);
    const { loading, error, users, page, pages } = userList;

    const userDelete = useSelector((state) => state.deleteUser);
    const { error: errorDelete, success: successDelete, } = userDelete;

    const userUpdate = useSelector((state) => state.updateUser);
    const { error: errorUpdate, success: successUpdate } = userUpdate;

    const [pageNumber, setPageNumber] = useState(1)

    const dispatch = useDispatch()

    const deleteUserHandler = async (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
            dispatch(deleteUser(userId));
        }
    }

    useEffect(() => {
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
    ) :
        (
            <div className="col-md-12">
                <div className="table-responsive">
                    <h1>Danh sách tài khoản</h1>
                    <table className="table table-borderless table-data3">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>EMAIL</th>
                                <th>TÊN</th>
                                <th>Chức vụ</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.name}</td>
                                    <td>{user.isAdmin ? "Admin" : user.isWebmaster ? "Webmaster" : "User"}</td>
                                    <td>
                                        {!user.isAdmin && (
                                            user.isWebmaster ? (
                                                <button
                                                    type="button"
                                                    className="small"
                                                    onClick={() => dispatch(unAuthorizeWebmaster(user._id))}
                                                >
                                                    Thu quyền
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="small"
                                                    onClick={() => dispatch(authorizeWebmaster(user._id))}
                                                >
                                                    Cấp quyền
                                                </button>
                                            ))}
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() => deleteUserHandler(user._id)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {
                    pages > 1 && (
                        <div className="row center pagination">
                            {[...Array(pages).keys()].map((x) => (
                                <button
                                    type="button"
                                    className={x + 1 === page ? 'active' : ''}
                                    key={x + 1}
                                    onClick={() => setPageNumber(x + 1)}
                                >
                                    {x + 1}
                                </button>
                            ))}
                        </div>
                    )
                }
            </div >
        )
}
