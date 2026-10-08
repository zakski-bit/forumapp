import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaBookmark, FaComments, FaRegSadTear, FaFire } from 'react-icons/fa';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncToggleVoteThread } from '../states/threads/action';
import ThreadItem from '../components/ThreadItem';
import CategoryFilter from '../components/CategoryFilter';
import QuickCompose from '../components/QuickCompose';
import WidgetsSidebar from '../components/WidgetsSidebar';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState('');

  const dispatch = useDispatch();

  const threads = useSelector((state) => state.threads || []);
  const users = useSelector((state) => state.users || []);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categoryParam = searchParams.get('category') || '';
  const viewParam = searchParams.get('view') || '';
  const activeTab = viewParam === 'bookmarks' ? 'bookmarks' : 'all';
  const selectedCategory = activeTab === 'bookmarks' ? '' : categoryParam;

  const onUpVote = (threadId) => {
    dispatch(asyncToggleVoteThread({ threadId, voteType: 1 }));
  };

  const onDownVote = (threadId) => {
    dispatch(asyncToggleVoteThread({ threadId, voteType: -1 }));
  };

  const categories = useMemo(() => {
    return Array.from(new Set(threads.map((t) => t.category).filter(Boolean)));
  }, [threads]);

  const categoriesWithCount = useMemo(() => {
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

  const handleSelectCategory = (cat) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  const handleTabChange = (tab) => {
    if (tab === 'bookmarks') {
      setSearchParams({ view: 'bookmarks' });
    } else {
      setSearchParams({});
    }
  };

  const bookmarkedIds = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('forum_bookmarks') || '[]');
    } catch {
      return [];
    }
  }, []);

  const filteredThreads = useMemo(() => {
    return threads.filter((t) => {
      if (activeTab === 'bookmarks' && !bookmarkedIds.includes(t.id)) {
        return false;
      }

      if (selectedCategory && t.category !== selectedCategory) {
        return false;
      }

      if (searchKeyword.trim()) {
        const query = searchKeyword.toLowerCase();
        const titleMatch = t.title?.toLowerCase().includes(query);
        const bodyMatch = t.body?.toLowerCase().includes(query);
        const categoryMatch = t.category?.toLowerCase().includes(query);
        if (!titleMatch && !bodyMatch && !categoryMatch) {
          return false;
        }
      }

      return true;
    });
  }, [threads, activeTab, bookmarkedIds, selectedCategory, searchKeyword]);

  const threadsWithUser = useMemo(() => {
    return filteredThreads.map((thread) => ({
      ...thread,
      user: users.find((u) => u.id === thread.ownerId),
      authUserId: authUser?.id,
    }));
  }, [filteredThreads, users, authUser?.id]);

  const getEmptyMessage = () => {
    if (activeTab === 'bookmarks') {
      return 'Anda belum menandai diskusi apa pun sebagai bookmark. Klik ikon bookmark pada diskusi untuk menyimpannya di sini.';
    }
    if (selectedCategory) {
      return `Tidak ada diskusi dengan kategori #${selectedCategory}. Coba pilih kategori lain atau mulai diskusi baru!`;
    }
    if (searchKeyword) {
      return `Tidak ditemukan hasil untuk "${searchKeyword}". Coba kata kunci yang lain.`;
    }
    return 'Belum ada diskusi di forum. Jadilah yang pertama memulai diskusi!';
  };

  return (
    <div className="home-layout-grid">
      <section className="home-feed-column">
        <div className="timeline-header-bar">
          <div className="timeline-header-top">
            <h1 className="timeline-heading">
              {activeTab === 'bookmarks' ? 'Diskusi Tersimpan' : 'Beranda'}
            </h1>
            <span className="timeline-status-badge">
              <FaComments /> {threadsWithUser.length} Diskusi
            </span>
          </div>

          <div className="timeline-nav-tabs">
            <button
              type="button"
              className={`timeline-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => handleTabChange('all')}
            >
              <FaFire className="tab-icon" /> Untuk Anda
            </button>
            <button
              type="button"
              className={`timeline-tab-btn ${activeTab === 'bookmarks' ? 'active' : ''}`}
              onClick={() => handleTabChange('bookmarks')}
            >
              <FaBookmark className="tab-icon" /> Tersimpan
              {bookmarkedIds.length > 0 && (
                <span className="tab-counter-badge">{bookmarkedIds.length}</span>
              )}
            </button>
          </div>
        </div>

        <QuickCompose />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        <div className="threads-feed-list">
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
            <div className="empty-state-card">
              <FaRegSadTear className="empty-state-icon" />
              <h3>Belum ada diskusi yang cocok</h3>
              <p>{getEmptyMessage()}</p>
              {(selectedCategory || searchKeyword || activeTab === 'bookmarks') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchKeyword('');
                    setSearchParams({});
                  }}
                  className="btn-reset-filter"
                >
                  Reset Semua Filter
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <WidgetsSidebar
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        categoriesWithCount={categoriesWithCount}
      />
    </div>
  );
}

export default HomePage;
