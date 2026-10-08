import React from 'react';
import { postedAt } from '../utils';
import VoteButtons from './VoteButtons';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUserId,
  onUpVote,
  onDownVote,
}) {
  const username = owner?.name ? owner.name.toLowerCase().replace(/\s+/g, '') : 'anonim';

  return (
    <div className="comment-item-card">
      <div className="comment-avatar-col">
        {owner?.avatar ? (
          <img src={owner.avatar} alt={owner.name} className="comment-avatar" />
        ) : (
          <div className="comment-avatar-fallback">
            {(owner?.name || 'A')[0].toUpperCase()}
          </div>
        )}
      </div>

      <div className="comment-content-col">
        <header className="comment-header-meta">
          <span className="comment-author-name">{owner?.name || 'Anonim'}</span>
          <span className="comment-author-handle">@{username}</span>
          <span className="meta-separator">·</span>
          <span className="comment-posted-at">{postedAt(createdAt)}</span>
        </header>

        <div
          className="comment-text-body"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <footer className="comment-footer-actions">
          <VoteButtons
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            authUserId={authUserId}
            onUpVote={() => onUpVote(id)}
            onDownVote={() => onDownVote(id)}
          />
        </footer>
      </div>
    </div>
  );
}

export default CommentItem;
