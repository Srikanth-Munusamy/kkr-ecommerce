import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';

const UpdateCategoryForm = ({ show, onClose, category, onUpdate }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (show && category) {
      // Initialize form fields with existing category data
      setCategoryName(category.categoryName || '');
      setCategoryImage(null); // Reset the image state
      setImagePreview(category.categoryImage 
        ? `http://localhost:5000/images/category/${category.categoryImage}` 
        : ''); // Show existing image or empty
    }
  }, [show, category]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCategoryImage(file);
      setImagePreview(URL.createObjectURL(file)); // Update preview with new image
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('categoryName', categoryName);
    if (categoryImage) {
      formData.append('categoryImage', categoryImage);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/category/${category.categoryId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      onUpdate(); // Refresh categories after update
      onClose(); // Close the form
    } catch (error) {
      setError('Failed to update category. Please try again.');
      console.error('Failed to update category', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCategoryImage" className="mt-3">
            <Form.Label>Category Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              </div>
            )}
          </Form.Group>
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
          <div className="mt-3">
            <Button variant="primary" type="submit">
              Update
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

export default UpdateCategoryForm;
