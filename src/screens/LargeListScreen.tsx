import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
}

const LargeListScreen: React.FC = () => {
  const dispatch = useDispatch();

  // Generate a large dataset for performance testing
  const data: ListItem[] = useMemo(() => {
    return Array.from({ length: 10000 }, (_, index) => ({
      id: `product-${index}`,
      title: `Product ${index + 1}`,
      subtitle: `This is the description for product ${index + 1}`,
      price: Math.floor(Math.random() * 100) + 1,
    }));
  }, []);

  const handleAddToCart = (item: ListItem) => {
    dispatch(addToCart({
      id: item.id,
      name: item.title,
      price: item.price,
    }));
  };

  const renderItem = ({ item, index }: { item: ListItem; index: number }) => (
    <View style={[
      styles.itemContainer,
      index % 2 === 0 ? styles.evenRow : styles.oldRow
    ]}>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
      </View>
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  const getItemLayout = (_: any, index: number) => ({
    length: 80,
    offset: 80 * index,
    index,
  });

  return (
    <SafeAreaProvider style={styles.container}>
     
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        getItemLayout={getItemLayout}
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  oldRow : {
    backgroundColor: 'white',
  }, 
  evenRow : {
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  listContent: {
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    height: 80,
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 12,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LargeListScreen;
