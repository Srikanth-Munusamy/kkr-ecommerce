import React, { useEffect, useState } from 'react';
import { Table, Button,  Container,Image } from 'react-bootstrap';
import CreateSubcategoryForm from './CreateSubcategoryForm';
import { deleteResource, fetchData } from '../apiOperations';
import UpdateSubcategoryForm from './UpdateSubcategoryForm';

const Subcategory = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [showCreateSubcategoryForm, setShowCreateSubcategoryForm] = useState(false);
  const [selectedsubCategory, setSelectedsubCategory] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const loadData = async () => {
    try {
      const categoriesData = await fetchData('/category');
      const subcategoriesData = await fetchData('/subcategory');
      setCategories(categoriesData);
      setSubcategories(subcategoriesData);
    } catch (error) {
      console.error('Failed to load data', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateSubcategoryFormOpen = () => {
    setShowCreateSubcategoryForm(true);
  };

  const handleFormClose = () => {
    setShowCreateSubcategoryForm(false);
    setShowUpdateForm(false);

  };
  const handleUpdateComplete = () => {
    loadData(); // Refresh data after update
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteResource(`/subcategory/${id}`);
      loadData(); // Refresh data after delete
    } catch (error) {
      console.error(`Failed to delete product with ID ${id}`, error);
    }
  };

  const handleUpdate = (subcategory) => {
    setSelectedsubCategory(subcategory);
    setShowUpdateForm(true);
  };



  return (
    <Container className="mt-4">
      <h3>Subcategories</h3>
      <Button variant="primary" onClick={handleCreateSubcategoryFormOpen}>
        Add Subcategory
      </Button>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category ID</th>
            <th>Category Name</th>
            <th>Category Image</th>
            <th>Actions</th>
    
          </tr>
        </thead>
        <tbody>
          {subcategories.map(subcategory => (
            <tr key={subcategory.subcategoryId}>
              <td>{subcategory.subcategoryId}</td>
              <td>{subcategory.subcategoryName}</td>
              <td>{subcategory.categoryId}</td>
              <td>
                {categories.find(category => category.categoryId === subcategory.categoryId)?.categoryName || 'N/A'}
              </td>
              <td>
                    {subcategory.subcategoryImage ? (
                      <Image
                        src={`http://localhost:5000/images/subcategory/${subcategory.subcategoryImage}`}
                        alt={`${subcategory.subcategoryImage}`}
                        rounded
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>
                <Button variant="warning" onClick={() => handleUpdate(subcategory)} className="me-2">
                  Update
                </Button>
                <Button variant="danger" onClick={() => handleDelete(subcategory.subcategoryId)}>
                  Delete
                </Button>
              </td>
    
            </tr>
          ))}
        </tbody>
      </Table>

      <CreateSubcategoryForm
        show={showCreateSubcategoryForm}
        onClose={handleFormClose}
        onCreate={loadData}
        categories={categories}
      />
      <UpdateSubcategoryForm
      show={showUpdateForm}
      onClose={handleFormClose}
      onCreate={loadData}
      onUpdate={handleUpdateComplete}
      categories={categories}
      initialSubcategory={selectedsubCategory}
    />

      </Container>
  );
};

export default Subcategory;
