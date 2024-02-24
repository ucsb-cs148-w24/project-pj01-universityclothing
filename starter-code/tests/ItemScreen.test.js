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
