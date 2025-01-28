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
  const [errors, setErrors] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrors('Please enter a message');
      return;
    }
    setIsSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSending(false);
    onClose();
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact {dev.name.first} {dev.name.last}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              required
            />
          </Form.Group>
          
          {errors && (
            <div className="alert alert-danger mb-3">
              {errors}
            </div>
          )}
          
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onClose} disabled={isSending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSending}>
              {isSending ? (
                <BeatLoader size={8} color="#ffffff" />
              ) : (
                'Send Message'
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
} 