import CategoryFilter from '../components/CategoryFilter';

export default {
  title: 'Components/CategoryFilter',
  component: CategoryFilter,
  tags: ['autodocs'],
  argTypes: {
    onSelectCategory: { action: 'selected' },
  },
};

export const Default = {
  args: {
    categories: ['react', 'redux', 'javascript', 'web-development'],
    selectedCategory: '',
  },
};

export const WithSelectedCategory = {
  args: {
    categories: ['react', 'redux', 'javascript', 'web-development'],
    selectedCategory: 'react',
  },
};
