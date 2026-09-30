/**
 * Skenario pengujian:
 *
 * - CategoryFilter component
 *  - should render all category chips correctly
 *  - should call onSelectCategory callback with selected category when clicked
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryFilter from './CategoryFilter';

describe('CategoryFilter component', () => {
  it('should render all category chips correctly', () => {
    // arrange
    const categories = ['react', 'redux', 'javascript'];
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory=""
        onSelectCategory={() => {}}
      />,
    );

    // assert
    expect(screen.getByText('#semua')).toBeDefined();
    expect(screen.getByText('#react')).toBeDefined();
    expect(screen.getByText('#redux')).toBeDefined();
    expect(screen.getByText('#javascript')).toBeDefined();
  });

  it('should call onSelectCategory callback with selected category when clicked', async () => {
    // arrange
    const categories = ['react', 'redux'];
    const mockOnSelectCategory = vi.fn();
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory=""
        onSelectCategory={mockOnSelectCategory}
      />,
    );

    // action
    const reactCategoryBtn = screen.getByText('#react');
    await userEvent.click(reactCategoryBtn);

    // assert
    expect(mockOnSelectCategory).toHaveBeenCalledWith('react');
  });
});
