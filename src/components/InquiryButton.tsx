'use client'

import { useState } from 'react'
import { Button } from 'react-bootstrap'
import InquiryModal from './InquiryModal'
import type { Developer } from '@/types'

interface InquiryButtonProps {
  dev: Developer;
}

export function InquiryButton({ dev }: InquiryButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button 
        variant="primary" 
        className="w-100" 
        onClick={() => setShowModal(true)}
      >
        Connect
      </Button>

      {showModal && (
        <InquiryModal 
          dev={dev} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
} 