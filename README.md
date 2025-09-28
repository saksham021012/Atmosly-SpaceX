# 🚀 Atmosly · SpaceX Mission Explorer

A modern, responsive web application built with React that allows users to explore SpaceX launches, filter missions, and manage their favorite launches. This project demonstrates component-driven architecture, state management with Redux, and integration with external APIs.

![Atmosly · SpaceX Mission Explorer](https://img.shields.io/badge/React-19.1.1-blue) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.9.0-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.13-teal)

## ✨ Features

### 🎯 Core Functionality
- **Browse Launches**: Display comprehensive list of SpaceX launches with mission details
- **Advanced Search**: Real-time search with 500ms debouncing for optimal performance
- **Multi-Filter System**:
  - Search Mission By Name
  - Filter by launch year (dynamically generated from data)
  - Toggle successful launches only
  - Show favorites only
- **Detailed Mission View**: Modal with complete mission information including:
  - Mission patch imagery
  - Detailed descriptions
  - Rocket specifications
  - External links (Wikipedia, Webcast)
- **Favorites Management**: Persistent local storage for favorite missions
- **Pagination**: Efficient rendering with 9 launches per page

### 🎨 User Experience
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Loading States**: Skeleton loaders for better perceived performance
- **Error Handling**: Graceful error states with retry functionality
- **Empty States**: Contextual messages when no results are found
- **Accessibility**: Keyboard navigation, ARIA labels, and semantic HTML

### ⚡ Performance Optimizations
- **Debounced Search**: Prevents excessive API calls
- **Memoized Components**: React.memo and useCallback optimizations
- **Efficient State Management**: Redux Toolkit with normalized state structure
- **Code Splitting**: Component-based architecture for better bundle management

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.1.1**: Latest version with modern hooks and concurrent features
- **Vite 7.1.7**: Fast build tool and development server

### State Management
- **Redux Toolkit 2.9.0**: Modern Redux with simplified boilerplate
- **React-Redux 9.2.0**: Official React bindings for Redux

### Styling & UI
- **TailwindCSS 4.1.13**: Utility-first CSS framework
- **Custom Components**: Reusable UI components (Badge, Modal, LoadingSkeleton)

### API & Data Fetching
- **Axios 1.12.2**: Promise-based HTTP client
- **SpaceX API v4**: Official SpaceX REST API

### Development Tools
- **ESLint**: Code linting with modern JavaScript standards
- **Vite React Plugin**: Hot module replacement and fast refresh

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 16.0 or higher
- **npm**: Version 7.0 or higher (or yarn equivalent)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saksham021012/Atmosly-SpaceX.git
   cd Atmosly-SpaceX
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build optimized production bundle
npm run preview      # Preview production build locally

```

## 🏗️ Project Structure

```
src/
├── api/                    # API integration layer
│   └── spacex.js          # SpaceX API client functions
├── components/            # Reusable UI components
│   ├── Badge.jsx         # Status badges (Success/Failure)
│   ├── FilterSection.jsx # Search and filter controls
│   ├── Header.jsx        # Application header with title
│   ├── LaunchCard.jsx    # Individual launch display card
│   ├── LaunchGrid.jsx    # Grid layout for launch cards
│   ├── LoadingSkeleton.jsx # Loading state placeholders
│   └── Modal.jsx         # Modal dialog for launch details
├── hooks/                # Custom React hooks
│   └── useDebounce.js    # Debouncing utility hook
├── slices/               # Redux Toolkit slices
│   ├── favouritesSlice.js # Favorites state management
│   ├── filterSlice.js    # Filter state management
│   └── launchSlice.js    # Launch data state management
├── reducer/              # Redux store configuration
│   └── index.js          # Root reducer combining all slices
├── App.jsx               # Main application component
├── main.jsx              # Application entry point
└── index.css             # Global styles and Tailwind imports
```

## 🎯 Key Design Decisions

### Architecture Choices

1. **Component Separation**: Each UI element is a separate, reusable component
2. **Redux Toolkit**: Chosen over Context API for complex state management
3. **Custom Hooks**: useDebounce for performance optimization

### State Management Strategy

```javascript
// State Structure
{
  launches: {
    launches: [],           // All fetched launches
    filteredLaunches: [],   // Filtered results
    selectedLaunch: null,   // Currently viewed launch
    loading: false,         // API loading state
    error: null            // Error messages
  },
  favourite: [],           // Array of favorited launch IDs
  filters: {
    search: '',            // Search query
    year: 'all',          // Selected year filter
    successOnly: false,    // Success-only toggle
    favouriteOnly: false   // Favorites-only toggle
  }
}
```

### Performance Considerations

- **Debounced Search**: 500ms delay prevents excessive API calls
- **Memoization**: useCallback and useMemo for expensive operations
- **Pagination**: Limits DOM nodes for better performance

## 🔧 API Integration

### SpaceX API v4
- **Base URL**: `https://api.spacexdata.com/v4`
- **Endpoints Used**:
  - `GET /launches` - Fetch all launches
  - `GET /launches/{id}` - Fetch specific launch details
  - `GET /launches/rockets/{id}` Fetch Rocket Name

### Error Handling
- Network errors are caught and displayed to users
- Retry mechanisms for failed requests
- Graceful degradation when API is unavailable

## 💾 Data Persistence

### Local Storage
- **Favorites**: Automatically saved and restored on app load
- **Storage Key**: `favourites`
- **Data Format**: JSON array of launch IDs

## 🧪 TODOs

### Testing Suite
- [ ] **Unit Tests**: Component testing with React Testing Library
- [ ] **Integration Tests**: User flow testing for key features
- [ ] **API Mocking**: Jest mocks for SpaceX API endpoints
- [ ] **Coverage Reports**: Aim for >80% test coverage
- [ ] **Jest Configuration**: Complete Jest setup for Vite/React project







## 🚀 Deployment

### Build Process
```bash
# Create production build
npm run build

# Files generated in dist/ directory
# Ready for deployment to any static hosting service
```

### Deployment Platforms
- **Vercel**: Recommended for React application

### Environment Variables
No environment variables required - uses public SpaceX API


