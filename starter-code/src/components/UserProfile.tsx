import React from "react";
import { StyleSheet, Text, View, Image} from "react-native";
import { COLORS } from "../theme/theme";
import { getAuth } from "firebase/auth";


const UserProfile = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    return (
        <View style={styles.ImageContainer}>
            <Image 
                style={styles.image}
                source={{
                    uri: user?.photoURL || "https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png",
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