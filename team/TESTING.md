# Testing Libraries
- We are using Jest for unit testing.
- The test files is saved in the jest branch under the test folder.
- Navigator.test.js is trying to test the buttom navigator for a user who want to change the page they are.
- Code: 
const { navigateToScreen } = require('../tests/NavigationUtils');

// Mock navigation function
const mockNavigate = jest.fn();

// Mock user objects for testing
const authenticatedUser = { isAuthenticated: true, navigate: mockNavigate };
const unauthenticatedUser = { isAuthenticated: false , navigate: mockNavigate};

test('navigateToScreen navigates correctly for authenticated user', () => {
  navigateToScreen(authenticatedUser, 'Home');
  expect(mockNavigate).toHaveBeenCalledWith('Home');

  navigateToScreen(authenticatedUser, 'Profile');
  expect(mockNavigate).toHaveBeenCalledWith('Profile');

  expect(() => navigateToScreen(authenticatedUser, 'InvalidScreen')).toThrow('Invalid screen name');
});

test('navigateToScreen navigates correctly for unauthenticated user', () => {
  navigateToScreen(unauthenticatedUser, 'Login');
  expect(mockNavigate).toHaveBeenCalledWith('Login');

  expect(() => navigateToScreen(unauthenticatedUser, 'Home')).toThrow('User not authenticated');
});

