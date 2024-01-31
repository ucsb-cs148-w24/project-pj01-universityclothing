import React from "react";
import { StyleSheet, Text, View, Image} from "react-native";

const UserProfile = () => {
    return (
        <View style={styles.ImageContainer}>
            <Image 
                style={styles.image} 
                source={require('../assets/images/avatar.png')} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    ImageContainer: {
        height: 36,
        width: 36,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        height: 36,
        width: 36,
    },

});

export default UserProfile;
