import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { getStoredToken, storeToken, removeToken } from '../utils/storage';
import * as jwt from "react-native-pure-jwt";

const SECRET = 'mysecretkey123'; // demo secret (HMAC-SHA256)

const TokenScreen: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [payload, setPayload] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const storedToken = await getStoredToken();
        if (storedToken) {
          setToken(storedToken);
          decodeToken(storedToken);
        }
      } catch (error) {
        console.error('Error loading token:', error);
      }
    })();
  }, []);

  const handleGenerateToken = async () => {
    try {
      setLoading(true);

      const issuedAt = Math.floor(Date.now() / 1000);
      const expiresAt = issuedAt + 60 * 60; // 1 hour expiry

      const newToken = await jwt.sign(
        {
          userId: Math.floor(Math.random() * 1000),
          username: 'testuser',
          iat: issuedAt,
          exp: expiresAt,
        },
        SECRET,
        { alg: 'HS256' },
      );

      await storeToken(newToken);
      setToken(newToken);
      decodeToken(newToken);

      Alert.alert('Success', 'JWT generated and stored successfully!');
    } catch (error) {
      console.error('Error generating token:', error);
      Alert.alert('Error', 'Failed to generate token');
    } finally {
      setLoading(false);
    }
  };

  const handleClearToken = async () => {
    Alert.alert(
      'Clear Token',
      'Are you sure you want to clear the stored token?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          onPress: async () => {
            try {
              await removeToken();
              setToken(null);
              setPayload(null);
              Alert.alert('Success', 'Token cleared successfully!');
            } catch (error) {
              console.error('Error clearing token:', error);
              Alert.alert('Error', 'Failed to clear token');
            }
          },
        },
      ],
    );
  };

  const decodeToken = async (token: string) => {
    try {
      const decoded = await jwt.decode(token, SECRET, { skipValidation: true });
      setPayload(decoded.payload);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const isTokenExpired = () => {
    if (!payload || !payload.exp) return false;
    return Date.now() >= payload.exp * 1000;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Token Management</Text>
          <Text style={styles.subtitle}>Generate and manage JWT tokens</Text>

          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Current Status:</Text>
            <Text
              style={[
                styles.statusValue,
                { color: token ? '#34C759' : '#FF3B30' },
              ]}
            >
              {token ? 'Token Stored' : 'No Token'}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.generateButton]}
              onPress={handleGenerateToken}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Generating...' : 'Generate New JWT'}
              </Text>
            </TouchableOpacity>

            {token && (
              <TouchableOpacity
                style={[styles.button, styles.clearButton]}
                onPress={handleClearToken}
              >
                <Text style={styles.buttonText}>Clear Token</Text>
              </TouchableOpacity>
            )}
          </View>

          {payload && (
            <View style={styles.tokenInfo}>
              <Text style={styles.tokenInfoTitle}>Token Information</Text>

              <View style={styles.infoRow}>
                <Text style={styles.label}>User ID:</Text>
                <Text style={styles.value}>{payload.userId}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Username:</Text>
                <Text style={styles.value}>{payload.username}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Issued At:</Text>
                <Text style={styles.value}>{formatDate(payload.iat)}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Expires At:</Text>
                <Text style={styles.value}>{formatDate(payload.exp)}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Status:</Text>
                <Text
                  style={[
                    styles.value,
                    { color: isTokenExpired() ? '#FF3B30' : '#34C759' },
                  ]}
                >
                  {isTokenExpired() ? 'Expired' : 'Valid'}
                </Text>
              </View>

              <View style={styles.tokenContainer}>
                <Text style={styles.label}>Token:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Text style={styles.tokenText} selectable>
                    {token}
                  </Text>
                </ScrollView>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' ,    paddingTop: 20,},
  scrollContainer: { flexGrow: 1 },
  content: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  statusLabel: { fontSize: 18, fontWeight: '600', marginRight: 8 },
  statusValue: { fontSize: 18, fontWeight: 'bold' },
  buttonContainer: { marginBottom: 32 },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  generateButton: { backgroundColor: '#007AFF' },
  clearButton: { backgroundColor: '#FF3B30' },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  tokenInfo: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 3,
  },
  tokenInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 100,
    marginRight: 12,
  },
  value: { fontSize: 14, color: '#333', flex: 1 },
  tokenContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tokenText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#333',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
  },
});

export default TokenScreen;
