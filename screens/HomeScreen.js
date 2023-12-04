import React, { useContext } from "react";
import { View, Button, FlatList } from "react-native";
import PostCard from "../components/PostCard";
import { AuthContext } from "../navigation/AuthProvider";

const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext);

  // Données fictives pour les publications
  const feedData = [
    {
      id: 1,
      userId: 123,
      userImg: "https://example.com/user1.jpg",
      fname: "John",
      lname: "Doe",
      postTime: "2023-09-06T10:00:00Z",
      post: "Ceci est un exemple de publication.",
      postImg: "https://example.com/post1.jpg",
      liked: true,
      likes: 42,
      comments: 7,
    },
    // Ajoutez d'autres données de publication ici
  ];

  const handleLogout = async () => {
    // Gérez la déconnexion de l'utilisateur ici
  };

  return (
    <View>
      <Button title="Se déconnecter" onPress={handleLogout} />
      <FlatList
        data={feedData}
        renderItem={({ item }) => (
          <PostCard
            item={item}
            onDelete={(postId) => {
              // Gérez la suppression de la publication ici
              console.log(`Suppression de la publication avec l'ID ${postId}`);
            }}
            onPress={() => {
              // Gérez l'action de pression sur l'utilisateur ici
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default HomeScreen;
