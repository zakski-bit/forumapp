import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncToggleVoteThread } from '../states/threads/action';
import ThreadItem from '../components/ThreadItem';
import CategoryFilter from '../components/CategoryFilter';

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();

  const threads = useSelector((state) => state.threads || []);
  const users = useSelector((state) => state.users || []);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVote = (threadId) => {
    dispatch(asyncToggleVoteThread({ threadId, voteType: 1 }));
  };

  const onDownVote = (threadId) => {
    dispatch(asyncToggleVoteThread({ threadId, voteType: -1 }));
  };

  const categories = Array.from(new Set(threads.map((t) => t.category).filter(Boolean)));

  const filteredThreads = selectedCategory
    ? threads.filter((t) => t.category === selectedCategory)
    : threads;

  const threadsWithUser = filteredThreads.map((thread) => ({
    ...thread,
    user: users.find((u) => u.id === thread.ownerId),
    authUserId: authUser?.id,
  }));

  return (
    <section className="home-page-container">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="threads-section-header">
        <h1 className="threads-heading">Diskusi Terbaru</h1>
        <span className="threads-count">{filteredThreads.length} Diskusi</span>
      </div>

      <div className="threads-list">
        {threadsWithUser.length > 0 ? (
          threadsWithUser.map((thread) => (
            <ThreadItem
              key={thread.id}
              {...thread}
              onUpVote={onUpVote}
              onDownVote={onDownVote}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>Tidak ada diskusi yang ditemukan{selectedCategory ? ` untuk kategori #${selectedCategory}` : ''}.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default HomePage;
