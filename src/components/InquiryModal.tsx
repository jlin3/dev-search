'use client'

import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import type { Developer } from '@/types';

interface InquiryModalProps {
  dev: Developer;
  onClose: () => void;
}

export default function InquiryModal({ dev, onClose }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setSending(true);
    
    // Simulate API call with 3-second delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In a real app, you would make an API call here
    console.log('Sending connection request:', {
      developerId: dev.login.uuid,
      ...formData
    });
    
    setSending(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
    onClose();
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Connect with {dev.name.first} {dev.name.last}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-4">
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Your first name"
                    disabled={sending}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Your last name"
                    disabled={sending}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="Your email address"
                disabled={sending}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your message here..."
                disabled={sending}
                required
              />
              <Form.Text className="text-muted">
                Let {dev.name.first} know why you'd like to connect and what you're looking to collaborate on.
              </Form.Text>
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={sending}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={sending || !formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()}
          >
            {sending ? (
              <span className="d-flex align-items-center gap-2">
                <BeatLoader size={8} color="#ffffff" />
                <span>Sending...</span>
              </span>
            ) : (
              'Send Message'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
} 