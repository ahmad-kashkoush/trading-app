# Admin API Documentation

This document describes the admin functionality for the trading app backend.

## Overview

The admin system provides secure endpoints for user management operations. Only users with the `admin` role can access these endpoints.

## Setup

### 1. Create First Admin User

Before using admin endpoints, you need to create the first admin user. Run the utility script:

```bash
node utils/createAdmin.js
```

This will create an admin user with the following default credentials:

- Email: admin@example.com
- Password: admin123
- Role: admin

**Important**: Change these credentials in production!

### 2. Environment Variables

Ensure you have the following environment variables set:

- `JWT_SECRET`: Secret key for JWT tokens
- `MONGODB_URI`: MongoDB connection string

## Admin Endpoints

All admin endpoints require authentication with a valid JWT token and admin role.

### Base URL

```
/api/admin
```

### Authentication

Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Available Endpoints

### 1. Create User

**POST** `/api/admin/users`

Creates a new user account.

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "user"
}
```

**Response:**

```json
{
  "message": "User created successfully",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "role": "user",
    "isVerified": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Get All Users

**GET** `/api/admin/users`

Retrieves a list of all users in the system.

**Response:**

```json
{
  "message": "Users retrieved successfully",
  "count": 5,
  "users": [
    {
      "_id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "role": "user",
      "isVerified": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 3. Update User

**PUT** `/api/admin/users/:userId`

Updates an existing user's information.

**Request Body:**

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phone": "+0987654321",
  "role": "user",
  "isVerified": true
}
```

**Response:**

```json
{
  "message": "User updated successfully",
  "user": {
    "_id": "user_id",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "phone": "+0987654321",
    "role": "user",
    "isVerified": true,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Delete User

**DELETE** `/api/admin/users/:userId`

Deletes a user account.

**Response:**

```json
{
  "message": "User deleted successfully",
  "deletedUser": {
    "_id": "user_id",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

## Security Features

### Admin Route Middleware

- Verifies JWT token validity
- Checks if the authenticated user has admin role
- Prevents unauthorized access to admin endpoints

### Safety Measures

- Admins cannot delete their own accounts
- Admins cannot delete other admin accounts
- Admins cannot demote themselves to user role
- Admin-created users are automatically verified

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400`: Bad Request (invalid input)
- `401`: Unauthorized (missing or invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found (user not found)
- `409`: Conflict (user already exists)
- `500`: Internal Server Error

## Usage Examples

### Using cURL

```bash
# Create a new user
curl -X POST http://localhost:4000/api/admin/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }'

# Get all users
curl -X GET http://localhost:4000/api/admin/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Update a user
curl -X PUT http://localhost:4000/api/admin/users/USER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane"
  }'

# Delete a user
curl -X DELETE http://localhost:4000/api/admin/users/USER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using JavaScript/Fetch

```javascript
const adminToken = "YOUR_JWT_TOKEN";

// Create user
const createUser = async (userData) => {
  const response = await fetch("/api/admin/users", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${adminToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Get all users
const getAllUsers = async () => {
  const response = await fetch("/api/admin/users", {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
  return response.json();
};
```

## Notes

- Admin users are automatically verified when created
- Passwords are stored as-is (consider implementing hashing in production)
- The system prevents circular deletion of admin accounts
- All timestamps are automatically managed by MongoDB
