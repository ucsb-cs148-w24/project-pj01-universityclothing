import React from "react";
import { StatusBar, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { COLORS } from "../theme/theme";
import ProfileHeader from "../components/ProfileHeader";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from '@react-navigation/native'; 


const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <ProfileHeader title= "Profile"/>
      {/* User Icon, Name, ID */}
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            style={styles.avatarStyle}
            source={{
              uri: "https://wow.zamimg.com/uploads/screenshots/normal/1084904.jpg",
            }}
            size={80}
          />
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
              User Name
            </Title>
            <Caption style={styles.caption}>@u_name</Caption>
            
          </View>
  

        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Entypo name="location" color={COLORS.darkBlue} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            IV, Santa Barbara
          </Text>
        </View>
        <View style={styles.row}>
          <Entypo name="phone" color={COLORS.darkBlue} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>000-000-0000</Text>
        </View>
        <View style={styles.row}>
          <Entypo name="email" color={COLORS.darkBlue} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            user@email.com
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            { borderRightColor: "#dddddd", borderRightWidth: 1 },
          ]}
        >
          <Title>2</Title>
          <Caption>My Posts</Caption>
        </View>
        <View
          style={[
            styles.infoBox,
            { borderRightColor: "#dddddd", borderRightWidth: 1 },
          ]}
        >
          <Title>12</Title>
          <Caption>Items Sold</Caption>
        </View>
        <View style={[styles.infoBox]}>
          <Title>5</Title>
          <Caption>Items Brought</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Entypo name="heart-outlined" color={COLORS.yellow} size={25} />
            <Text style={styles.menuItemText}>Favorites</Text>
          </View>
        </TouchableRipple>
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
});

export default ProfileScreen;