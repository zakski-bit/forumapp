import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleVoteThreadDetail,
  asyncToggleVoteComment,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentItem from '../components/CommentItem';
import WidgetsSidebar from '../components/WidgetsSidebar';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const threads = useSelector((state) => state.threads || []);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpVoteThread = () => {
    dispatch(asyncToggleVoteThreadDetail(1));
  };

  const onDownVoteThread = () => {
    dispatch(asyncToggleVoteThreadDetail(-1));
  };

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncToggleVoteComment({ threadId: id, commentId, voteType: 1 }));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncToggleVoteComment({ threadId: id, commentId, voteType: -1 }));
  };

  const categoriesWithCount = React.useMemo(() => {
    const counts = {};
    threads.forEach((t) => {
      if (t.category) {
        counts[t.category] = (counts[t.category] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, [threads]);

  if (!threadDetail) {
    return (
      <div className="home-layout-grid">
        <section className="home-feed-column">
          <div className="detail-header-bar">
            <Link to="/" className="detail-back-btn" title="Kembali">
              <FaArrowLeft />
            </Link>
            <h1 className="detail-header-title">Utas Diskusi</h1>
          </div>
          <div className="loading-state-card">
            <p>Memuat detail diskusi...</p>
          </div>
        </section>
        <WidgetsSidebar categoriesWithCount={categoriesWithCount} />
      </div>
    );
  }

  return (
    <div className="home-layout-grid">
      <section className="home-feed-column">
        {/* Sticky Header with Back Button */}
        <div className="detail-header-bar">
          <Link to="/" className="detail-back-btn" title="Kembali ke Beranda">
            <FaArrowLeft />
          </Link>
          <div className="detail-header-meta">
            <h1 className="detail-header-title">Utas Diskusi</h1>
            <span className="detail-header-sub">
              {threadDetail.comments?.length || 0} Balasan
            </span>
          </div>
        </div>

        {/* Full Thread Post */}
        <ThreadDetail
          {...threadDetail}
          authUserId={authUser?.id}
          onUpVote={onUpVoteThread}
          onDownVote={onDownVoteThread}
        />

        {/* Comment Input Composer */}
        <CommentInput authUser={authUser} onAddComment={onAddComment} />

        {/* Comments Section */}
        <div className="thread-comments-section">
          <div className="comments-section-header">
            <h3>Balasan Komunitas ({threadDetail.comments?.length || 0})</h3>
          </div>

          <div className="comments-list">
            {threadDetail.comments && threadDetail.comments.length > 0 ? (
              threadDetail.comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  {...comment}
                  authUserId={authUser?.id}
                  onUpVote={onUpVoteComment}
                  onDownVote={onDownVoteComment}
                />
              ))
            ) : (
              <div className="empty-comments-card">
                <p>Belum ada balasan untuk diskusi ini. Jadilah yang pertama membalas!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Right Column */}
      <WidgetsSidebar categoriesWithCount={categoriesWithCount} />
    </div>
  );
}

export default DetailPage;
