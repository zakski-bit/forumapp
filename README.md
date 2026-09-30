# Aplikasi Forum Diskusi (React + Redux)

Proyek ini dibangun untuk memenuhi kriteria submission akhir **"Menerapkan Automation Testing dan CI/CD pada Aplikasi Forum Diskusi"** pada kelas **Menjadi React Web Developer Expert** di Dicoding Academy.

---

## 🔗 Deployment & Live Demo
- **URL Aplikasi Vercel:** [https://forum-app-zaks4.vercel.app](https://forum-app-zaks4.vercel.app)
- **Repository GitHub:** [https://github.com/zakski-bit/forumapp](https://github.com/zakski-bit/forumapp)

---

## 🌟 Fitur Utama & Kriteria Penilaian

### Kriteria Utama 1: Automation Testing
1. **Pengujian Reducer (> 3 pengujian - Bintang 5):**
   - `src/states/authUser/reducer.test.js`: Pengujian `SET_AUTH_USER`, `UNSET_AUTH_USER`, dan unknown action.
   - `src/states/threads/reducer.test.js`: Pengujian `RECEIVE_THREADS`, `ADD_THREAD`, `UP_VOTE_THREAD`, `DOWN_VOTE_THREAD`, `NEUTRAL_VOTE_THREAD`.
   - `src/states/threadDetail/reducer.test.js`: Pengujian `RECEIVE_THREAD_DETAIL`, `CLEAR_THREAD_DETAIL`, `ADD_COMMENT`, `UP_VOTE_COMMENT`.
   - `src/states/isPreload/reducer.test.js`: Pengujian `SET_IS_PRELOAD` dengan true/false value.
2. **Pengujian Thunk Functions (> 3 pengujian - Bintang 5):**
   - `src/states/shared/action.test.js`: Pengujian `asyncPopulateUsersAndThreads` untuk skenario berhasil & gagal.
   - `src/states/authUser/action.test.js`: Pengujian `asyncSetAuthUser` untuk skenario login berhasil & gagal.
   - `src/states/threads/action.test.js`: Pengujian `asyncAddThread` untuk skenario pembuatan thread berhasil & gagal.
   - `src/states/threadDetail/action.test.js`: Pengujian `asyncReceiveThreadDetail` untuk skenario fetching detail thread berhasil & gagal.
3. **Pengujian React Component (> 3 pengujian - Bintang 5):**
   - `src/components/CategoryFilter.test.jsx`: Memverifikasi rendering chip kategori dan aksi klik filter.
   - `src/components/VoteButtons.test.jsx`: Memverifikasi tampilan jumlah vote, class status aktif, dan callback vote.
   - `src/components/CommentInput.test.jsx`: Memverifikasi kondisi belum login dan form input submit komentar saat login.
   - `src/components/LoadingIndicator.test.jsx`: Memverifikasi perilaku progress bar saat loading bernilai 0 vs bernilai positif.
4. **Pengujian End-to-End (Cypress):**
   - `cypress/e2e/login.cy.js`: Skenario lengkap alur login (menampilkan form login, menampilkan alert saat input salah, dan berhasil masuk ke homepage saat kredensial valid).
5. **Format Skenario:** Setiap berkas pengujian wajib dan telah dilengkapi skenario pengujian di bagian awal berkas.

### Kriteria Utama 2: Deployment & CI/CD
- **Continuous Integration (CI):** Diterapkan dengan **GitHub Actions** melalui berkas `.github/workflows/ci.yml`. Menjalankan audit linter, automation testing, dan build otomatis pada setiap commit / pull request ke branch `master`.
- **Continuous Deployment (CD):** Diterapkan dengan **Vercel** (`vercel.json`).
- **Branch Protection:** Dilampirkan bukti screenshot proteksi branch `master` dan checks CI/CD pada berkas:
  - `1_ci_check_error.png`
  - `2_ci_check_pass.png`
  - `3_branch_protection.png`

### Kriteria Utama 3: React Ecosystem (Storybook - Bintang 5)
- Memanfaatkan **Storybook** dari daftar resmi [awesome-react-ecosystem#react-tools](https://github.com/dicodingacademy/awesome-react-ecosystem#react-tools).
- Memiliki 3 stories komponen (melebihi batas minimal 2 stories):
  - `src/stories/CategoryFilter.stories.jsx`
  - `src/stories/VoteButtons.stories.jsx`
  - `src/stories/CommentInput.stories.jsx`

### Kriteria Utama 4: Mempertahankan Kriteria Sebelumnya
- **Fungsionalitas:** Autentikasi lengkap, thread list, thread detail, komentar, dan indikator loading.
- **Bugs Highlighting:** Menerapkan **Dicoding Academy JavaScript Style Guide** (`eslint-config-dicodingacademy`) dengan **0 error dan 0 warning** pada `npm run lint`.
- **Arsitektur Redux:** Seluruh REST API ditangani via **Redux Thunk** (tanpa pemanggilan API di dalam `useEffect`/komponen).
- **Fitur Bonus Sebelumnya:** Upvote/Downvote dengan *Optimistic Updates*, Leaderboard (`/leaderboards`), dan Filter Kategori client-side.

---

## 🛠️ Perintah Menjalankan Proyek

1. **Menjalankan Development Server:**
   ```bash
   npm run dev
   ```

2. **Menjalankan Seluruh Automation Test (Unit & Component):**
   ```bash
   npm test
   ```

3. **Menjalankan Pengujian End-to-End (Cypress):**
   ```bash
   npm run e2e
   ```

4. **Menjalankan Linter (ESLint):**
   ```bash
   npm run lint
   ```

5. **Menjalankan Storybook:**
   ```bash
   npm run storybook
   ```

6. **Build untuk Production:**
   ```bash
   npm run build
   ```
