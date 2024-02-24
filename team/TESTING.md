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
   - **File:** `HomeCategory.test.js`
   - **Description:**
     - The test initially checks for the rendering of all categories, such as "All", "Furniture", "Clothing", "Stationary", and "Electronics".
     - It then simulates a user pressing one of the categories and verifies the appropriate response of the component, whether it involves state updates, navigation, or other side effects.

   ```javascript
      describe('HomeScreen Category Component', () => {
       it('renders all categories and allows category selection', () => {
       const { getByText } = render(<HomeScreen />);
   
       // Check if all categories are rendered
       const categories = ["All", "Furniture", "Clothing", "Stationary", "Electronics"];
       categories.forEach(category => {
         expect(getByText(category)).toBeTruthy();
       });
   
       // Simulate selecting a category
       const categoryToSelect = 'Furniture';
       fireEvent.press(getByText(categoryToSelect));
   
       ...
     });
   });

3. **UserProfile Component Test**
   - **Purpose:** Ensures that the `UserProfile` component renders correctly and the image is loaded as expected.
   - **File:** `UserProfile.test.js`
   - **Description:**
      - The test checks if the `UserProfile` component renders the correct user profile image without crashing.
      - Validates that the image in the `UserProfile` component is correctly loaded from google auth.
   ```javascript
   import React from 'react';
   import { render } from '@testing-library/react-native';
   import UserProfile from '../components/UserProfile'; // Adjust the path as necessary
   
   describe('UserProfile Component', () => {
     it('renders correctly', () => {
       const { getByTestId } = render(<UserProfile />);
       expect(getByTestId('user-profile')).toBeTruthy();
       const userProfileImage = getByTestId('user-profile-image');
       expect(userProfileImage.props.source).toEqual(require('../assets/images/avatar.png'));
     });
   });
