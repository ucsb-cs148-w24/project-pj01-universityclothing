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
   import UserProfile from '../components/UserProfile';
   
   describe('UserProfile Component', () => {
     it('renders correctly', () => {
       const { getByTestId } = render(<UserProfile />);
       expect(getByTestId('user-profile')).toBeTruthy();
       const userProfileImage = getByTestId('user-profile-image');
       expect(userProfileImage.props.source).toEqual(require('../assets/images/avatar.png'));
     });
   });

4. **ItemScreen Component Test**
   - **Purpose:** Ensures that the `ItemScreen` component items renders correctly and has the correct fields as expected.
   - **File:** `ItemScreen.test.js`
   - **Description:**
      - The test checks if the `ItemScreen` component renders all of the item fields correctly without crashing.
      - Validates that the fields in the `ItemScreen` component is correctly match the fields in the mock request.
   ```javascript
   import React from 'react';
   import {render} from '@testing-library/react-native';
   import ItemScreen from './src/screen/ItemScreen'; 
   
   describe('ItemScreen', () => {
     it('renders all item fields correctly', () => {
       // Mock the navigation and route props
       const route = {
         params: {
           item: {
             id: '1',
             imageUrl: 'http://example.com/image.png',
             title: 'Test Item',
             price: 99.99,
             seller: 'Test Seller',
             description: 'This is a test description of the five nights at freddys.',
           },
         },
       };
       const navigation = {navigate: jest.fn()};
   
       const {getByText} = render(<ItemScreen route={route} navigation={navigation} />);
   
       expect(getByText('Test Item')).toBeTruthy();
       expect(getByText('$99.99')).toBeTruthy();
       expect(getByText('Seller: Test Seller')).toBeTruthy();
       expect(getByText('Description: This is a test description of the five nights at freddys.')).toBeTruthy();
     });
   });
## Future Plans

### Short-Term Goals

- **Expand Existing Test Coverage**: Our immediate goal is to increase the coverage of unit and component tests with jest. This includes adding more comprehensive tests for new components and functionalities as they are developed. We believe by increasing the coverage, it will allow us to generate a more coherent project. 

### Long-Term Goals

- **Consideration of End-to-End Testing**: In the long term, we aim to implement end-to-end testing to ensure the entire application works as expected from the user's perspective.


