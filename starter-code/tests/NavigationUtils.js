// NavigationUtils.js
function navigateToScreen(navigation, screenName) {
    if (navigation && navigation.isAuthenticated) {
      // Navigation logic for authenticated users
      if (screenName === 'Home') {
        // Navigate to home screen
        navigation.navigate('Home');
      } else if (screenName === 'Profile') {
        // Navigate to profile screen
        navigation.navigate('Profile');
      } else {
        throw new Error('Invalid screen name');
      }
    } else {
      // Navigation logic for unauthenticated users
      if (screenName === 'Login') {
        // Navigate to login screen
        navigation.navigate('Login');
      } else {
        throw new Error('User not authenticated');
      }
    }
  }

module.exports = { navigateToScreen };

