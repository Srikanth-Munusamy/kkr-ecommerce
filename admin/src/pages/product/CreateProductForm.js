import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Col, Row } from 'react-bootstrap';

const CreateProductForm = ({ show, onClose, onCreate, subcategories }) => {
  const initialProductState = {
    productBrand: '',
    productName: '',
    productPrice: '',
    productDiscount: '',
    productDescription: '',
    productStockQuantity: '',
    subcategoryId: '',
    isFeatured: '0' // Initialize as '0' (No)
  };

  const [product, setProduct] = useState(initialProductState);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('productBrand', product.productBrand);
      formData.append('productName', product.productName);
      formData.append('productPrice', product.productPrice);
      formData.append('productDiscount', product.productDiscount);
      formData.append('productDescription', product.productDescription);
      formData.append('productStockQuantity', product.productStockQuantity);
      formData.append('subcategoryId', product.subcategoryId);
      formData.append('isFeatured', product.isFeatured);

      images.forEach((image) => {
        formData.append('productImages', image);
      });

      await axios.post('http://localhost:5000/product', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Important for file uploads
        }
      });

      onCreate();
      resetForm();
      onClose();
    } catch (error) {
      setError('Failed to create product. Please try again.');
      console.error('Failed to create product', error);
    }
  };

  const resetForm = () => {
    setProduct(initialProductState);
    setImages([]);
    setImagePreviews([]);
    setError('');
  };

  return (
    <Modal show={show} onHide={() => { resetForm(); onClose(); }} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formProductBrand">
            <Form.Label column sm={4}>Brand</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                name="productBrand"
                placeholder="Enter product brand"
                value={product.productBrand}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
        
          <Form.Group as={Row} controlId="formProductName">
            <Form.Label column sm={4}>Name</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                name="productName"
                placeholder="Enter product name"
                value={product.productName}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formProductPrice">
            <Form.Label column sm={4}>Price</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="number"
                name="productPrice"
                placeholder="Enter product price"
                value={product.productPrice}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formProductDiscount">
            <Form.Label column sm={4}>Discount Price</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="number"
                name="productDiscount"
                placeholder="Enter discount price"
                value={product.productDiscount}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formProductDescription">
            <Form.Label column sm={4}>Description</Form.Label>
            <Col sm={8}>
              <Form.Control
                as="textarea"
                rows={3}
                name="productDescription"
                placeholder="Enter product description"
                value={product.productDescription}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formProductStockQuantity">
            <Form.Label column sm={4}>Stock Quantity</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="number"
                name="productStockQuantity"
                placeholder="Enter stock quantity"
                value={product.productStockQuantity}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formsubCategory">
            <Form.Label column sm={4}>Sub Category</Form.Label>
            <Col sm={8}>
              <Form.Control
                as="select"
                name="subcategoryId"
                value={product.subcategoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {subcategories.map(categorie => (
                  <option key={categorie.subcategoryId} value={categorie.subcategoryId}>
                    {categorie.subcategoryName}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formIsFeatured">
            <Form.Label column sm={4}>Featured</Form.Label>
            <Col sm={8}>
              <Form.Control
                as="select"
                name="isFeatured"
                value={product.isFeatured}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group controlId="formProductImages">
            <Form.Label>Product Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="image-previews mt-3">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="image-preview">
                  <img src={preview} alt={`Preview ${index}`} />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveImage(index)}
                    className="position-absolute top-0 end-0"
                  >
                    X
                  </Button>
                </div>
              ))}
            </div>
          </Form.Group>
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
          <div className="mt-3">
            <Button variant="primary" type="submit">
              Create
            </Button>
            <Button variant="secondary" onClick={() => { resetForm(); onClose(); }} className="ms-2">
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <style>{`
        .image-previews {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .image-preview {
          position: relative;
          width: 100px;
          height: 100px;
          border: 1px solid #ddd;
          border-radius: 4px;
          overflow: hidden;
        }
        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .image-preview button {
          position: absolute;
          top: 0;
          right: 0;
          margin: 4px;
        }
      `}</style>
    </Modal>
  );
};

export default CreateProductForm;


