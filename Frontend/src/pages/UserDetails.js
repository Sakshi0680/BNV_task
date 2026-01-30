import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Badge, Container, Row, Col } from 'react-bootstrap';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/${id}`)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!user) return <div className="text-center mt-5">Loading profile...</div>;

    return (
        <Container className="mt-5">
            <Card className="shadow-lg border-0">
                <Card.Body className="p-0">
                    <Row className="g-0">
                        <Col md={4} className="bg-danger d-flex align-items-center justify-content-center p-4">
                            <img 
                                src={`http://localhost:5000/uploads/${user.profile}`} 
                                alt="Profile" 
                                className="rounded-circle img-thumbnail" 
                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                            />
                        </Col>
                        <Col md={8} className="p-4">
                            <div className="d-flex justify-content-between">
                                <h2>{user.fname} {user.lname}</h2>
                                <Badge bg={user.status === 'Active' ? 'success' : 'secondary'}>{user.status}</Badge>
                            </div>
                            <hr />
                            <p><strong>📧 Email:</strong> {user.email}</p>
                            <p><strong>📱 Mobile:</strong> {user.mobile}</p>
                            <p><strong>🚻 Gender:</strong> {user.gender}</p>
                            <p><strong>📍 Location:</strong> {user.location}</p>
                            <Link to="/" className="btn btn-outline-dark mt-3">Back to List</Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserDetails;