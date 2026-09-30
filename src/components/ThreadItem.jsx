import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegCommentAlt } from 'react-icons/fa';
import { postedAt } from '../utils';
import VoteButtons from './VoteButtons';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
  authUserId,
  onUpVote,
  onDownVote,
}) {
  const cleanBody = body ? body.replace(/<[^>]*>?/gm, '') : '';
  const snippet = cleanBody.length > 200 ? `${cleanBody.substring(0, 200)}...` : cleanBody;

  return (
    <article className="thread-item-card">
      <div className="thread-header">
        {category && <span className="thread-category">#{category}</span>}
        <h2 className="thread-title">
          <Link to={`/threads/${id}`}>{title}</Link>
        </h2>
      </div>

      <p className="thread-snippet">{snippet}</p>

      <div className="thread-footer">
        <div className="thread-meta-left">
          <VoteButtons
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            authUserId={authUserId}
            onUpVote={() => onUpVote(id)}
            onDownVote={() => onDownVote(id)}
          />

          <Link to={`/threads/${id}`} className="thread-comments-badge">
            <FaRegCommentAlt />
            <span>{totalComments}</span>
          </Link>

          <span className="thread-posted-at">{postedAt(createdAt)}</span>
        </div>

        <div className="thread-author">
          <span className="author-label">Dibuat oleh</span>
          {user?.avatar && (
            <img src={user.avatar} alt={user.name} className="author-avatar" />
          )}
          <span className="author-name">{user?.name || 'Anonim'}</span>
        </div>
      </div>
    </article>
  );
}

export default ThreadItem;
