# Employee Management System

A modern React application for managing employee data with advanced filtering, search, and navigation capabilities.

## ech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack React Query
- **Routing**: React Router DOM
- **Styling**: SCSS/Sass
- **Testing**: Vitest, Testing Library
- **Package Manager**: pnpm

## Project Structure

```
src/
├── components/          # React components
│   ├── EmployeeList.tsx
│   ├── EmployeeFilters.tsx
│   ├── EmployeeDetails.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useGetEmployees.tsx
│   └── useEmployeeFiltersWithReactQuery.ts
├── redux/              # Redux store and slices
│   ├── store.ts
│   └── slices/
├── types/              # TypeScript type definitions
├── styles/             # SCSS stylesheets
├── test/               # Test setup files
└── utils/              # Utility functions
```

### Prerequisites

- Node.js (v16 or higher)
- pnpm package manager

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   pnpm dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Run Tests

```bash
# Run tests once
pnpm test:run

# Run tests in watch mode (re-runs on file changes)
pnpm test

```

### Test Coverage

- Component rendering and interactions
- State management (Redux)
- Data fetching (React Query)
- Navigation (React Router)
- Error handling
- Loading states


### Architecture Decisions

- **React Query** for server state (API data)
- **Redux Toolkit** for client state (filters)
- **Custom Hooks** for reusable logic
- **Component Composition** for maintainability
- **SCSS Modules** for scoped styling
