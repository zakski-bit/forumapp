/**
 * Skenario pengujian:
 *
 * - ApiTestModal component
 *  - should not render modal when isOpen is false
 *  - should render modal header and test runner buttons when isOpen is true
 *  - should call onClose when close button is clicked
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApiTestModal from './ApiTestModal';

describe('ApiTestModal component', () => {
  it('should not render modal when isOpen is false', () => {
    // arrange
    const { container } = render(
      <ApiTestModal isOpen={false} onClose={() => {}} />,
    );

    // assert
    expect(container.firstChild).toBeNull();
  });

  it('should render modal header and test runner buttons when isOpen is true', () => {
    // arrange
    render(<ApiTestModal isOpen onClose={() => {}} />);

    // assert
    expect(
      screen.getByText('Konsol Diagnostik & Pengujian Endpoint'),
    ).toBeDefined();
    expect(
      screen.getByRole('button', { name: /Jalankan Semua Tes/i }),
    ).toBeDefined();
    expect(screen.getByText('GET /threads')).toBeDefined();
    expect(screen.getByText('GET /users')).toBeDefined();
    expect(screen.getByText('GET /leaderboards')).toBeDefined();
  });

  it('should call onClose when close button is clicked', async () => {
    // arrange
    const mockOnClose = vi.fn();
    render(<ApiTestModal isOpen onClose={mockOnClose} />);

    // action
    const closeBtn = screen.getByTitle('Tutup konsol');
    await userEvent.click(closeBtn);

    // assert
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
