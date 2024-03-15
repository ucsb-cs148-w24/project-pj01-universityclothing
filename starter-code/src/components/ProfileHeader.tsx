import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import Entypo from '@expo/vector-icons/Entypo';

{/* Header Bar Component */}

interface ProfileHeaderProps {
    title?: string;
    onEditPress?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({title,onEditPress}) => {
    return (
        <View style={styles.HeaderContainer}>
     
            <Text style={styles.HeaderText}>
                {title}
            </Text>
            <View style={styles.RightContainer}>
            <TouchableOpacity onPress={onEditPress}>
                    <Entypo name="edit" size={25} color={COLORS.yellow} />
                </TouchableOpacity>
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

export default ProfileHeader;


