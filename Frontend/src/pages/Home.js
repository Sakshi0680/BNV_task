import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
// ... other imports

const Home = () => {
    // 1. Place the function inside your component before the return statement
    const exportData = () => {
        window.open("http://localhost:5000/api/export-users", "_blank");
    };

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">User Records</h2>
                
               
                <Button variant="success" onClick={exportData} className="px-4 fw-bold shadow-sm">
                    Export To CSV
                </Button>
            </div>

          
        </Container>
    );
};

export default Home;