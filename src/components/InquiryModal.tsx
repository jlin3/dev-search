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
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setSending(true);
    // Simulate API call with 3-second delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    setSending(false);
    setSuccess(true);
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Contact {dev.name.first} {dev.name.last}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success ? (
          <div className="text-center py-4">
            <div className="h4 text-success mb-3">Message Sent Successfully!</div>
            <p className="text-muted mb-4">Your message has been sent to {dev.name.first}. They will get back to you soon.</p>
            <Button variant="primary" onClick={onClose}>Close</Button>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Your first name"
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={sending}
                  required
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Your last name"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={sending}
                  required
                />
              </Col>
            </Row>
            <Form.Control
              type="email"
              placeholder="Email address"
              className="mb-3"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              disabled={sending}
              required
            />
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Would you like to leave a message"
              className="mb-3"
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              disabled={sending}
              required
            />
            <div className="mb-3">
              <div className="border rounded p-3 bg-light">
                <div className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    id="recaptcha-check"
                    label="I'm not a robot"
                    disabled={sending}
                  />
                  <img src="/images/recaptcha-icon.png" alt="reCAPTCHA verification" className="ms-auto" style={{ width: '32px', height: '32px' }} />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-secondary" onClick={onClose} disabled={sending}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={sending || !formData.firstName || !formData.lastName || !formData.email || !formData.message}
              >
                {sending ? (
                  <span className="d-flex align-items-center gap-2">
                    <BeatLoader size={8} color="#ffffff" />
                    <span>Sending...</span>
                  </span>
                ) : 'Send Message'}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
} 