import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listUser } from '../actions/userAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function TableUser() {

    const userList = useSelector((state) => state.listUser);
    const { loading, error, users, page, pages } = userList;


    const [pageNumber, setPageNumber] = useState(1)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(listUser({ pageNumber }));
    }, [dispatch, pageNumber]);

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div className="col-md-12">
            <div className="table-responsive">
                <h1>Danh sách tài khoản</h1>
                <table className="table table-borderless table-data3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>EMAIL</th>
                            <th>TÊN</th>
                            <th>ADMIN</th>
                            <th>Webmaster</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.isAdmin ? "Admin" : ""}</td>
                                <td>{user.isWebmaster ? "Webmaster" : ""}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="small"

                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {pages > 1 && (
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
            )}
        </div>
    )
}
