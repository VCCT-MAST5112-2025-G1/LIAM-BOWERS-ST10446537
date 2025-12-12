// src/screens/FilterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useMenu } from '../contexts/MenuContext';
import { Course, MenuItem } from '../types';
import MenuItemCard from '../components/MenuItemCard';

export default function FilterScreen() {
  const { menu, removeItem } = useMenu();
  const [selectedCourse, setSelectedCourse] = useState<Course | 'All'>('All');

  const filterByCourse = (course: Course | 'All') => {
    setSelectedCourse(course);
  };

  const getFilteredItems = (): MenuItem[] => {
    if (selectedCourse === 'All') return menu;
    
    const results: MenuItem[] = [];
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].course === selectedCourse) {
        results.push(menu[i]);
      }
    }
    return results;
  };

  const filteredItems = getFilteredItems();

  const courses: (Course | 'All')[] = ['All', 'Starters', 'Mains', 'Desserts'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Course</Text>

      <View style={styles.filterButtons}>
        {courses.map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.filterBtn,
              selectedCourse === course && styles.filterBtnActive
            ]}
            onPress={() => filterByCourse(course)}
          >
            <Text
              style={[
                styles.filterBtnText,
                selectedCourse === course && styles.filterBtnTextActive
              ]}
            >
              {course}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.resultsText}>
        Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
      </Text>

      {filteredItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No items found</Text>
          <Text style={styles.emptySubtext}>
            Try selecting a different course
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MenuItemCard 
              item={item} 
              onDelete={() => removeItem(item.id)} 
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
    padding: 16,
    backgroundColor: '#F7FAFC',
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#1A365D',
    marginBottom: 16,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  filterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  filterBtnActive: {
    backgroundColor: '#2B6CB0',
    borderColor: '#2B6CB0',
  },
  filterBtnText: {
    color: '#4A5568',
    fontWeight: '600',
    fontSize: 14,
  },
  filterBtnTextActive: {
    color: '#fff',
  },
  resultsText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 12,
    fontWeight: '600',
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