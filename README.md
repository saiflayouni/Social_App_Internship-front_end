# Social App - React Native (Incomplete Version)

Social App is a mobile application developed with React Native that aims to connect users and facilitate the sharing of experiences. This README.md provides an overview of the project structure and components for an incomplete version of the app.

## Project Structure

- **App.js**: Entry point for the application.
- **app.json**: Expo configuration file.
- **assets**: Directory for static assets.
- **babel.config.js**: Babel configuration.
- **components**:
  - **FormButton.js**: Custom button component for forms.
  - **FormInput.js**: Custom input component for forms.
  - **LoadingComponent.js**: Loading indicator component.
  - **PostCard.js**: Component to display a social media post.
  - **ProgressiveImage.js**: Component for loading images progressively.
  - **SocialButton.js**: Custom social media login button component.
- **navigation**:
  - **AppStack.js**: Main application stack navigator.
  - **AuthProvider.js**: Authentication provider component.
  - **AuthStack.js**: Authentication stack navigator.
  - **authTokenStorage.js**: Utility for handling authentication tokens.
  - **index.js**: Entry point for navigation configuration.
  - **Routes.js**: Centralized routes definition.
- **screens**:
  - **AddPostScreen.js**: Screen for adding a new social media post.
  - **ChatScreen.js**: Screen for chat functionality.
  - **EditProfileScreen.js**: Screen for editing user profiles.
  - **HomeScreen.js**: Main screen displaying the social media feed.
  - **LoginScreen.js**: Screen for user login.
  - **MessagesScreen.js**: Screen for displaying user messages.
  - **OnboardingScreen.js**: Onboarding screen for new users.
  - **ProfileScreen.js**: Screen displaying user profiles.
  - **SignupScreen.js**: Screen for user registration.

- **styles**: Stylesheets for components.
- **utils**: Utility functions.
- **yarn.lock**: Yarn package lock file.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/social-app.git
    cd social-app
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

### Running the App

- Start the Expo development server:

    ```bash
    yarn start
    ```

- Open the Expo Go app on your mobile device and scan the QR code from the Expo development server.

### Scripts

- **start**: Start the Expo development server.
- **android**: Start the Expo development server for Android.
- **ios**: Start the Expo development server for iOS.
- **web**: Start the Expo development server for the web.

## Contributions

Contributions to enhance and complete the Social App project are welcome. Please follow the standard guidelines and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
