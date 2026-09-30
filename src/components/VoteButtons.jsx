import React from 'react';
import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown } from 'react-icons/fa';

function VoteButtons({
  upVotesBy = [],
  downVotesBy = [],
  authUserId = null,
  onUpVote,
  onDownVote,
}) {
  const isUpVoted = authUserId ? upVotesBy.includes(authUserId) : false;
  const isDownVoted = authUserId ? downVotesBy.includes(authUserId) : false;

  return (
    <div className="vote-buttons">
      <button
        type="button"
        className={`vote-btn ${isUpVoted ? 'active-up' : ''}`}
        onClick={onUpVote}
        title="Upvote"
        aria-label="Upvote"
      >
        {isUpVoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
        <span className="vote-count">{upVotesBy.length}</span>
      </button>

      <button
        type="button"
        className={`vote-btn ${isDownVoted ? 'active-down' : ''}`}
        onClick={onDownVote}
        title="Downvote"
        aria-label="Downvote"
      >
        {isDownVoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
        <span className="vote-count">{downVotesBy.length}</span>
      </button>
    </div>
  );
}

export default VoteButtons;
