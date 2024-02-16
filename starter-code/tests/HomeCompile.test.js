import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../HomeScreen'; // Adjust the import path as necessary
import { ItemsContext } from '../components/ItemsContext'; // If you use Context

test('HomeScreen renders correctly', () => {
  // Mock any necessary values
  const mockItems = [
    // ... your mock items here
  ];

  const tree = renderer.create(
    <ItemsContext.Provider value={{ items: mockItems }}>
      <HomeScreen />
    </ItemsContext.Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
