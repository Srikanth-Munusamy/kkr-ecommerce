import React, { useEffect, useState } from 'react';
import { Table, Button,Container, Form } from 'react-bootstrap';
import CreateProductForm from './CreateProductForm';
import UpdateProductForm from './UpdateProductForm'; // Assuming this is implemented
import { fetchData, deleteResource } from '../apiOperations';

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const loadData = async () => {
    try {
      const subcategoriesData = await fetchData('/subcategory');
      const categoriesData = await fetchData('/category');
      const productsData = await fetchData('/product');
      setSubcategories(subcategoriesData);
      setCategories(categoriesData);
      setProducts(productsData);
    } catch (error) {
      console.error('Failed to load data', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteResource(`/product/${id}`);
      loadData(); // Refresh data after delete
    } catch (error) {
      console.error(`Failed to delete product with ID ${id}`, error);
    }
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setShowUpdateForm(true);
  };

  const handleCreateFormOpen = () => {
    setShowCreateForm(true);
  };

  const handleFormClose = () => {
    setShowCreateForm(false);
    setShowUpdateForm(false);
  };

  const handleUpdateComplete = () => {
    loadData(); // Refresh data after update
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory(''); // Reset subcategory when category changes
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    return (
      (!selectedCategory || product.subcategory.categoryId === parseInt(selectedCategory)) &&
      (!selectedSubcategory || product.subcategoryId === parseInt(selectedSubcategory))
    );
  });

  return (
    <Container className="mt-4">
      <h3>Products</h3>
      <Button variant="primary" onClick={handleCreateFormOpen}>
        Add Product
      </Button>

      <div className="mt-3">
        <Form.Group>
          <Form.Label>Filter by Category:</Form.Label>
          <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
            <option value=''>All Categories</option>
            {categories.map(category => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        
        <Form.Group className="mt-3">
          <Form.Label>Filter by Subcategory:</Form.Label>
          <Form.Control as="select" value={selectedSubcategory} onChange={handleSubcategoryChange}>
            <option value=''>All Subcategories</option>
            {subcategories
              .filter(subcategory => subcategory.categoryId === parseInt(selectedCategory))
              .map(subcategory => (
                <option key={subcategory.subcategoryId} value={subcategory.subcategoryId}>
                  {subcategory.subcategoryName}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      </div>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Name</th>
            <th>Price</th>
            <th>Discount Price</th>
            <th>Description</th>
            <th>Featured</th>
            <th>Stock Quantity</th>
            <th>Subcategory ID</th>
            <th>Sub Category Name</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productBrand}</td>
              <td>{product.productName}</td>
              <td>{product.productPrice}</td>
              <td>{product.productDiscount}</td>
              <td>{product.productDescription}</td>
              <td>{product.isFeatured ? "Yes" : "No"}</td>
              <td>{product.productStockQuantity}</td>
              <td>{product.subcategoryId}</td>
              <td>
                {subcategories.find(subcategory => subcategory.subcategoryId === product.subcategoryId)?.subcategoryName || 'N/A'}
              </td>
              <td>
                {product.productImages && Array.isArray(product.productImages) ? (
                  product.productImages.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000/images/products/${image.filename}`}
                      alt={`Product img ${index + 1}`}
                      style={{ width: '100px', height: 'auto', margin: '5px' }} // Adjust as needed
                    />
                  ))
                ) : (
                  <span>No images available</span>
                )}
              </td>
              <td>
                <Button variant="warning" onClick={() => handleUpdate(product)} className="me-2">
                  Update
                </Button>
                <Button variant="danger" onClick={() => handleDelete(product.productId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CreateProductForm 
        show={showCreateForm}
        onClose={handleFormClose}
        onCreate={loadData}
        subcategories={subcategories}
      /> 
      
      <UpdateProductForm
      show={showUpdateForm}
      onClose={handleFormClose}
      onCreate={loadData}
      onUpdate={handleUpdateComplete}
      initialProduct={selectedProduct}
      subcategories={subcategories}
    />

             
    </Container>
  );
};

export default Product;
