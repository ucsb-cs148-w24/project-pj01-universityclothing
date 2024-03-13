import React from "react";
import { StyleSheet, Text, View, Image} from "react-native";
import { COLORS } from "../theme/theme";

const UserProfile = () => {
    return (
        <View style={styles.ImageContainer}>
            <Image 
                style={styles.image}
                source={{
                  uri: "https://wow.zamimg.com/uploads/screenshots/normal/1084904.jpg",
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    ImageContainer: {
        height: 36,
        width: 36,
        borderRadius: 18, 
        borderWidth: 2,
        borderColor: COLORS.yellow,
        alignItems: 'center',
        justifyContent: 'center', 
        overflow: 'hidden', 
    },
    image: {
        height: 36,
        width: 36,
    },
});

export default UserProfile;