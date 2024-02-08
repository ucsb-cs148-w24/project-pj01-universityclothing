import React, {useState,useRef} from "react";
import {
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import {FlatList} from 'react-native';
import {COLORS} from '../theme/theme';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const ListRef: any = useRef<FlatList>();
  const searchCoffee = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      /*setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffee([
        ...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);*/
    }
  };

  const resetSearchCoffee = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    /*setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee([...CoffeeList]);*/
    setSearchText('');
  };
  return (
    <View>
      <StatusBar backgroundColor="#F2F1EB" /> 
      {/* Search Input */}
      <View>
        <TouchableOpacity
          onPress={() => {
          searchCoffee(searchText);
        }}>
      <Entypo
        name="magnifying-glass"
        size={20}
        color={
          searchText.length > 0
            ? COLORS.darkBlue
            : COLORS.lightYellow
        }
      />
      </TouchableOpacity>
        <TextInput
        placeholder="Search with key words"
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
          searchCoffee(text);
        }}
        placeholderTextColor={COLORS.lightYellow}
        />
      {searchText.length > 0 ? (
      <TouchableOpacity
      onPress={() => {
        resetSearchCoffee();
      }}>
      <Entypo
        name="cross"
        size={20}
        color={COLORS.darkBlue}
      />
    </TouchableOpacity>
    ) : (
    <></>
  )}
      </View>
    <Text>hi</Text>
  </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
