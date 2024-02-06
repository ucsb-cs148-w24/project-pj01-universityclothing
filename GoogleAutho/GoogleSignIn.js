// GoogleSignIn.js
import firebaseApp from './firebaseConfig';
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";


const signInWithGoogle = async () => {
  const response_type = "token";
const client_id = "402529839560-3vjg7ceb0u1utq3t07kc1fh65oig5c5t.apps.googleusercontent.com";
const redirect_uri = "https://sites.cs.ucsb.edu/~lukeyoffe/";
const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];
const result = await WebBrowser.openAuthSessionAsync(
  `https://accounts.google.com/o/oauth2/v2/auth?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join("%20")}`
);
const access_token = Linking.parse(result.url).queryParams.access_token;
};

export default signInWithGoogle;



