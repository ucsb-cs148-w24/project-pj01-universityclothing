import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from './HomeScreen'; // Adjust the import path as necessary
import { ItemsContext } from '../components/ItemsContext'; // Import ItemsContext

describe('HomeScreen', () => {
  const mockNavigation = { navigate: jest.fn() };

  const renderComponent = (items = []) =>
    render(
      <ItemsContext.Provider value={{ items }}>
        <HomeScreen navigation={mockNavigation} />
      </ItemsContext.Provider>
    );

  it('should render correctly', () => {
    const { getByText } = renderComponent();
    expect(getByText('Gaucho Sell')).toBeTruthy();
  });

  it('should navigate on item press', () => {
    const { getByText } = renderComponent();

    const itemTitle = getByText('Freddy'); // Change to a valid item title
    fireEvent.press(itemTitle);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('ItemDetails', expect.anything());
  });

  it('should filter items based on category', () => {
    const { getByText, queryByText } = renderComponent();

    // Assuming "Clothing" is a category and "Bonnie" is an item in that category
    expect(getByText('Bonnie')).toBeTruthy(); 

    fireEvent.press(getByText('Furniture')); // Change to a valid category

    // "Bonnie" should not be visible after filtering for "Furniture"
    expect(queryByText('Bonnie')).toBeNull();
  });

  // Add more tests as needed
});

