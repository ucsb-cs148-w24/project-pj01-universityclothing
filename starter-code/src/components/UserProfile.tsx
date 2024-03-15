import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image} from "react-native";
import { COLORS } from "../theme/theme";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { Avatar } from "react-native-paper";

const UserProfile = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [profileImageURL, setProfileImageURL] = useState(user?.photoURL); 


    useEffect(() => {
        const fetchUserProfileImage = async () => {
          if (user && user.email) {
            const userDocRef = doc(firestore, "users", user.email);
            const userDocSnap = await getDoc(userDocRef);
    
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              setProfileImageURL(userData.profileImage);
            }
          }
        };
    
        fetchUserProfileImage();
      }, [user]);
    
    return (
        <View style={styles.ImageContainer}>
            <Avatar.Image 
                style={styles.avatarStyle}
                source={{ uri: profileImageURL }}
                size={36}
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
    avatarStyle: {
        borderColor: COLORS.darkBlue,
        borderRadius: 40,
      },
});

export default UserProfile;