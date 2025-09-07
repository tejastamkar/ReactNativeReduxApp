import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import DeviceInfo from 'react-native-device-info';

type ScreenName = keyof RootStackParamList; 

interface MenuItem {
  title: string;
  screen: ScreenName;
}

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const menuItems: MenuItem[] = [
    { title: 'Cart', screen: 'Cart' },
    { title: 'Large List', screen: 'LargeList' },
    { title: 'User List', screen: 'Users' },
    { title: 'Token Screen', screen: 'Token' },
  ];

  const appVersion = DeviceInfo.getVersion();
  const platform = Platform.OS === 'ios' ? 'iOS' : 'Android';

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>React Native Interview Binny's</Text>
        <Text style={styles.subtitle}>Choose a screen to navigate to:</Text>
        
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={styles.buttonText}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        {/* Platform and version info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Platform: {platform}
          </Text>
          <Text style={styles.footerText}>
            App Version: {appVersion}
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    maxWidth: 300,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#333',
  },
});

export default HomeScreen;
