import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker"; // Importez Expo ImagePicker
import { getAuthToken } from "../navigation/authTokenStorage";

import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from "../styles/AddPost";

import { AuthContext, foundUser } from "../navigation/AuthProvider";

const AddPostScreen = () => {
  const { Founduser, logout } = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState("");

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.error("Error picking an image: ", error);
    }
  };

  const submitPost = async () => {
    if (!post) {
      Alert.alert("Error", "Please enter a post before submitting.");
      return;
    }

    const imageUrl = await uploadImage();

    if (!Founduser || !Founduser.uid) {
      console.error("User not found or missing uid");
      return;
    }

    try {
      const token = await getAuthToken();

      if (!token) {
        console.error("Authentication token not available");
        return;
      }

      const response = await axios.post(
        "http://localhost:8060/api/posts/add",
        {
          userId: Founduser.uid,
          desc: post,
          img: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "Success") {
        console.log("Post Added!");
        Alert.alert(
          "Post published!",
          "Your post has been published Successfully!"
        );
        setPost("");
        setImage(null);
      } else {
        console.log("Failed to add post: ", response.data.message);
        Alert.alert("Error", "Failed to add post.");
      }
    } catch (error) {
      console.log(
        "Something went wrong with adding post to the server.",
        error
      );
      Alert.alert(
        "Error",
        "Something went wrong with adding post to the server."
      );
    }
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }

    try {
      const token = await getAuthToken();
      console.log("token ya halouf ", token);
      if (!token) {
        console.error("Authentication token not available");
        return null;
      }
      console.log("token ya halouf hhhhhhhh ", token);

      const formData = new FormData();
      formData.append("image", {
        uri: image,
        type: "image/jpeg", // ou le type correct de votre image
        name: "image.jpg",
      });
      console.log("haw forma data ya baba", formData);
      const response = await axios.post(
        "http://localhost:8060/api/posts/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("reponse ya broo ", response);
      if (response.data.status === "Success") {
        console.log("Image uploaded successfully!");
        return response.data.imageUrl;
      } else {
        console.log("Failed to upload image: ", response.data.message);
        return null;
      }
    } catch (error) {
      console.log("Error uploading image: ", error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image != null ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : null}

        <InputField
          placeholder="What's on your mind?"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={(content) => setPost(content)}
        />
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={submitPost}>
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
        )}
      </InputWrapper>
      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={pickImage}
        >
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};
export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
});
