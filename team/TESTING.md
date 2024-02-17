# Unit Testing Documentation

## Testing Framework
- **Framework Used**: Jest
- **Location of Test Files**: Test files are saved in the `jest` branch under the `test` folder.

## Tests Overview
1. **Navigator Test**
   - **Purpose**: Tests the bottom navigator functionality for users changing pages.
   - **File**: `Navigator.test.js`
   - **Description**: 
     - The test verifies the navigation behavior for both authenticated and unauthenticated users.
     - Uses `navigateToScreen` function from `NavigationUtils`.
     - Includes checks for correct navigation to 'Home', 'Profile', and 'Login' screens.
     - Validates error handling for invalid screen names.

   ```javascript
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
   
2. **HomeScreen Category Component Test**
   - **Purpose:** Ensures all defined categories are rendered correctly on the HomeScreen; validates the functionality of category selection, simulating user interaction.
   - **File:** `HomeScreen.test.js`
   - **Description:**
     - The test initially checks for the rendering of all categories, such as "All", "Furniture", "Clothing", "Stationary", and "Electronics".
     - It then simulates a user pressing one of the categories (e.g., "Furniture") and verifies the appropriate response of the component, whether it involves state updates, navigation, or other side effects.
