import React, { useEffect, useState } from 'react';
import { Table, Container,  Image, Card } from 'react-bootstrap';
import { fetchData } from '../apiOperations';

const User = () => {
  const [users, setUsers] = useState([]);

  const loadData = async () => {
    try {
      const usersData = await fetchData('/user');
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to load data', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h3">Users</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Profile Pic</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.gender}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.profilepic ? (
                      <Image
                        src={`http://localhost:5000/images/profile/${user.profilepic}`}
                        alt={`${user.profilepic}`}
                        rounded
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default User;
