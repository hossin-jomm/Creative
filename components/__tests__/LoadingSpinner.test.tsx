import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders correctly with default props', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-8 h-8'); // Default medium size
    expect(spinner).toHaveClass('border-primary'); // Default primary color
  });

  it('renders with small size', () => {
    render(<LoadingSpinner size="small" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-5 h-5');
  });

  it('renders with large size', () => {
    render(<LoadingSpinner size="large" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-12 h-12');
  });

  it('renders with secondary color', () => {
    render(<LoadingSpinner color="secondary" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('border-secondary');
  });

  it('renders with custom text', () => {
    const loadingText = 'جاري التحميل...';
    render(<LoadingSpinner text={loadingText} />);
    expect(screen.getByText(loadingText)).toBeInTheDocument();
  });

  it('renders in fullScreen mode', () => {
    render(<LoadingSpinner fullScreen />);
    // Check for the fullScreen container class
    const container = screen.getByTestId('loading-spinner').parentElement?.parentElement;
    expect(container).toHaveClass('fixed inset-0');
    expect(container).toHaveClass('z-50');
  });
});