import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_BASE_URL = "https://bnv-task-uso1.onrender.com/api";

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get("https://bnv-task-uso1.onrender.com/api/users");
            if (res.data && res.data.data) {
                setUsers(res.data.data);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            setError("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        window.open(`${API_BASE_URL}/export-users`, "_blank");
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`${API_BASE_URL}/delete-user/${id}`);
                fetchUsers();
            } catch (err) {
                alert("Error deleting user");
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [search]);

    return (
        <div className="container shadow-sm p-4 mt-4 bg-white rounded">
            <div className="d-flex justify-content-between mb-4">
                <Form.Control 
                    type="text" 
                    placeholder="Search users..." 
                    className="w-25"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div>
                    <Link to="/register" className="btn btn-danger me-2">+ Add User</Link>
                    <Button variant="success" onClick={handleExport}>Export To Csv</Button>
                </div>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="danger" />
                    <p>Connecting to Database...</p>
                </div>
            ) : (
                <Table responsive hover>
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>FullName</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{`${user.fname} ${user.lname}`}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <Link to={`/user/${user._id}`} className="btn btn-sm btn-info me-2">View</Link>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No users found in Database</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default UserList;