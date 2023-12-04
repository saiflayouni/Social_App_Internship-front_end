import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "authToken";

export const storeAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error(
      "Erreur lors du stockage du token d'authentification :",
      error
    );
  }
};

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du token d'authentification :",
      error
    );
    return null;
  }
};

export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error(
      "Erreur lors de la suppression du token d'authentification :",
      error
    );
  }
};
