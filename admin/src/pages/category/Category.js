import React, { useEffect, useState } from 'react';
import { Table, Button, Container ,Image} from 'react-bootstrap';
import CreateCategoryForm from './CreateCategoryForm';
import { deleteResource, fetchData } from '../apiOperations';
import UpdateCategoryForm from './UpdateCategoryForm';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [showCreateCategoryForm, setShowCreateCategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const loadData = async () => {
    try {
      const categoriesData = await fetchData('/category');
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load data', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateComplete = () => {
    loadData(); // Refresh data after update
  };

  const handleCreateCategoryFormOpen = () => {
    setShowCreateCategoryForm(true);
  };

  const handleFormClose = () => {
    setShowCreateCategoryForm(false);
    setShowUpdateForm(false);
 
  };
  
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteResource(`/category/${id}`);
      loadData(); // Refresh data after delete
    } catch (error) {
      console.error(`Failed to delete product with ID ${id}`, error);
    }
  };

  const handleUpdate = (category) => {
    setSelectedCategory(category);
    setShowUpdateForm(true);
  };


  return (
    <Container className="mt-4">
      <h3>Categories</h3>
      <Button variant="primary" onClick={handleCreateCategoryFormOpen}>
        Add Category
      </Button>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Actions</th>
    
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.categoryId}>
              <td>{category.categoryId}</td>
              <td>{category.categoryName}</td>
              <td>
                    {category.categoryImage ? (
                      <Image
                        src={`http://localhost:5000/images/category/${category.categoryImage}`}
                        alt={`${category.categoryImage}`}
                        rounded
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>
                <Button variant="warning" onClick={() => handleUpdate(category)} className="me-2">
                  Update
                </Button>
                <Button variant="danger" onClick={() => handleDelete(category.categoryId)}>
                  Delete
                </Button>
              </td>
     
                </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for CreateCategoryForm */}
      <CreateCategoryForm
        show={showCreateCategoryForm}
        onClose={handleFormClose}
        onCreate={loadData}
      />
            <UpdateCategoryForm
      show={showUpdateForm}
      onClose={handleFormClose}
      onCreate={loadData}
      onUpdate={handleUpdateComplete}
      category={selectedCategory}
    />

    </Container>
  );
};

export default Category;
