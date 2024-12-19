import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Table, Button, Form, Row, Col } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const Workshop = () => {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchOrganization, setSearchOrganization] = useState('');

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get('https://karthikeshrobotics.in/admin/workshop.php');
        setParticipants(response.data);
        setFilteredParticipants(response.data);
      } catch (error) {
        console.error('Error fetching participant data', error);
      }
    };

    fetchParticipants();
  }, []);

  const downloadAllDataAsExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredParticipants);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Participants');
    XLSX.writeFile(wb, 'Workshop_Participants.xlsx');
  };

  const handleFilterChange = useCallback(() => {
    let filtered = participants;
    if (startDate) {
      filtered = filtered.filter(participant => new Date(participant.reg_time) >= new Date(startDate));
    }
    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      filtered = filtered.filter(participant => new Date(participant.reg_time) <= endOfDay);
    }
    if (searchOrganization) {
      filtered = filtered.filter(participant => participant.organization.toLowerCase().includes(searchOrganization.toLowerCase()));
    }
    setFilteredParticipants(filtered);
  }, [participants, startDate, endDate, searchOrganization]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  return (
    <Container fluid className="mt-4">
      <h2>Workshop Participants</h2>
      <Row className="mb-3">
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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Designation</th>
            <th>Organization</th>
            <th>Source</th>
            <th>Registration Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredParticipants.length > 0 ? (
            filteredParticipants.map((participant) => (
              <tr key={participant.id}>
                <td>{participant.id}</td>
                <td>{participant.firstname}</td>
                <td>{participant.lastname}</td>
                <td>{participant.gender}</td>
                <td>{participant.email}</td>
                <td>{participant.mobilenumber}</td>
                <td>{participant.designation}</td>
                <td>{participant.organization}</td>
                <td>{participant.source}</td>
                <td>{participant.reg_time}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">No participants found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Workshop;
