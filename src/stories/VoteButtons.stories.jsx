import VoteButtons from '../components/VoteButtons';

export default {
  title: 'Components/VoteButtons',
  component: VoteButtons,
  tags: ['autodocs'],
  argTypes: {
    onUpVote: { action: 'upvoted' },
    onDownVote: { action: 'downvoted' },
  },
};

export const Neutral = {
  args: {
    upVotesBy: ['user-1', 'user-2'],
    downVotesBy: ['user-3'],
    authUserId: 'user-current',
  },
};

export const UpVoted = {
  args: {
    upVotesBy: ['user-current', 'user-1'],
    downVotesBy: [],
    authUserId: 'user-current',
  },
};

export const DownVoted = {
  args: {
    upVotesBy: ['user-1'],
    downVotesBy: ['user-current'],
    authUserId: 'user-current',
  },
};
