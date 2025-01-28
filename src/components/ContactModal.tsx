'use client'

import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import type { Developer } from '@/types'

interface ContactModalProps {
  dev: Developer;
  show: boolean;
  onClose: () => void;
}

export default function ContactModal({ dev, show, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Contact {dev.name.first} {dev.name.last}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="pt-0">
        <Form onSubmit={handleSubmit}>
          <div className="d-flex gap-3 mb-3">
            <Form.Group className="flex-grow-1">
              <Form.Control
                type="text"
                placeholder="Your first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="flex-grow-1">
              <Form.Control
                type="text"
                placeholder="Your last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Would you like to leave a message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="mb-3">
            <div 
              className="g-recaptcha" 
              data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            ></div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="light" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Contact
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
} 