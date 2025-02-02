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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSending(false);
    onClose();
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title as="h3">Contact {dev.name.first} {dev.name.last}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Your first name"
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={sending}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Your last name"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={sending}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              disabled={sending}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Would you like to leave a message"
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              disabled={sending}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose} disabled={sending}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={sending || !formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()}
          >
            {sending ? <BeatLoader size={8} color="#ffffff" /> : 'Contact'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
} 