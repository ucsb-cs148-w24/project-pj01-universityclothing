import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, LogBox } from "react-native";
import { Avatar } from "react-native-paper";
import { firebaseApp, firestore } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { COLORS } from "../theme/theme";

const HeaderBar = ({ title }) => {
  console.warn = () => {};
  LogBox.ignoreLogs(["source.uri should not be an empty string"]);

  const auth = getAuth(firebaseApp);
  const [user] = useAuthState(auth);

  const [profileImageURL, setProfileImageURL] = useState(
    user ? user.photoURL : ""
  );

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
    <View style={styles.HeaderContainer}>
      <Text style={styles.HeaderText}>{title}</Text>
      <View style={styles.RightContainer}>
        <View style={styles.ImageContainer}>
          <Avatar.Image
            style={styles.avatarStyle}
            source={{ uri: profileImageURL }}
            size={36}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.darkBlue,
    height: 70,
    paddingHorizontal: 10,
  },
  HeaderText: {
    color: COLORS.yellow,
    fontSize: 20,
    fontWeight: "bold",
  },
  RightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ImageContainer: {
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: COLORS.yellow,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarStyle: {
    borderColor: COLORS.darkBlue,
    borderRadius: 40,
  },
});

export default HeaderBar;
