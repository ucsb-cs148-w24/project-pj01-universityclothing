import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import XButton from './xButton';
import { NavigationProp } from '@react-navigation/native';

{/* Header Bar Component */}

interface ExitHeaderBarProps {
    navigation?: NavigationProp<any>;
}

const ExitHeaderBar: React.FC<ExitHeaderBarProps> = ({ navigation }) => {
    return (
        <View style={styles.HeaderContainer}>
            <View style={styles.LeftContainer}>
                <XButton navigation={navigation}/>
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
        backgroundColor: COLORS.darkBlue,
        height: 100,
    },
    LeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    BackButtonContainer: {
        marginRight: 10,
    },
});

export default ExitHeaderBar;



