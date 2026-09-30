/**
 * Skenario pengujian:
 *
 * - CommentInput component
 *  - should render login prompt when authUser is null
 *  - should handle comment input and call onAddComment correctly when submitted
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CommentInput from './CommentInput';

describe('CommentInput component', () => {
  it('should render login prompt when authUser is null', () => {
    // arrange
    render(
      <MemoryRouter>
        <CommentInput authUser={null} onAddComment={() => {}} />
      </MemoryRouter>,
    );

    // assert
    expect(
      screen.getByText(/Silakan terlebih dahulu untuk memberi komentar./i),
    ).toBeDefined();
    expect(screen.getByRole('link', { name: /login/i })).toBeDefined();
  });

  it('should handle comment input and call onAddComment correctly when submitted', async () => {
    // arrange
    const mockOnAddComment = vi.fn();
    const fakeAuthUser = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    render(
      <MemoryRouter>
        <CommentInput authUser={fakeAuthUser} onAddComment={mockOnAddComment} />
      </MemoryRouter>,
    );

    // action
    const textarea = screen.getByPlaceholderText(/Tulis tanggapan atau komentar Anda di sini.../i);
    const submitBtn = screen.getByRole('button', { name: /Kirim Komentar/i });

    await userEvent.type(textarea, 'Ini adalah komentar pengujian');
    await userEvent.click(submitBtn);

    // assert
    expect(mockOnAddComment).toHaveBeenCalledWith('Ini adalah komentar pengujian');
    expect(textarea.value).toBe('');
  });
});
