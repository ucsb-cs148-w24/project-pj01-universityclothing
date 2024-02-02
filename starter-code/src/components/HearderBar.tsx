import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import UserProfile from './UserProfile';
import NotificationButton from './NotificationButton';

{/* Header Bar Component */}

interface HeaderBarProps {
    title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
    return (
        <View style={styles.HeaderContainer}>
            <Text style={styles.HeaderText}>
                {title}
            </Text>
            <View style={styles.RightContainer}>
                <NotificationButton notificationCount={3} />
                <UserProfile />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    HeaderContainer: {
        padding: 30,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: '#0F2167',
        height: 100,
    },
    HeaderText: {
        color: '#FFECD6',
        fontSize: 20,
    },
    RightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default HeaderBar;



