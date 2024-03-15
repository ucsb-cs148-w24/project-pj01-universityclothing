import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/theme';
import Entypo from '@expo/vector-icons/Entypo';

const BackHeader = ({ title, onBackPress }) => {
  return (
    <View style={styles.headerContainer}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.LeftContainer}>
          <Entypo name="chevron-left" size={25} color={COLORS.yellow} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: COLORS.darkBlue,
    height: 70,
  },
  headerTitle: {
    color: COLORS.yellow,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  LeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
}
});

export default BackHeader;
