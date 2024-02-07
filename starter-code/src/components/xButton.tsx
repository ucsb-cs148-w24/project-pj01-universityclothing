import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import CustomIcon from './Icons';

const xButton = () => {
    return (
        <View style={styles.ImageContainer}>
            <TouchableOpacity>
                <CustomIcon name="notification" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>

    // <View style={styles.container}>
    // <TouchableOpacity>
    // <CustomIcon name="notification" size={24} color="#FFFFFF" />
    // </TouchableOpacity>
    // </View>
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

export default xButton;
