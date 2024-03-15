import React, { useState, useEffect } from "react";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Switch,
} from "react-native-paper";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    getDoc,
    doc,
    addDoc,
    collection,
    onSnapshot,
    query,
    where,
    updateDoc,
} from "firebase/firestore";
import { firebaseApp, firestore, db, storage } from "../../firebaseConfig";
import { COLORS } from "../theme/theme";
import ProfileHeader from "../components/ProfileHeader";
import EditProfileScreen from "./EditProfileScreen";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth(firebaseApp);
  const [num_myListings, setNum_myListings] = useState(0);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [profileImageURL, setProfileImageURL] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [user, loading, error] = useAuthState(auth);
  let user_email = user.email;

  const handleEditPress = () => {
    setEditModalVisible(true);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && user.email) {
        const docRef = doc(firestore, "users", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setProfileImageURL(userData.profileImage);
          setName(userData.name || user.displayName);
          setEmail(user.email); // Assuming the email won't change
          setPhone(userData.phone);
          setLocation(userData.location);
          const myListings = docSnap.data().myListings;
          setNum_myListings(myListings.length);
        } else {
          console.log("No profile found in Firestore");
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const onProfileUpdate = async () => {
    if (user && user.email) {
      const docRef = doc(firestore, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setProfileImageURL(userData.profileImage);
        setName(userData.name || user.displayName);
        setEmail(user.email); // Assuming the email won't change
        setPhone(userData.phone);
        setLocation(userData.location);
      } else {
        console.log("No profile found in Firestore");e
      }
    }
  };

  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <ProfileHeader title="Profile" onEditPress={handleEditPress} />

      {/* User Icon, Name, ID */}
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
        <View style={styles.avatarContainer}>
      <Avatar.Image
        source={{ uri: profileImageURL }}
        size={80} // Adjust if needed
      />
    </View>

          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {name || user?.displayName}
            </Title>
            <Caption style={styles.caption}>{user?.email}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>

        <View style={styles.row}>
          <Entypo name="phone" color={COLORS.darkBlue} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {" "}
            {phone || "______________"}{" "}
          </Text>
        </View>
        <View style={styles.row}>
          <Entypo name="location" color={COLORS.darkBlue} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {location || " ______________"}
          </Text>
        </View>
      </View>

            <View style={styles.infoBoxWrapper}>
                <TouchableOpacity
                    style={[
                        styles.infoBox,
                        { borderRightColor: "#dddddd", borderRightWidth: 1 },
                    ]}
                    onPress={() => navigation.navigate("MyListings")}
                >
                    <Title>{num_myListings}</Title>
                    <Caption>My Listings</Caption>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.infoBox,
                        { borderRightColor: "#dddddd", borderRightWidth: 1 },
                    ]}
                >
                    <Title>12</Title>
                    <Caption>Items Sold</Caption>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.infoBox]}>
                    <Title>5</Title>
                    <Caption>Items Brought</Caption>
                </TouchableOpacity>
            </View>

      <View style={styles.menuWrapper}>
      <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
          <View style={styles.menuItem}>
            <Entypo name="heart-outlined" color={COLORS.yellow} size={25} />
            <Text style={styles.menuItemText}>Favorites</Text>
          </View>
        </TouchableOpacity>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Entypo name="back-in-time" color={COLORS.yellow} size={25} />
            <Text style={styles.menuItemText}>Browse History</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Entypo name="wallet" color={COLORS.yellow} size={25} />
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Entypo name="cog" color={COLORS.yellow} size={25} />
            <Text style={styles.menuItemText}>Setting</Text>
          </View>
        </TouchableRipple>
      </View>
      <Modal
        animationType="slide"
        visible={isEditModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <EditProfileScreen
          onClose={() => setEditModalVisible(false)}
          onProfileUpdate={onProfileUpdate}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    color: "#f5f5f5",
    // marginTop: 20
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "33.3%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 5,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  avatarStyle: {
    borderColor: COLORS.darkBlue,
    borderRadius: 40,
  },
  avatarContainer: {
    // height: 84, 
    // width: 84, 
    // borderRadius: 42, 
    // borderWidth: 2, 
    // borderColor: COLORS.darkBlue, 
    // justifyContent: 'center',
    // alignItems: 'center',
    // overflow: 'hidden', 
  },
});

export default ProfileScreen;

