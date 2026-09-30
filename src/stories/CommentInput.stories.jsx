import { MemoryRouter } from 'react-router-dom';
import CommentInput from '../components/CommentInput';

export default {
  title: 'Components/CommentInput',
  component: CommentInput,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    onAddComment: { action: 'added comment' },
  },
};

export const LoggedIn = {
  args: {
    authUser: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
    },
  },
};

export const NotLoggedIn = {
  args: {
    authUser: null,
  },
};
