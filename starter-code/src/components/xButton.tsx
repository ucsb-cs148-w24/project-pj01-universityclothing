import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from "../theme/theme";



const XButton = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="close-sharp" size={24} color={COLORS.yellow} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginRight: 30,
  }
});

export default XButton;

