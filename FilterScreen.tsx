import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { menuItems } from '../data/menuData';

const FilterScreen: React.FC = () => {
  const [filteredItems, setFilteredItems] = useState(menuItems);

  const filterByCourse = (course: string) => {
    let i = 0;
    const results = [];
    while (i < menuItems.length) {
      if (menuItems[i].course === course) {
        results.push(menuItems[i]);
      }
      i++;
    }
    setFilteredItems(results);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Course</Text>

      <Button title="Starters" onPress={() => filterByCourse('starter')} />
      <Button title="Mains" onPress={() => filterByCourse('main')} />
      <Button title="Desserts" onPress={() => filterByCourse('dessert')} />
      <Button title="Show All" onPress={() => setFilteredItems(menuItems)} />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.course.toUpperCase()}: {item.name} - R{item.price}
          </Text>
        )}
      />
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  item: { fontSize: 16, marginVertical: 5 },
});
