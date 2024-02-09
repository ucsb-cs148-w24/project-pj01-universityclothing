import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
//import { useRouter } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import {COLORS,SPACING} from '../theme/theme';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  return(
    <View style={styles.ScreenContainer}>
      <View style = {styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style = {styles.searchInput}
            placeholderTextColor={COLORS.black}
            placeholder='Search with key words'
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={()=> {}}>
        <Entypo
           //style = {styles.Icon1}
           name="magnifying-glass"
           size={25}
           color={COLORS.lightYellow
           }
          />
        </TouchableOpacity>
      </View>
      <View>
      <Text style={styles.text}>Recent Search</Text>
      <TouchableOpacity onPress={()=> {}}>
      <Text style={styles.text2}>see more</Text>
      </TouchableOpacity>
      <Text style={styles.text3}>desk lamp</Text>
      </View>
      <Text style={styles.text}>Top Search</Text>
      <Text style={styles.text3}>desk lamp</Text>
    </View>

    
  )
};

const styles = StyleSheet.create({
  ScreenContainer: {
    //flex: 1,
    backgroundColor: "#F2F1EB",
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    width: 370,
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    height: 40,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    //height: "100%",
  },
  searchInput:{
    color: "#000000",
    fontSize: 20,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.darkBlue,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text:{
    left:30,
    top:20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text2:{
    textAlign:'right',
    fontSize: 15,
    right:20,
  },
  text3:{
    textAlign:'left',
    fontSize: 15,
    top: 20,
    left:50,
  },
});

export default SearchScreen;
