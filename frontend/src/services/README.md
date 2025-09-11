# Services

Ultra-simple API & Auth client for Trading App using Axios. Everything in one file.

## Structure

```
services/
├── apiAuth.ts  # All API functions using axios
└── index.ts    # Just exports apiAuth.ts
```

## Usage

One import, all functions:

```javascript
import { apiAuth } from '@/services';

// Auth functions
await apiAuth.signup({ username: 'john', email: 'john@example.com', password: 'pass123' });
await apiAuth.login({ email: 'john@example.com', password: 'pass123' });
await apiAuth.verifyEmail('123456', token);
await apiAuth.resendVerificationCode(token);

// Generic HTTP methods (for future features)
await apiAuth.get('/api/users');
await apiAuth.post('/api/data', payload, token);
await apiAuth.put('/api/users/1', data, token);
await apiAuth.delete('/api/users/1', token);
```

## Features

✅ **Axios**: Uses axios instead of fetch  
✅ **One File**: Everything in `apiAuth.ts`  
✅ **One Import**: Just `import { apiAuth }`  
✅ **Auto Tokens**: Saves to cookies automatically  
✅ **TypeScript**: Full type safety  
✅ **Better Errors**: Axios error handling with response data  

## Environment

- `NEXT_PUBLIC_API_BASE_URL` - Backend URL (default: localhost:3001)

## Error Handling

Axios provides better error handling. The actions catch both axios response errors and general errors:

```javascript
try {
  await apiAuth.login(data);
} catch (error) {
  // Handles both error.response.data.message and error.message
  console.log(error.message);
}
```

That's it! One file, one import, axios power!
