import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  BackHandler,
} from "react-native";
import { getAuth } from "firebase/auth";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "react-native-paper";
import { COLORS } from "../theme/theme";
import BackHeader from "../components/BackHeader";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, getDoc, updateDoc, collection } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

const EditProfileScreen = ({ onClose, onProfileUpdate }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const { colors } = useTheme();
  const [imageURL, setImageURL] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [initialUsername, setInitialUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(firestore, "users", user.email);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setImageURL(userData.profileImage);
        setUsername(userData.name);
        setPhoneNumber(userData.phone);
        setLocation(userData.location);
        setInitialUsername(userData.name);
      } else {
        console.log("No such document!");
      }
    };

    fetchUserData();
  }, []);

  const handleEditIconPress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageURL(result.assets[0].uri);
      const downloadURL = await uploadImage(result.assets[0].uri);
      const usersCol = collection(firestore, "users");
      const userDocRef = doc(usersCol, user.email);
      const userDocSnap = await getDoc(userDocRef);
      // const userData = userDocSnap.data();
      const updatedMyProfile = downloadURL;
      await updateDoc(userDocRef, { profileImage: updatedMyProfile });
      onProfileUpdate();
    }
  };

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(getStorage(), `profile_images/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // Return a promise that resolves with the download URL
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle upload progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setUploadProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  }

  const handleSaveProfile = async () => {
    const userDocRef = doc(firestore, "users", user.email);

    try {
      await updateDoc(userDocRef, {
        name: username,
        phone: phoneNumber,
        location: location,
      });

      onProfileUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="Edit Profile" onBackPress={onClose} />
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
          {/* User Icon */}
          <TouchableOpacity onPress={handleEditIconPress}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{ uri: imageURL }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Entypo
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#fff",
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          {/* User Name */}
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            {initialUsername}
          </Text>
        </View>

        <View style={styles.action}>
          <Entypo name="user" color={COLORS.darkBlue} size={20} />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#666666"
            autoCorrect={false}
          
            onChangeText={setUsername}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Entypo name="phone" color={COLORS.darkBlue} size={20} />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
      
            onChangeText={setPhoneNumber}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Entypo name="location" color={COLORS.darkBlue} size={20} />
          <TextInput
            placeholder="Location"
            placeholderTextColor="#666666"
            autoCorrect={false}
            
            onChangeText={setLocation}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
      </View>

      {/* Close Button */}
      <TouchableOpacity
        style={styles.commandButton}
        onPress={handleSaveProfile}
      >
        <Text style={styles.panelButtonTitle}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.darkBlue,
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.yellow,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
});

export default EditProfileScreen;
