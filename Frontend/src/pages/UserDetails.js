import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';

const UserDetails = () => {
    const { id } = useParams(); // URL must be /user/:id
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Use environment variable for API base URL (local or Render)
    const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;
            try {
                const res = await axios.get(`${API_BASE_URL}/api/user/${id}`);
                setUser(res.data);
            } catch (err) {
                console.error("Error fetching user", err);
            }
        };
        fetchUser();
    }, [id, API_BASE_URL]);

    if (!user) return <div className="text-center mt-5">Loading User Data...</div>;

    const defaultIcon = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

    return (
        <Container className="mt-5">
            <Card className="shadow border-0 overflow-hidden" style={{ borderRadius: '15px' }}>
                <Row className="g-0">
                    <Col md={4} className="bg-danger d-flex align-items-center justify-content-center p-5" style={{ minHeight: '350px' }}>
                        <div className="rounded-circle bg-white d-flex align-items-center justify-content-center border border-4 border-white shadow" 
                             style={{ width: '180px', height: '180px' }}>
                            <img 
                                src={user.profile ? `${API_BASE_URL}/uploads/${user.profile}` : defaultIcon} 
                                alt="Profile"
                                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%' }}
                                onError={(e) => { e.target.src = defaultIcon; }} 
                            />
                        </div>
                    </Col>
                    <Col md={8} className="p-4 bg-white d-flex flex-column justify-content-center">
                        <Card.Body>
                            <h1 className="fw-bold mb-3">{user.fname} {user.lname}</h1>
                            <hr />
                            <div className="mt-4 fs-5">
                                <p><strong>📧 Email:</strong> {user.email}</p>
                                <p><strong>📱 Mobile:</strong> {user.mobile}</p>
                                <p><strong>🚻 Gender:</strong> {user.gender}</p>
                                <p><strong>📍 Location:</strong> {user.location}</p>
                                <p>
                                    <strong>Status: </strong>
                                    <Badge bg={user.status === 'Active' ? 'success' : 'secondary'} className="ms-2 px-3">
                                        {user.status}
                                    </Badge>
                                </p>
                            </div>
                            <Button variant="dark" onClick={() => navigate('/')} className="mt-4 px-4 py-2">
                                Back to List
                            </Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default UserDetails;
