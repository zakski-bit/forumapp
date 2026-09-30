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
  return (
    <article className="thread-detail-container">
      <div className="thread-detail-header">
        {category && <span className="thread-category">#{category}</span>}
        <h1 className="thread-detail-title">{title}</h1>

        <div className="thread-detail-author">
          <img src={owner?.avatar} alt={owner?.name} className="author-avatar-lg" />
          <div className="author-detail-info">
            <span className="author-name-lg">{owner?.name}</span>
            <span className="thread-posted-at">{postedAt(createdAt)}</span>
          </div>
        </div>
      </div>

      <div
        className="thread-detail-body"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      <div className="thread-detail-footer">
        <VoteButtons
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </div>
    </article>
  );
}

export default ThreadDetail;
