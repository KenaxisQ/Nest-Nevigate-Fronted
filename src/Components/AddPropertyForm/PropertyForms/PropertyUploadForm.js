import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

export const PropertyUploadForm = () => {
    const [selectedFiles, setSelectedFiles] = useState(Array(8).fill("https://via.placeholder.com/150"));
    const [thumbnail, setThumbnail] = useState("https://via.placeholder.com/300x200");

    const handleFileChange = (index, file) => {
        const newFiles = [...selectedFiles];
        newFiles[index] = URL.createObjectURL(file);
        setSelectedFiles(newFiles);
    };

    const handleThumbnailChange = (file) => {
        setThumbnail(URL.createObjectURL(file));
    };

    return (
        <Container>
            {/* Asking Price Input */}
            <Row className="mb-3">
                <Col>
                    <Form.Group controlId="askingPrice">
                        <Form.Label>Enter Asking Price</Form.Label>
                        <Form.Control type="text" placeholder="Asking Price" />
                        <Form.Text muted>
                            This Price is what is potentially told to clients
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>

            {/* Thumbnail Image Upload */}
            <Row className="mb-3">
                <Col>
                    <Form.Group controlId="thumbnailImage">
                        <Form.Label>Upload Thumbnail Image</Form.Label>
                        <div>
                            <img src={thumbnail} alt="Thumbnail" className="img-fluid" style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <Form.Control 
                            type="file"
                            label="Choose Thumbnail" 
                            custom 
                            onChange={(e) => handleThumbnailChange(e.target.files[0])}
                        />
                    </Form.Group>
                </Col>
            </Row>

            {/* Additional Images Upload */}
            <Row className="mb-3">
                <Col>
                    <Form.Label>Upload Additional Images</Form.Label>
                    <Row>
                        {selectedFiles.map((src, index) => (
                            <Col xs={4} sm={3} md={2} key={index} className="mb-3">
                                <div className="position-relative">
                                    <img src={src} alt={`Upload ${index + 1}`} className="img-fluid" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                    <Form.Control
                                        type="file"
                                        className="position-absolute"
                                        style={{ top: 0, opacity: 0 }}
                                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                                    />
                                </div>
                            </Col>
                        ))}
                        <Col xs={4} sm={3} md={2} className="mb-3 d-flex align-items-center justify-content-center">
                            <Button variant="secondary" className="w-100 h-100">+</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Submit Button */}
            <Row className="mb-3">
                <Col>
                    <Button variant="success" className="w-100">Upload Property</Button>
                </Col>
            </Row>
        </Container>
    );
};
