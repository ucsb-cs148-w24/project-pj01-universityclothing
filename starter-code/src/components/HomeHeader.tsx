import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import UserProfile from './UserProfile';
import NotificationButton from './NotificationButton';

{/* Header Bar Component */}

interface HeaderBarProps {
    title?: string;
}

const HomeHeader: React.FC<HeaderBarProps> = ({title}) => {
    return (
        <View style={styles.HeaderContainer}>
     
            <Text style={styles.HeaderText}>
                {title}
            </Text>
            <View style={styles.RightContainer}>
                <UserProfile/>
            </View>
           
        </View>
    );
}

const styles = StyleSheet.create({
    HeaderContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: COLORS.darkBlue,
        height: 70,
    },
    HeaderText: {
        color: COLORS.yellow,
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
    },
    RightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    }
});

export default HomeHeader;



