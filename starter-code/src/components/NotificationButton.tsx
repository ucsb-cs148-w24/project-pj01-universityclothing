import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';



const NotificationButton = ({ notificationCount }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="notifications" size={24} color="black" />
        {notificationCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginRight: 30,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});

export default NotificationButton;
