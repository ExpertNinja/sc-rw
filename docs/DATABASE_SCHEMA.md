# Database Schema for Standard Chartered GBS Report Tool

## Overview
This document outlines the PostgreSQL database schema for the Spring Boot backend. The schema supports role-based access control with Admin, User, and Operations roles, managing reports, subscriptions, access requests, and more.

## Tables

### 1. roles
Stores user roles.

| Column     | Type         | Constraints          | Description          |
|------------|--------------|----------------------|----------------------|
| id         | SERIAL      | PRIMARY KEY         | Unique role ID      |
| name       | VARCHAR(50) | UNIQUE, NOT NULL    | Role name (Admin, User, Operations) |
| created_at | TIMESTAMP   | DEFAULT NOW()       | Creation timestamp  |
| updated_at | TIMESTAMP   | DEFAULT NOW()       | Update timestamp    |

### 2. users
Stores user information.

| Column     | Type         | Constraints          | Description          |
|------------|--------------|----------------------|----------------------|
| id         | SERIAL      | PRIMARY KEY         | Unique user ID      |
| email      | VARCHAR(255)| UNIQUE, NOT NULL    | User email          |
| password   | VARCHAR(255)| NOT NULL            | Hashed password     |
| role_id    | INTEGER     | FOREIGN KEY (roles.id), NOT NULL | User role          |
| is_active  | BOOLEAN     | DEFAULT TRUE        | Account status      |
| created_at | TIMESTAMP   | DEFAULT NOW()       | Creation timestamp  |
| updated_at | TIMESTAMP   | DEFAULT NOW()       | Update timestamp    |

### 3. groups
Stores AD groups for subscriptions.

| Column     | Type         | Constraints          | Description          |
|------------|--------------|----------------------|----------------------|
| id         | SERIAL      | PRIMARY KEY         | Unique group ID     |
| name       | VARCHAR(255)| UNIQUE, NOT NULL    | Group name          |
| description| TEXT        |                      | Group description   |
| created_at | TIMESTAMP   | DEFAULT NOW()       | Creation timestamp  |
| updated_at | TIMESTAMP   | DEFAULT NOW()       | Update timestamp    |

### 4. reports
Stores report metadata.

| Column     | Type         | Constraints          | Description          |
|------------|--------------|----------------------|----------------------|
| id         | SERIAL      | PRIMARY KEY         | Unique report ID    |
| name       | VARCHAR(255)| NOT NULL            | Report name         |
| date       | DATE        | NOT NULL            | Report date         |
| group_id   | INTEGER     | FOREIGN KEY (groups.id) | Associated group   |
| status     | VARCHAR(50) | DEFAULT 'pending'   | Sync status (pending, synced) |
| file_path  | VARCHAR(500)|                      | File path if stored |
| created_at | TIMESTAMP   | DEFAULT NOW()       | Creation timestamp  |
| updated_at | TIMESTAMP   | DEFAULT NOW()       | Update timestamp    |

### 5. subscriptions
Stores user subscriptions to groups.

| Column     | Type         | Constraints          | Description          |
|------------|--------------|----------------------|----------------------|
| id         | SERIAL      | PRIMARY KEY         | Unique subscription ID |
| user_id    | INTEGER     | FOREIGN KEY (users.id), NOT NULL | Subscribed user    |
| group_id   | INTEGER     | FOREIGN KEY (groups.id), NOT NULL | Subscribed group   |
| created_at | TIMESTAMP   | DEFAULT NOW()       | Creation timestamp  |

### 6. access_requests
Stores access requests from users to admins.

| Column     | Type         | Constraints          | Description          |
|------------|--------------|----------------------|----------------------|
| id         | SERIAL      | PRIMARY KEY         | Unique request ID   |
| user_id    | INTEGER     | FOREIGN KEY (users.id), NOT NULL | Requesting user    |
| group_id   | INTEGER     | FOREIGN KEY (groups.id), NOT NULL | Requested group    |
| status     | VARCHAR(50) | DEFAULT 'pending'   | Request status (pending, approved, denied) |
| requested_at| TIMESTAMP  | DEFAULT NOW()       | Request timestamp   |
| approved_at| TIMESTAMP  |                      | Approval timestamp  |
| approved_by| INTEGER    | FOREIGN KEY (users.id) | Approving admin    |

### 7. path_configs
Stores path configurations for reports.

| Column     | Type         | Constraints          | Description          |
|------------|--------------|----------------------|----------------------|
| id         | SERIAL      | PRIMARY KEY         | Unique config ID    |
| ad_group   | VARCHAR(255)| NOT NULL            | AD group name       |
| description| TEXT        |                      | Config description  |
| path       | VARCHAR(500)| NOT NULL            | File path           |
| reports    | TEXT        |                      | Associated reports  |
| created_at | TIMESTAMP   | DEFAULT NOW()       | Creation timestamp  |
| updated_at | TIMESTAMP   | DEFAULT NOW()       | Update timestamp    |

### 8. transfer_logs
Stores sync/transfer logs for operations.

| Column     | Type         | Constraints          | Description          |
|------------|--------------|----------------------|----------------------|
| id         | SERIAL      | PRIMARY KEY         | Unique log ID       |
| report_id  | INTEGER     | FOREIGN KEY (reports.id), NOT NULL | Synced report      |
| user_id    | INTEGER     | FOREIGN KEY (users.id), NOT NULL | User who synced    |
| status     | VARCHAR(50) | NOT NULL            | Transfer status     |
| folder     | VARCHAR(500)|                      | Destination folder  |
| transferred_at| TIMESTAMP | DEFAULT NOW()       | Transfer timestamp  |

### 9. bookmarks (Optional)
Stores user bookmarks for reports.

| Column     | Type         | Constraints          | Description          |
|------------|--------------|----------------------|----------------------|
| id         | SERIAL      | PRIMARY KEY         | Unique bookmark ID  |
| user_id    | INTEGER     | FOREIGN KEY (users.id), NOT NULL | Bookmarking user   |
| report_id  | INTEGER     | FOREIGN KEY (reports.id), NOT NULL | Bookmarked report  |
| created_at | TIMESTAMP   | DEFAULT NOW()       | Creation timestamp  |

## Relationships
- users → roles (Many-to-One)
- reports → groups (Many-to-One)
- subscriptions → users, groups (Many-to-Many junction)
- access_requests → users (requesting), groups, users (approving)
- transfer_logs → reports, users
- bookmarks → users, reports (Many-to-Many junction)

## API Endpoints (Hypothetical for Frontend Integration)
- POST /api/auth/login
- GET /api/users
- GET /api/groups
- GET /api/reports
- POST /api/subscriptions
- GET /api/access-requests
- POST /api/path-configs
- GET /api/transfer-logs
- POST /api/bookmarks

## Sample Data Migration
- Roles: Insert Admin, User, Operations
- Users: Migrate from static credentials
- Groups: From reports.json groups
- Reports: From reports.json and ops_reports.json
- Path Configs: From AdminPathConfig static data

## Notes
- Use JPA/Hibernate in Spring Boot for ORM.
- Implement JWT for authentication.
- Add proper indexes on foreign keys and frequently queried columns.
- Use transactions for complex operations (e.g., approving access requests).
