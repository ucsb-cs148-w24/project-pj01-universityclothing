// PostCreationScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useItems } from "../components/ItemsContext";
import { Picker } from "@react-native-picker/picker";

const PostCreationScreen = ({ navigation }) => {
  const { handleNewPost } = useItems();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const addNewItem = () => {
    // Create a new item object
    const newItem = {
      id: Date.now().toString(), // Simple unique ID generation
      title,
      price: parseFloat(price),
      description,
      category,
      imageUrl,
    };

    // Call the onPost function passed from the parent component
    handleNewPost(newItem);

    // Clear the form
    setTitle("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImageUrl("");

    // Navigate back or show a success message
    alert("Item posted successfully!");
    navigation.goBack(); // Assuming you want to go back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={styles.input}
      />

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Clothing" value="Clothing" />
        <Picker.Item label="Furniture" value="Furniture" />
        <Picker.Item label="Electronics" value="Electronics" />
        <Picker.Item label="Stationary" value="Stationary" />
      </Picker>

      <Text style={styles.label}>Image URL</Text>
      <TextInput
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
      />

      <Button title="Post Item" onPress={addNewItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default PostCreationScreen;
