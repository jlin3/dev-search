'use client'

import React from 'react';
import { Pagination as BSPagination } from 'react-bootstrap';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  maxVisiblePages = 5 
}: PaginationProps) {
  const getVisiblePages = () => {
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(currentPage - halfVisible, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 1;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

  return (
    <BSPagination className="justify-content-center flex-wrap">
      <BSPagination.First
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      />
      
      <BSPagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {showStartEllipsis && (
        <>
          <BSPagination.Item onClick={() => onPageChange(1)}>
            1
          </BSPagination.Item>
          <BSPagination.Ellipsis disabled />
        </>
      )}

      {visiblePages.map(page => (
        <BSPagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </BSPagination.Item>
      ))}

      {showEndEllipsis && (
        <>
          <BSPagination.Ellipsis disabled />
          <BSPagination.Item onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </BSPagination.Item>
        </>
      )}

      <BSPagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      
      <BSPagination.Last
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </BSPagination>
  );
} 