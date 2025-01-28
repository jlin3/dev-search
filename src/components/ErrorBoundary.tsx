'use client'

import React from 'react'
import { APIError } from '@/services/api'

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.state.error instanceof APIError) {
        return (
          <div className="alert alert-danger m-4" role="alert">
            <h4 className="alert-heading">API Error</h4>
            <p>{this.state.error.message}</p>
            <button 
              className="btn btn-outline-danger"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )
      }

      return this.props.fallback || (
        <div className="alert alert-danger m-4" role="alert">
          <h4 className="alert-heading">Something went wrong</h4>
          <p>Please try refreshing the page or contact support if the problem persists.</p>
        </div>
      )
    }

    return this.props.children
  }
} 