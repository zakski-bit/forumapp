import React from 'react';
import { postedAt } from '../utils';
import VoteButtons from './VoteButtons';

function ThreadDetail({
  title,
  body,
  category,
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
    <article className="thread-detail-container">
      <header className="thread-detail-author-header">
        <div className="thread-detail-author-left">
          {owner?.avatar ? (
            <img src={owner.avatar} alt={owner.name} className="author-avatar-lg" />
          ) : (
            <div className="author-avatar-fallback-lg">
              {(owner?.name || 'A')[0].toUpperCase()}
            </div>
          )}
          <div className="author-detail-info">
            <span className="author-name-lg">{owner?.name || 'Anonim'}</span>
            <span className="author-handle-lg">@{username}</span>
          </div>
        </div>
        {category && (
          <span className="thread-category-chip-lg">#{category}</span>
        )}
      </header>

      <h1 className="thread-detail-title">{title}</h1>

      <div
        className="thread-detail-body"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      <div className="thread-detail-meta-time">
        <span>Diposting pada {postedAt(createdAt)}</span>
      </div>

      <div className="thread-detail-divider" />

      <footer className="thread-detail-actions-bar">
        <VoteButtons
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </footer>
    </article>
  );
}

export default ThreadDetail;
