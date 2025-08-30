import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

// Component that throws an error for testing
const ErrorThrowingComponent = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Normal Component</div>;
};

// Mock console.error to avoid test output pollution
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('ErrorBoundary Component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Component</div>
      </ErrorBoundary>
    );
    
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders fallback UI when an error occurs', () => {
    // We need to mock the componentDidCatch lifecycle method
    // since Jest doesn't fully support it in tests
    const errorSpy = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
    
    // Use a custom render function to catch the error
    const { rerender } = render(
      <ErrorBoundary>
        <ErrorThrowingComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    // Trigger the error
    rerender(
      <ErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check that the error message is displayed
    expect(screen.getByText('حدث خطأ ما')).toBeInTheDocument();
    expect(screen.getByText('نعتذر عن هذا الخطأ. يرجى تحديث الصفحة أو المحاولة مرة أخرى لاحقًا.')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
    
    // Check that the refresh button is present
    expect(screen.getByText('تحديث الصفحة')).toBeInTheDocument();
    
    // Verify componentDidCatch was called
    expect(errorSpy).toHaveBeenCalled();
    
    // Clean up
    errorSpy.mockRestore();
  });

  it('renders custom fallback when provided', () => {
    const customFallback = <div data-testid="custom-fallback">Custom Error UI</div>;
    
    // Use a custom render function to catch the error
    const { rerender } = render(
      <ErrorBoundary fallback={customFallback}>
        <ErrorThrowingComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    // Trigger the error
    rerender(
      <ErrorBoundary fallback={customFallback}>
        <ErrorThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check that the custom fallback is displayed
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText('Custom Error UI')).toBeInTheDocument();
  });
});