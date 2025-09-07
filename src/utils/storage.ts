import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

// Storage keys
const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  CART_DATA: '@cart_data',
  SETTINGS: '@settings',
} as const;

// Generic storage functions
export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error storing data:', error);
    throw error;
  }
};

export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
    throw error;
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};

// Token-specific functions

// Token-specific functions using Keychain
export const storeToken = async (token: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword('authToken', token, {
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    });
  } catch (error) {
    console.error('Error storing token:', error);
    throw error;
  }
};

export const getStoredToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password; // this is your token
    }
    return null;
  } catch (error) {
    console.error('Error retrieving token:', error);
    throw error;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.error('Error removing token:', error);
    throw error;
  }
};

// User data functions
export interface StoredUserData {
  id: number;
  name: string;
  username: string;
  email: string;
  lastLogin: string;
}

export const storeUserData = async (userData: StoredUserData): Promise<void> => {
  return storeData(STORAGE_KEYS.USER_DATA, userData);
};

export const getStoredUserData = async (): Promise<StoredUserData | null> => {
  return getData<StoredUserData>(STORAGE_KEYS.USER_DATA);
};

export const removeUserData = async (): Promise<void> => {
  return removeData(STORAGE_KEYS.USER_DATA);
};

// Cart data functions (for persistence)
export interface StoredCartData {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  lastUpdated: string;
}

export const storeCartData = async (cartData: StoredCartData): Promise<void> => {
  return storeData(STORAGE_KEYS.CART_DATA, cartData);
};

export const getStoredCartData = async (): Promise<StoredCartData | null> => {
  return getData<StoredCartData>(STORAGE_KEYS.CART_DATA);
};

export const removeCartData = async (): Promise<void> => {
  return removeData(STORAGE_KEYS.CART_DATA);
};
