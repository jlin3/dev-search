'use client'

import React, { useState } from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import type { Developer } from '@/types';

interface InquiryModalProps {
  dev: Developer;
  onClose: () => void;
}

export default function InquiryModal({ dev, onClose }: InquiryModalProps) {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      onClose();
    }, 3000);
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Contact {dev.name.first} {dev.name.last}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={sending}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Your Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={sending}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              disabled={sending}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Your Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              required
              disabled={sending}
            />
          </Form.Group>
          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={onClose} disabled={sending}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={sending}>
              {sending ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Sending...</> : 'Send Message'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
} 