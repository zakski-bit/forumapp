# Dicoding Forum App — React, Redux Toolkit & Automated Testing

Modern discussion forum web application built with **React 18** and **Redux Toolkit**. Features centralized predictable state management, comprehensive multi-tier test automation (Jest & Cypress), component isolation via **Storybook**, and continuous integration via **GitHub Actions**.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-RTK-764ABC?style=flat&logo=redux)](https://redux-toolkit.js.org/)
[![Jest](https://img.shields.io/badge/Jest-Unit%20%26%20Integration-C21325?style=flat&logo=jest)](https://jestjs.io/)
[![Cypress](https://img.shields.io/badge/Cypress-End--to--End-17202C?style=flat&logo=cypress)](https://www.cypress.io/)
[![Storybook](https://img.shields.io/badge/Storybook-UI%20Catalog-FF4785?style=flat&logo=storybook)](https://storybook.js.org/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-black?style=flat&logo=vercel)](https://forumapp-ofvr-seven.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Live Deployment

- **Production URL**: [https://forumapp-ofvr-seven.vercel.app](https://forumapp-ofvr-seven.vercel.app)

## State Management Architecture

State is managed through a centralized store powered by **Redux Toolkit**, enforcing immutable state mutations and clean separation of concerns:

```
src/
├── states/
│   ├── authUser/              # User session & authentication state
│   ├── isPreload/             # Initial application hydration status
│   ├── leaderboards/          # User leaderboard score rankings
│   ├── shared/                # Cross-cutting async orchestrators (initial data population)
│   ├── threadDetail/          # Focused thread inspection & nested comments
│   ├── threads/               # Thread catalog & category filtering
│   └── users/                 # Registered user profiles
├── components/                # Reusable presentation components
├── pages/                     # Routed page views
└── stories/                   # Storybook visual component documentation
```

### Optimistic UI & Async Thunks
- All network interactions are isolated within Redux Thunk action creators.
- Upvote/Downvote actions leverage optimistic updates for immediate user feedback with automated rollback on network failure.

## Comprehensive Test Automation

### 1. Unit & Integration Testing (Jest)
- **Reducer Suites**: Validates pure state transitions across all actions (`SET_AUTH_USER`, `RECEIVE_THREADS`, `ADD_THREAD`, `UP_VOTE_THREAD`, `RECEIVE_THREAD_DETAIL`).
- **Thunk Middleware Suites**: Mocked HTTP assertions validating dispatch sequences and error handlers under successful and failed API scenarios.
- **Component Tests (React Testing Library)**: Verifies user event handling, conditional rendering, category filtering, and accessibility attributes.

### 2. End-to-End (E2E) Automation (Cypress)
- Complete browser automation test suites simulating realistic end-user flows:
  - Form validation on empty or malformed inputs.
  - Server alert messaging on invalid credentials.
  - Successful token generation and protected route navigation upon authentication.

### 3. Component Isolation (Storybook)
- Isolated component catalog validating states, themes, and interactive props independently of the core application runtime:
  - `CategoryFilter.stories.jsx`
  - `VoteButtons.stories.jsx`
  - `CommentInput.stories.jsx`

## CI/CD Pipeline

- **Continuous Integration (GitHub Actions)**: Automated workflow on every push and pull request executing code style audits (ESLint with zero errors), unit test suites, integration tests, and production build checks.
- **Continuous Deployment (Vercel)**: Automatic edge deployment of verified builds.

## Quickstart

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/zakski-bit/forumapp.git
   cd forumapp
   npm install
   ```

2. Start the development server:
   ```bash
   npm run start
   ```

3. Execute automated test suites:
   ```bash
   # Run Jest unit & integration tests
   npm run test

   # Run Cypress End-to-End test suite
   npm run e2e
   ```

4. Launch Storybook catalog:
   ```bash
   npm run storybook
   ```

## License

MIT License. See [LICENSE](LICENSE) for details.
