import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { fetchUserById } from '../services/api';

type UserDetailsScreenRouteProp = RouteProp<RootStackParamList, 'UserDetails'>;

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface Props {
  route: UserDetailsScreenRouteProp;
}

const UserDetailsScreen: React.FC<Props> = ({ route }) => {
  const { userId } = route.params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUserDetails();
  }, [userId]);

  const loadUserDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await fetchUserById(userId);
      setUser(userData);
    } catch (err) {
      setError('Failed to load user details');
      console.error('Error loading user details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaProvider style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading user details...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  if (error || !user) {
    return (
      <SafeAreaProvider style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error || 'User not found'}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadUserDetails}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>@{user.username}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Website:</Text>
            <Text style={styles.value}>{user.website}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Street:</Text>
            <Text style={styles.value}>{user.address.street}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Suite:</Text>
            <Text style={styles.value}>{user.address.suite}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>City:</Text>
            <Text style={styles.value}>{user.address.city}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Zipcode:</Text>
            <Text style={styles.value}>{user.address.zipcode}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Coordinates:</Text>
            <Text style={styles.value}>
              {user.address.geo.lat}, {user.address.geo.lng}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user.company.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Catch Phrase:</Text>
            <Text style={styles.value}>{user.company.catchPhrase}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Business:</Text>
            <Text style={styles.value}>{user.company.bs}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContainer: {
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    width: 100,
    marginRight: 12,
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
});

export default UserDetailsScreen;
