'use client'

import React from 'react'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key="first"
          onClick={() => onPageChange(1)}
          className="btn btn-link text-decoration-none"
        >
          «
        </button>
      );
    }

    // Previous page
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => onPageChange(currentPage - 1)}
          className="btn btn-link text-decoration-none"
        >
          ‹
        </button>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`btn ${currentPage === i ? 'btn-primary' : 'btn-link text-decoration-none'}`}
        >
          {i}
        </button>
      );
    }

    // Next page
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => onPageChange(currentPage + 1)}
          className="btn btn-link text-decoration-none"
        >
          ›
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      pages.push(
        <button
          key="last"
          onClick={() => onPageChange(totalPages)}
          className="btn btn-link text-decoration-none"
        >
          »
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="d-flex justify-content-center gap-1">
      {renderPageNumbers()}
    </div>
  );
} 