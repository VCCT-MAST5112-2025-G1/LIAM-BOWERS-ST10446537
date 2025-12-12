// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useMenu } from '../contexts/MenuContext';
import MenuItemCard from '../components/MenuItemCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { menu, removeItem } = useMenu();
  const [averages, setAverages] = useState({ Starters: 0, Mains: 0, Desserts: 0 });

  const calculateAverages = () => {
    const totals = { Starters: 0, Mains: 0, Desserts: 0 };
    const counts = { Starters: 0, Mains: 0, Desserts: 0 };

    for (let i = 0; i < menu.length; i++) {
      const item = menu[i];
      totals[item.course] += item.price;
      counts[item.course]++;
    }

    setAverages({
      Starters: counts.Starters ? totals.Starters / counts.Starters : 0,
      Mains: counts.Mains ? totals.Mains / counts.Mains : 0,
      Desserts: counts.Desserts ? totals.Desserts / counts.Desserts : 0,
    });
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => removeItem(id)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Average Prices by Course</Text>
        <TouchableOpacity style={styles.calculateBtn} onPress={calculateAverages}>
          <Text style={styles.calculateBtnText}>Calculate Averages</Text>
        </TouchableOpacity>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Starters</Text>
            <Text style={styles.statValue}>R {averages.Starters.toFixed(2)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Mains</Text>
            <Text style={styles.statValue}>R {averages.Mains.toFixed(2)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Desserts</Text>
            <Text style={styles.statValue}>R {averages.Desserts.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => navigation.navigate('AddItem')}
        >
          <Text style={styles.buttonText}>+ Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => navigation.navigate('Filter')}
        >
          <Text style={styles.buttonText}>Filter Menu</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.menuTitle}>Menu Items ({menu.length})</Text>

      {menu.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No menu items yet</Text>
          <Text style={styles.emptySubtext}>Tap "Add Item" to get started</Text>
        </View>
      ) : (
        <FlatList
          data={menu}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MenuItemCard 
              item={item} 
              onDelete={() => handleDelete(item.id, item.name)} 
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F7FAFC',
    padding: 16,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A365D',
    marginBottom: 12,
  },
  calculateBtn: {
    backgroundColor: '#2B6CB0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  calculateBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: '#718096',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: '#2B6CB0',
    fontSize: 16,
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#38A169',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#805AD5',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A365D',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#718096',
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#A0AEC0',
    marginTop: 8,
  },
});