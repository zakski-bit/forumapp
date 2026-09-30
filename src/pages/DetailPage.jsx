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

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

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

  if (!threadDetail) {
    return (
      <div className="loading-state">
        <p>Memuat detail diskusi...</p>
      </div>
    );
  }

  return (
    <section className="detail-page-container">
      <div className="back-navigation">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Kembali ke Beranda
        </Link>
      </div>

      <ThreadDetail
        {...threadDetail}
        authUserId={authUser?.id}
        onUpVote={onUpVoteThread}
        onDownVote={onDownVoteThread}
      />

      <section className="comments-section">
        <h2 className="comments-heading">
          Komentar ({threadDetail.comments.length})
        </h2>

        <CommentInput authUser={authUser} onAddComment={onAddComment} />

        <div className="comments-list">
          {threadDetail.comments.length > 0 ? (
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
            <p className="empty-comments">Belum ada komentar untuk diskusi ini.</p>
          )}
        </div>
      </section>
    </section>
  );
}

export default DetailPage;
