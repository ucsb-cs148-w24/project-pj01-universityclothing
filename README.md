# UniversityClothing
UniversityClothing is a mobile application that allows university students to buy and sell used items freely.
It aims to solve problem of common scams on other online marketplaces by verifying user's university related identity before letting them join.

## Group members
Jonathan Chen @pingyujc <br/>
Kevin Chen @Kevinchen0527 <br/>
Ridhit Garg @tihdiR <br/>
Xinyao Song @xinyao-song <br/>
Anika Misra @amisra0 <br/>
Zhen Bi @zhenbi93 <br/>
Justin Chung @justinchung712 <br/>

## Tech Stack
Frontend: React Native <br/>
Backend: Firebase <br/>


## User Roles and Permissions

#### Buyers: <br/>
- Buyers are able to log in using school credentials, and can browse through the marketplace to see the listings. <br/>
- Buyers are able to search in the marketplace for the item they are looking for, and send messages to the seller if needed. <br/>
- Buyers are able to save items they are interested in, so they do not need to search for the items again.  <br/>
- Buyers are able to change their profile information and easily log out. <br/>

#### Sellers: <br/>
- Sellers are able to log in using school credentials, and can upload a post about the items they are selling. <br/>
- Sellers are able to contact with potential customers in the chat room. <br/>
- Sellers are able to check what they are posted in myListings screen, and edit the item information, or they could delete the item from the marketplace. <br/>
- Sellers are able to change their profile information and easily log out. <br/>

## Deployment

Our project is developed using Expo and can be easily tested using the Expo Go app. Below are the instructions to run our application on your device using Expo Go.

#### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (download from [Node.js](https://nodejs.org/))
- npm (comes installed with Node.js)
- Git (download from [Git](https://git-scm.com/downloads))
- Expo CLI (`npm install -g expo-cli`)
- Ensure that you have the Expo Go app installed on your mobile device. Since our database is made for iOS, you should download Expo Go for iOS
  - [Expo Go for iOS](https://apps.apple.com/app/expo-go/id982107779)

#### Steps to Run the Application
1. Download the project from Github.
2. Change directory to the starter-code `cd starter-code`.
3. Run `npm install`.
4. Run `npx expo start`.
5. Open the Expo Go app on your mobile device.
6. Scan the QR code provided below with your device. The QR code will open the project directly in Expo Go.
7. Alternatively, you can manually enter the provided link in the Expo Go app to start the application.

#### Dependencies
    "@expo/config": "^8.1.1",
    "@expo/metro-config": "^0.10.0",
    "@firebase/firestore": "^4.4.2",
    "@react-native-firebase/app": "^18.8.0",
    "@react-native-firebase/auth": "^18.8.0",
    "@react-native-firebase/crashlytics": "^18.8.0",
    "@react-native-picker/picker": "^2.6.1",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/native-stack": "^6.9.17",
    "@react-navigation/stack": "^6.3.20",
    "@types/react": "~18.2.45",
    "expo": "~50.0.6",
    "expo-google-sign-in": "^11.0.0",
    "expo-image-picker": "~14.7.1",
    "expo-linking": "~6.2.2",
    "expo-status-bar": "~1.11.1",
    "expo-web-browser": "~12.8.2",
    "firebase": "^10.8.0",
    "react": "18.2.0",
    "react-firebase-hooks": "^5.1.1",
    "react-native": "0.73.4",
    "react-native-image-picker": "^7.1.0",
    "react-native-keyboard-spacer": "^0.4.1",
    "react-native-paper": "^5.12.3",
    "react-native-picker-select": "^9.0.1",
    "react-native-safe-area-context": "^4.8.2",
    "react-native-screens": "^3.29.0",
    "react-native-vector-icons": "^10.0.3",
    "typescript": "^5.3.0"
## Known Problems
Deleting a listing causes existing chats to have ghost links to that listing.

### Assistance
If you encounter any difficulties or require assistance with running the app on your device, please feel free to reach out to us, and we would be happy to assist you.
You can also check the information in the "Contact us" page on the profile screen of our app.

### Contributing

* Fork it!
* Create your feature branch: git checkout -b my-new-feature
* Commit your changes: git commit -am 'Add some feature'
* Push to the branch: git push origin my-new-feature
* Submit a pull request :D

## License
MIT License

Copyright (c) [2024] [pj01 group]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
