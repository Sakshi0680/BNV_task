import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const fetchUsers = async () => {
        const res = await axios.get(`http://localhost:5000/api/all-users?search=${search}`);
        setUsers(res.data.users);
    };

    const handleExport = async () => {
        window.open("http://localhost:5000/api/export-users", "_blank");
    };

    useEffect(() => { fetchUsers(); }, [search]);

    return (
        <div className="container shadow-sm p-4 mt-4 bg-white rounded">
            <div className="d-flex justify-content-between mb-4">
                <Form.Control 
                    type="text" 
                    placeholder="Search users..." 
                    className="w-25"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div>
                    <Link to="/register" className="btn btn-danger me-2">+ Add User</Link>
                    <Button variant="success" onClick={handleExport}>Export To Csv</Button>
                </div>
            </div>
            <Table responsive hover>
                <thead className="table-dark">
                    <tr>
                        <th>ID</th><th>FullName</th><th>Email</th><th>Gender</th><th>Status</th><th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{`${user.fname} ${user.lname}`}</td>
                            <td>{user.email}</td>
                            <td>{user.gender === 'Male' ? 'M' : 'F'}</td>
                            <td>{user.status}</td>
                            <td>
                                <Link to={`/user/${user._id}`} className="btn btn-sm btn-info me-2">View</Link>
                                <Button variant="sm btn-danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserList;