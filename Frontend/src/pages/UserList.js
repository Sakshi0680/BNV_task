import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 🛠️ Fetch Users with Error Handling
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            // Using a relative path or environment variable is better for production
            const res = await axios.get(`http://localhost:5000/api/all-users?search=${search}`);
            
            if (res.data && res.data.users) {
                setUsers(res.data.users);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            setError("Failed to fetch users. Please ensure the Backend and Database are connected.");
        } finally {
            setLoading(false);
        }
    };

    // 🛠️ Export CSV Handler
    const handleExport = () => {
        window.open("http://localhost:5000/api/export-users", "_blank");
    };

    // 🛠️ Delete User Placeholder
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`http://localhost:5000/api/delete-user/${id}`);
                fetchUsers(); // Refresh list after delete
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

            {/* Show error message if backend/DB is down */}
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
                            <th>ID</th><th>FullName</th><th>Email</th><th>Gender</th><th>Status</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{`${user.fname} ${user.lname}`}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender === 'Male' ? 'M' : 'F'}</td>
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
                                <td colSpan="6" className="text-center">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default UserList;