import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackHeader from "../components/BackHeader";
import { COLORS } from "../theme/theme";

const ContactUsScreen = () => {
  const navigation = useNavigation();

  const handleEmailPress = (email) => {
    Linking.openURL(
      `mailto:${email}?subject=Query from App&body=Hi, I need help with...`
    );
  };

  return (
    <View style={styles.container}>
      <BackHeader title="Contact Us" onBackPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.text}>
          If you have any questions or need support, please feel free to contact
          any of us.
        </Text>

        <View style={styles.contactInfo}>
          <Text style={styles.name}>Anika Misra:</Text>
          <TouchableOpacity onPress={() => handleEmailPress("amisra@ucsb.edu")}>
            <Text style={styles.email}>amisra@ucsb.edu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.name}>Jonathan Chen:</Text>
          <TouchableOpacity
            onPress={() => handleEmailPress("ping-yujonathan@ucsb.edu")}
          >
            <Text style={styles.email}>ping-yujonathan@ucsb.edu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.name}>Justin Chung:</Text>
          <TouchableOpacity
            onPress={() => handleEmailPress("justinchung@ucsb.edu")}
          >
            <Text style={styles.email}>justinchung@ucsb.edu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.name}>Kevin Chen:</Text>
          <TouchableOpacity
            onPress={() => handleEmailPress("kchen62@ucsb.edu")}
          >
            <Text style={styles.email}>kchen62@ucsb.edu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.name}>Ridhit Garg:</Text>
          <TouchableOpacity
            onPress={() => handleEmailPress("ridhitgarg@ucsb.edu")}
          >
            <Text style={styles.email}>ridhitgarg@ucsb.edu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.name}>Xinyao Song:</Text>
          <TouchableOpacity
            onPress={() => handleEmailPress("xinyaosong@ucsb.edu")}
          >
            <Text style={styles.email}>xinyaosong@ucsb.edu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.name}>Zhen Bi:</Text>
          <TouchableOpacity onPress={() => handleEmailPress("zhenbi@ucsb.edu")}>
            <Text style={styles.email}>zhenbi@ucsb.edu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.darkBlue,
  },
  contactInfo: {
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.darkBlue,
  },
  email: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default ContactUsScreen;
