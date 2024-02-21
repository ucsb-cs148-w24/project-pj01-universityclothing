import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../src/screen/HomeScreen';
import { ItemsContext } from '../components/ItemsContext'; // If you use Context

test('HomeScreen renders without crashing', () => {
    const { unmount } = render(<HomeScreen />);
    unmount();
  });
