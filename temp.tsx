import React from "react";
import { StatusBar, useColorScheme, Linking } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";

const linking = {
  prefixes: ["myapp://", "https://myapp.com", "http://myapp.com"],
  config: {
    screens: {
      Home: "home",
      Cart: "cart",
      LargeList: "list",
      Users: {
        screens: {
          UserList: "users",
          UserDetails: "user/:userId",
        },
      },
      Token: "token",
    },
  },
};

export default function App() {
  const isDarkMode = useColorScheme() === "dark";

  // Debug deep links
  React.useEffect(() => {
    const handleDeepLink = (url: string) => {
      console.log('🔗 Deep link received:', url);
    };

    // Handle deep link when app is already open
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    // Handle deep link when app is closed
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('🚀 Initial URL:', url);
        handleDeepLink(url);
      }
    }).catch(err => {
      console.warn('Error getting initial URL:', err);
    });

    return () => subscription?.remove();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
