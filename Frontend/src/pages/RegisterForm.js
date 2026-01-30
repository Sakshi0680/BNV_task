import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const RegisterForm = () => {
    const [user, setUser] = useState({ fname: '', lname: '', email: '', mobile: '', gender: '', status: '', location: '' });
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // Append all text fields
        Object.keys(user).forEach(key => formData.append(key, user[key]));
        // Append the profile image
        if (file) formData.append('profile', file);

        try {
            await axios.post('http://localhost:5000/api/register', formData);
            alert("User saved successfully!");
        } catch (err) {
            alert("Error saving user. Check if Email is unique.");
        }
    };

    return (
        <div className="container mt-5 p-4 shadow-lg bg-white">
            <h2 className="text-center mb-4">Register Your Details</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}><Form.Group className="mb-3"><Form.Label>First name</Form.Label><Form.Control type="text" placeholder="Enter FirstName" onChange={(e) => setUser({...user, fname: e.target.value})} required /></Form.Group></Col>
                    <Col md={6}><Form.Group className="mb-3"><Form.Label>Last Name</Form.Label><Form.Control type="text" placeholder="Enter LastName" onChange={(e) => setUser({...user, lname: e.target.value})} required /></Form.Group></Col>
                </Row>
                <Row>
                    <Col md={6}><Form.Group className="mb-3"><Form.Label>Email address</Form.Label><Form.Control type="email" placeholder="Enter Email" onChange={(e) => setUser({...user, email: e.target.value})} required /></Form.Group></Col>
                    <Col md={6}><Form.Group className="mb-3"><Form.Label>Mobile</Form.Label><Form.Control type="text" placeholder="Enter Mobile" onChange={(e) => setUser({...user, mobile: e.target.value})} required /></Form.Group></Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Label>Select Your Gender</Form.Label>
                        <Form.Check type="radio" label="Male" name="gender" onChange={() => setUser({...user, gender: 'Male'})} />
                        <Form.Check type="radio" label="Female" name="gender" onChange={() => setUser({...user, gender: 'Female'})} />
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3"><Form.Label>Select Your Status</Form.Label>
                            <Form.Select onChange={(e) => setUser({...user, status: e.target.value})}>
                                <option>Select...</option>
                                <option value="Active">Active</option>
                                <option value="InActive">InActive</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}><Form.Group className="mb-3"><Form.Label>Select Your Profile</Form.Label><Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} /></Form.Group></Col>
                    <Col md={6}><Form.Group className="mb-3"><Form.Label>Enter Your Location</Form.Label><Form.Control type="text" placeholder="Enter Your Location" onChange={(e) => setUser({...user, location: e.target.value})} required /></Form.Group></Col>
                </Row>
                <Button variant="danger" type="submit" className="w-100 mt-3" style={{backgroundColor: '#7a2021'}}>Submit</Button>
            </Form>
        </div>
    );
};

export default RegisterForm;