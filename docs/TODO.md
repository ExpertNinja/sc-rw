# TODO: API Integration for Frontend Components

## Overview
This TODO list tracks the integration of API calls into frontend components. All API calls will be commented out initially, with static data as fallback. When Spring Boot backend is ready, uncomment API blocks and remove static data.

## Components to Update

### 1. AuthContext.js
- [x] Add commented JWT token handling
- [x] Add commented API login call
- [x] Keep localStorage as fallback

### 2. Admin Dashboard (Dashboard.js)
- [x] Add commented API calls for statistics (total users, pending requests, active groups)
- [x] Add commented API calls for access requests list
- [x] Add commented API calls for granting access

### 3. Users Management (Users.js)
- [x] Add commented API calls for fetching users
- [x] Add commented API calls for user CRUD operations

### 4. Admin Path Config (AdminPathConfig.js)
- [x] Already has commented API code - verify and update if needed
- [x] Add commented API for fetching path configs
- [x] Add commented API for posting path config calls

### 5. User Dashboard (Dashboard.js)
- [x] Add commented API calls for subscribed groups
- [x] Add commented API calls for recent reports
- [x] Add commented API calls for bookmarking reports
- [x] Add commented API calls for downloading reports

### 6. Subscription Status (Subscription_Status.js)
- [x] Add commented API calls for subscription status

### 7. User Subscribe (User_Subscribe.js)
- [x] Add commented API calls for available groups
- [x] Add commented API calls for subscribing to groups

### 8. Operations Dashboard (OpsPage.js)
- [x] Add commented API calls for pending reports
- [x] Add commented API calls for syncing reports
- [x] Add commented API calls for transfer logs
- [x] Add commented API calls for notification count

### 9. Report Search (ReportSearch.js)
- [x] Add commented API calls for searching reports

### 10. Notification Component (notification.js)
- [x] Add commented API calls for pending reports

## API Endpoints to Use (Hypothetical)
- POST /api/auth/login - Login
- GET /api/users - Get all users
- GET /api/groups - Get all groups
- GET /api/reports - Get reports (with filters)
- POST /api/subscriptions - Subscribe to group
- GET /api/subscriptions/:userId - Get user subscriptions
- GET /api/access-requests - Get access requests
- POST /api/access-requests/:id/approve - Approve request
- GET /api/path-configs - Get path configs
- POST /api/path-configs/call - Call path config API
- GET /api/transfer-logs - Get transfer logs
- POST /api/reports/:id/sync - Sync report
- POST /api/bookmarks - Bookmark report
- GET /api/reports/search?q=query - Search reports

## Implementation Notes
- Use fetch() for API calls (no need for axios since fetch is built-in)
- Include Authorization header with JWT token for protected routes
- Handle errors gracefully, fallback to static data
- Keep all API calls commented until backend is ready
- Update error handling to show API errors when uncommented

## Testing Checklist
- [ ] App runs with static data (API calls commented)
- [ ] All components display data correctly
- [ ] No console errors from commented code
- [ ] Ready to uncomment when backend is deployed
