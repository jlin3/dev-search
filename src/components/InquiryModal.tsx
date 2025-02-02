'use client'

import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import type { Developer } from '@/types';

interface InquiryModalProps {
  dev: Developer;
  onClose: () => void;
}

export default function InquiryModal({ dev, onClose }: InquiryModalProps) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
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
          <Alert variant="success" className="mb-0">
            <Alert.Heading className="h6">Message Sent Successfully!</Alert.Heading>
            <p className="mb-0">Your message has been sent to {dev.name.first}. They will get back to you soon.</p>
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Tell ${dev.name.first} about your project...`}
                disabled={sending}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit" disabled={sending || !message.trim()}>
                {sending ? <BeatLoader size={8} color="#ffffff" /> : 'Send Message'}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
      {success && (
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
} 