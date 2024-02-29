import React from 'react';
import { render } from '@testing-library/react-native';
import UserProfile from '../components/UserProfile';

describe('UserProfile', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(<UserProfile />);

        expect(getByTestId('user-profile')).toBeTruthy();
    });
});