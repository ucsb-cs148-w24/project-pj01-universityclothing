import React from 'react';
import { View, Button } from 'react-native';
import signInWithGoogle from './GoogleSignIn';

const GoogleSignInButton = () => {
  return (
    <View>
      <Button title="Sign In with Google" onPress={signInWithGoogle} />
    </View>
  );
};

export default GoogleSignInButton;