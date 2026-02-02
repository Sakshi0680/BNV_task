import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get("https://bnv-task-uso1.onrender.com/");
            if (res.data && res.data.data) {
                setUsers(res.data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h3>User Management</h3>
                <Link to="/register" className="btn btn-danger">+ Add User</Link>
            </div>

            {loading ? <Spinner animation="border" /> : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Location</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{`${user.fname} ${user.lname}`}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>{user.location}</td>
                                <td>{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default UserList;