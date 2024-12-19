import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Image } from 'react-bootstrap';

const CreateSubcategoryForm = ({ show, onClose, onCreate, categories }) => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      setSubcategoryName('');
      setSelectedCategory('');
      setCategoryImage(null);
      setImagePreview('');
      setError('');
    }
  }, [show]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCategoryImage(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview of selected image
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('subcategoryName', subcategoryName);
    formData.append('categoryId', selectedCategory);
    if (categoryImage) {
      formData.append('subcategoryImage', categoryImage);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/subcategory',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Required for file uploads
          },
        }
      );
      onCreate(); // Refresh subcategories after creation
      onClose(); // Close the form
    } catch (error) {
      setError('Failed to create subcategory. Please try again.');
      console.error('Failed to create subcategory', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Subcategory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formSubcategoryName">
            <Form.Label>Subcategory Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subcategory name"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
              required
            />
            {error && <Form.Text className="text-danger">{error}</Form.Text>}
          </Form.Group>

          <Form.Group controlId="formCategory" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formSubcategoryImage" className="mt-3">
            <Form.Label>Subcategory Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-2">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  rounded
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              </div>
            )}
          </Form.Group>

          <div className="mt-3">
            <Button variant="primary" type="submit">
              Create
            </Button>
            <Button variant="secondary" onClick={onClose} className="ms-2">
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateSubcategoryForm;
