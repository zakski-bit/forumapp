import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaRegCommentAlt,
  FaBookmark,
  FaRegBookmark,
  FaShareSquare,
  FaCheck,
} from 'react-icons/fa';
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
  const [isBookmarked, setIsBookmarked] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('forum_bookmarks') || '[]');
      return saved.includes(id);
    } catch {
      return false;
    }
  });
  const [copied, setCopied] = useState(false);

  const handleToggleBookmark = (e) => {
    e.preventDefault();
    try {
      const saved = JSON.parse(localStorage.getItem('forum_bookmarks') || '[]');
      let updated;
      if (saved.includes(id)) {
        updated = saved.filter((item) => item !== id);
        setIsBookmarked(false);
      } else {
        updated = [...saved, id];
        setIsBookmarked(true);
      }
      localStorage.setItem('forum_bookmarks', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleCopyLink = (e) => {
    e.preventDefault();
    const url = `${window.location.origin}/threads/${id}`;
    if (window?.navigator?.clipboard) {
      window.navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const cleanBody = body ? body.replace(/<[^>]*>?/gm, '') : '';
  const snippet = cleanBody.length > 200 ? `${cleanBody.substring(0, 200)}...` : cleanBody;
  const username = user?.name ? user.name.toLowerCase().replace(/\s+/g, '') : 'anonim';

  return (
    <article className="thread-item-card">
      <div className="thread-avatar-column">
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} className="author-avatar" />
        ) : (
          <div className="author-avatar-fallback">
            {(user?.name || 'A')[0].toUpperCase()}
          </div>
        )}
      </div>

      <div className="thread-content-column">
        <header className="thread-header-meta">
          <span className="author-display-name">{user?.name || 'Anonim'}</span>
          <span className="author-handle">@{username}</span>
          <span className="meta-separator">·</span>
          <span className="thread-posted-at">{postedAt(createdAt)}</span>
          {category && (
            <Link to={`/?category=${category}`} className="thread-category-chip">
              #{category}
            </Link>
          )}
        </header>

        <div className="thread-body-content">
          <h2 className="thread-title">
            <Link to={`/threads/${id}`}>{title}</Link>
          </h2>
          <p className="thread-snippet">{snippet}</p>
        </div>

        <footer className="thread-footer-actions">
          <div className="actions-left-group">
            {/* Comment action */}
            <Link
              to={`/threads/${id}`}
              className="action-btn comment-action"
              title="Komentar"
            >
              <FaRegCommentAlt className="action-icon" />
              <span className="action-count">{totalComments}</span>
            </Link>

            {/* Vote Buttons (preserved with exact props & classes for tests) */}
            <VoteButtons
              upVotesBy={upVotesBy}
              downVotesBy={downVotesBy}
              authUserId={authUserId}
              onUpVote={() => onUpVote(id)}
              onDownVote={() => onDownVote(id)}
            />
          </div>

          <div className="actions-right-group">
            {/* Bookmark button */}
            <button
              type="button"
              onClick={handleToggleBookmark}
              className={`action-btn bookmark-action ${isBookmarked ? 'active-bookmarked' : ''}`}
              title={isBookmarked ? 'Hapus bookmark' : 'Simpan bookmark'}
              aria-label="Bookmark"
            >
              {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </button>

            {/* Share / Copy link button */}
            <button
              type="button"
              onClick={handleCopyLink}
              className={`action-btn share-action ${copied ? 'active-copied' : ''}`}
              title="Salin tautan"
              aria-label="Salin tautan"
            >
              {copied ? <FaCheck /> : <FaShareSquare />}
              {copied && <span className="copied-tooltip">Disalin!</span>}
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
}

export default ThreadItem;
