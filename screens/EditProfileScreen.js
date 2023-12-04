import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const EditProfileScreen = ({ navigation }) => {
  const { user, updateUser } = useContext(AuthContext);

  const [newUserData, setNewUserData] = useState({
    fname: user.fname || "",
    lname: user.lname || "",
    about: user.about || "",
    desc: user.desc || "",
    city: user.city || "",
    from: user.from || "",
    posteTravail: user.posteTravail || "",
    Technologies: user.Technologies || "",
    profilePicture: user.profilePicture || "",
  });

  const handleSave = () => {
    // Perform data validation and update user data
    updateUser(newUserData);
    navigation.goBack(); // Navigate back to the profile screen
  };

  const handleSelectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      console.log("User cancelled image picker");
    } else {
      const imageUri = pickerResult.uri;
      const filename = imageUri.split("/").pop();

      // Create a new directory to store the image (optional)
      const dirInfo = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + "profile_pictures/"
      );
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "profile_pictures/"
        );
      }

      // Move the image to a new location (optional)
      const newImageUri =
        FileSystem.documentDirectory + "profile_pictures/" + filename;
      await FileSystem.moveAsync({
        from: imageUri,
        to: newImageUri,
      });

      // Update the profile picture in the state
      setNewUserData({
        ...newUserData,
        profilePicture: newImageUri,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture */}
        <TouchableOpacity onPress={handleSelectImage}>
          <Image
            style={styles.userImg}
            source={{
              uri:
                newUserData.profilePicture ||
                "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
            }}
          />
          <Text style={styles.changeProfilePicture}>
            Change Profile Picture
          </Text>
        </TouchableOpacity>

        {/* Editable User Data */}
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={newUserData.fname}
          onChangeText={(text) =>
            setNewUserData({ ...newUserData, fname: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={newUserData.lname}
          onChangeText={(text) =>
            setNewUserData({ ...newUserData, lname: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="About"
          multiline
          numberOfLines={3}
          value={newUserData.about}
          onChangeText={(text) =>
            setNewUserData({ ...newUserData, about: text })
          }
        />

        {/* Add fields for the new attributes here */}
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newUserData.desc}
          onChangeText={(text) =>
            setNewUserData({ ...newUserData, desc: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={newUserData.city}
          onChangeText={(text) =>
            setNewUserData({ ...newUserData, city: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="From"
          value={newUserData.from}
          onChangeText={(text) =>
            setNewUserData({ ...newUserData, from: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Job Title"
          value={newUserData.posteTravail}
          onChangeText={(text) =>
            setNewUserData({ ...newUserData, posteTravail: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Technologies"
          value={newUserData.Technologies}
          onChangeText={(text) =>
            setNewUserData({ ...newUserData, Technologies: text })
          }
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  changeProfilePicture: {
    color: "#2e64e5",
    marginTop: 10,
  },
  input: {
    borderBottomColor: "#2e64e5",
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#2e64e5",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
