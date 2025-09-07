import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import LargeListScreen from '../screens/LargeListScreen';
import UserListScreen from '../screens/UserListScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import TokenScreen from '../screens/TokenScreen';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  LargeList: undefined;
  Users: undefined;
  UserList: undefined;
  UserDetails: { userId: string };
  Token: undefined;
};
interface TabBarIconProps {
  focused: boolean;
  color: any; // or define the type of color if you know it
  size: any; // or define the type of size if you know it
  route: any; // or define the type of route if you know it
}
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserListScreen} />
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
    </Stack.Navigator>
  );
}
const TabBarIcon = ({ focused, color, size, route }:TabBarIconProps) => {
  let iconName: string;
  switch (route.name) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Cart':
      iconName = focused ? 'cart' : 'cart-outline';
      break;
    case 'LargeList':
      iconName = focused ? 'list' : 'list-outline';
      break;
    case 'Users':
      iconName = focused ? 'people' : 'people-outline';
      break;
    case 'Token':
      iconName = focused ? 'key' : 'key-outline';
      break;
    default:
      iconName = 'ellipse';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};
const RootNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => TabBarIcon({ focused, color, size, route }),
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="LargeList" component={LargeListScreen} />
      <Tab.Screen name="Users" component={UserStack} />
      <Tab.Screen name="Token" component={TokenScreen} />
    </Tab.Navigator>
  );
};

export default RootNavigator;
