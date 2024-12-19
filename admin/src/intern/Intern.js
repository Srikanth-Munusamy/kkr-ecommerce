import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Table, Button, Form, Row, Col } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const Intern = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [domainFilter, setDomainFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchOrganization, setSearchOrganization] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://www.karthikeshrobotics.in/admin/users.php');
        const usersWithResumeLink = response.data.map(user => ({
          ...user,
          resume_link: `https://www.karthikeshrobotics.in/admin/resume.php?view_resume=${user.id}`
        }));
        setUsers(usersWithResumeLink);
        setFilteredUsers(usersWithResumeLink);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUsers();
  }, []);

  const viewResume = (id) => {
    window.open(`https://www.karthikeshrobotics.in/admin/resume.php?view_resume=${id}`, '_blank');
  };

  const downloadAllDataAsExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredUsers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Interns');
    XLSX.writeFile(wb, 'Intern_Applications.xlsx');
  };

  const handleFilterChange = useCallback(() => {
    let filtered = users;
    if (domainFilter) {
      filtered = filtered.filter(user => user.domain === domainFilter);
    }
    if (startDate) {
      filtered = filtered.filter(user => new Date(user.reg_date) >= new Date(startDate));
    }
    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      filtered = filtered.filter(user => new Date(user.reg_date) <= endOfDay);
    }   
    if (searchOrganization) {
      filtered = filtered.filter(user => user.organisation.toLowerCase().includes(searchOrganization.toLowerCase()));
    }
    setFilteredUsers(filtered);
  }, [users, domainFilter, startDate, endDate, searchOrganization]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  return (
    <Container fluid className="mt-4">
      <h2>Internship Applications</h2>
      <Row className="mb-3">
        <Col md={2}>
          <Form.Select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
          >
            <option value="">Filter by Domain</option>
            <option value="Web development">Web development</option>
            <option value="CAD development">CAD development</option>
            <option value="ROS development">ROS development</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Control
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Search by Organization"
            value={searchOrganization}
            onChange={(e) => setSearchOrganization(e.target.value)}
          />
        </Col>
        <Col md={3} className="d-flex justify-content-end">
          <Button variant="success" onClick={downloadAllDataAsExcel}>Download All</Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Mobile Number</th>
            <th>Domain</th>
            <th>Designation</th>
            <th>Organisation</th>
            <th>LinkedIn Profile</th>            
            <th>GitHub Profile</th>
            <th>Registered Date</th>
            <th>View Resume</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.dob}</td>
                <td>{user.gender}</td>
                <td>{user.mobile_number}</td>
                <td>{user.domain}</td>
                <td>{user.designation}</td>
                <td>{user.organisation}</td>
                <td>{user.linkedin_profile}</td>
                <td>{user.github_profile}</td>
                <td>{user.reg_date}</td>
                <td>
                  <Button variant="info" onClick={() => viewResume(user.id)}>View Resume</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Intern;
