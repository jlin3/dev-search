'use client'

import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import type { Developer } from '@/types';

interface InquiryModalProps {
  dev: Developer;
  onClose: () => void;
}

export default function InquiryModal({ dev, onClose }: InquiryModalProps) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    
    // Simulate API call with 3-second delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In a real app, you would make an API call here
    console.log('Sending message to developer:', {
      developerId: dev.login.uuid,
      message
    });
    
    setSending(false);
    setMessage('');
    onClose();
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Contact {dev.name.first} {dev.name.last}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Write your message here..."
              disabled={sending}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={sending}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={sending || !message.trim()}
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