import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DomainManager = () => {
    const [domains, setDomains] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [currentDomain, setCurrentDomain] = useState({ id: '', domain: '', isactive: false });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDomains();
    }, []);

    const fetchDomains = async () => {
        try {
            const response = await axios.get('https://karthikeshrobotics.in/admin/domain_view.php');
            // Convert isactive from string to boolean
            const domainsWithBoolean = response.data.map(domain => ({
                ...domain,
                isactive: domain.isactive === "1"
            }));
            setDomains(domainsWithBoolean);
        } catch (err) {
            console.error('Error fetching domains:', err);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setCurrentDomain({ id: '', domain: '', isactive: false });
        setMessage('');
        setError('');
    };

    const handleCreateUpdate = async (e) => {
        e.preventDefault();
        const url = modalMode === 'create'
            ? 'https://karthikeshrobotics.in/admin/domain.php'
            : `https://karthikeshrobotics.in/admin/domain.php?id=${currentDomain.id}`;
        const method = modalMode === 'create' ? 'POST' : 'PUT';
        try {
            await axios({
                method,
                url,
                data: {
                    ...currentDomain,
                    isactive: currentDomain.isactive ? "1" : "0" // Convert boolean to string for the API
                },
            });
            setMessage(`Domain ${modalMode === 'create' ? 'created' : 'updated'} successfully.`);
            fetchDomains();
            handleModalClose();
        } catch (err) {
            setError(`Error ${modalMode === 'create' ? 'creating' : 'updating'} domain.`);
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this domain?');
        if (confirmed) {
            try {
                await axios.delete('https://karthikeshrobotics.in/admin/domain.php', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: { id }
                });
                setMessage('Domain deleted successfully.');
                fetchDomains();
            } catch (err) {
                setError('Error deleting domain.');
                console.error(err);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Domain Manager</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Button 
                variant="primary" 
                onClick={() => { setModalMode('create'); setShowModal(true); }}
            >
                Add Domain
            </Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Domain</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {domains.map(domain => (
                        <tr key={domain.id}>
                            <td>{domain.id}</td>
                            <td>{domain.domain}</td>
                            <td>{domain.isactive ? 'Yes' : 'No'}</td>
                            <td>
                                <Button 
                                    variant="warning" 
                                    onClick={() => { setModalMode('update'); setCurrentDomain(domain); setShowModal(true); }} 
                                    style={{ marginRight: '10px' }} // Space to the right
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="danger" 
                                    onClick={() => handleDelete(domain.id)}
                                    style={{ marginRight: '10px' }} // Space to the right
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalMode === 'create' ? 'Create Domain' : 'Update Domain'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateUpdate}>
                        <Form.Group controlId="formDomain">
                            <Form.Label>Domain</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentDomain.domain}
                                onChange={(e) => setCurrentDomain({ ...currentDomain, domain: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formIsActive">
                            <Form.Check
                                type="checkbox"
                                label="Active"
                                checked={currentDomain.isactive}
                                onChange={(e) => setCurrentDomain({ ...currentDomain, isactive: e.target.checked })}
                            />
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit"
                            style={{ marginRight: '10px' }} // Space to the right
                        >
                            {modalMode === 'create' ? 'Create Domain' : 'Update Domain'}
                        </Button>
                        <Button 
                            variant="secondary" 
                            onClick={handleModalClose}
                        >
                            Close
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DomainManager;
