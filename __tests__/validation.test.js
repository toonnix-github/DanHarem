const { validateRegistration } = require('../public/validation');

describe('validateRegistration', () => {
  test('returns error for empty username', () => {
    expect(validateRegistration('', 'test@example.com', 'password123')).toBe('Username is required.');
  });

  test('returns error for invalid username characters', () => {
    expect(validateRegistration('bad name', 'test@example.com', 'password123')).toBe('Username can only contain letters, numbers, and underscores.');
  });

  test('returns error for invalid email', () => {
    expect(validateRegistration('user', 'invalid', 'password123')).toBe('Enter a valid email address.');
  });

  test('returns error for short password', () => {
    expect(validateRegistration('user', 'test@example.com', 'pass')).toBe('Password must be at least 8 characters.');
  });

  test('returns error when email is missing', () => {
    expect(validateRegistration('user', '', 'password123')).toBe('Email is required.');
  });

  test('returns error when password is missing', () => {
    expect(validateRegistration('user', 'test@example.com', '')).toBe('Password is required.');
  });

  test('returns empty string for valid input', () => {
    expect(validateRegistration('user', 'test@example.com', 'password123')).toBe('');
  });
});
