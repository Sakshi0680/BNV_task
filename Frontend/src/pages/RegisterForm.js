import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        fname: "", lname: "", email: "", mobile: "",
        gender: "", status: "", location: "", profile: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFileChange = (e) => {
        setUserData({ ...userData, profile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(userData).forEach(key => formData.append(key, userData[key]));

        try {
            await axios.post("https://bnv-task-uso1.onrender.com/api/register", formData);
            alert("Registration Successful!");
            navigate('/'); // Go back to list
        } catch (err) {
            console.error(err);
            alert("Error during registration");
        }
    };

    return (
        <Container className="mt-4 mb-5">
            <div className="text-center mb-4">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                     alt="Logo" style={{ width: '60px' }} />
                <h2 className="fw-bold mt-2">Register Your Details</h2>
            </div>
            <Card className="shadow-sm border-0 mx-auto" style={{ maxWidth: '800px' }}>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Label className="fw-bold">First name</Form.Label>
                                <Form.Control name="fname" onChange={handleChange} placeholder="Enter FirstName" required />
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Label className="fw-bold">Last Name</Form.Label>
                                <Form.Control name="lname" onChange={handleChange} placeholder="Enter LastName" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Label className="fw-bold">Email address</Form.Label>
                                <Form.Control name="email" type="email" onChange={handleChange} placeholder="Enter Email" required />
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Label className="fw-bold">Mobile</Form.Label>
                                <Form.Control name="mobile" onChange={handleChange} placeholder="Enter Mobile" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Label className="fw-bold">Select Your Gender</Form.Label>
                                <div>
                                    <Form.Check inline type="radio" label="Male" name="gender" value="Male" onChange={handleChange} />
                                    <Form.Check inline type="radio" label="Female" name="gender" value="Female" onChange={handleChange} />
                                </div>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Label className="fw-bold">Select Your Status</Form.Label>
                                <Form.Select name="status" onChange={handleChange} required>
                                    <option value="">Select...</option>
                                    <option value="Active">Active</option>
                                    <option value="InActive">InActive</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Label className="fw-bold">Select Your Profile</Form.Label>
                                <Form.Control type="file" onChange={handleFileChange} required />
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Label className="fw-bold">Enter Your Location</Form.Label>
                                <Form.Control name="location" onChange={handleChange} placeholder="Enter Location" required />
                            </Col>
                        </Row>
                        <Button variant="danger" type="submit" className="w-100 mt-4 py-2 fw-bold" style={{ backgroundColor: '#9e4b4b' }}>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default RegisterForm;