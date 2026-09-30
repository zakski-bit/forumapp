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
  return (
    <div className="comment-item-card">
      <div className="comment-header">
        <div className="comment-author-info">
          {owner?.avatar && (
            <img src={owner.avatar} alt={owner.name} className="comment-avatar" />
          )}
          <span className="comment-author-name">{owner?.name || 'Anonim'}</span>
        </div>
        <span className="comment-posted-at">{postedAt(createdAt)}</span>
      </div>

      <div
        className="comment-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="comment-footer">
        <VoteButtons
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={() => onUpVote(id)}
          onDownVote={() => onDownVote(id)}
        />
      </div>
    </div>
  );
}

export default CommentItem;
