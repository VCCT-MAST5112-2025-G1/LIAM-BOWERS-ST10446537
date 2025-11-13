import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { menuItems } from '../data/menuData';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [averages, setAverages] = useState({ starter: 0, main: 0, dessert: 0 });

  const calculateAverages = () => {
    const totals = { starter: 0, main: 0, dessert: 0 };
    const counts = { starter: 0, main: 0, dessert: 0 };

    for (let i = 0; i < menuItems.length; i++) {
      const item = menuItems[i];
      totals[item.course] += item.price;
      counts[item.course]++;
    }

    setAverages({
      starter: counts.starter ? totals.starter / counts.starter : 0,
      main: counts.main ? totals.main / counts.main : 0,
      dessert: counts.dessert ? totals.dessert / counts.dessert : 0,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel’s Menu</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.course.toUpperCase()}: {item.name} - R{item.price}
          </Text>
        )}
      />

      <Button title="Calculate Average Prices" onPress={calculateAverages} />
      <Text style={styles.avg}>Starter Avg: R{averages.starter.toFixed(2)}</Text>
      <Text style={styles.avg}>Main Avg: R{averages.main.toFixed(2)}</Text>
      <Text style={styles.avg}>Dessert Avg: R{averages.dessert.toFixed(2)}</Text>

      <Button title="Add Menu Items" onPress={() => navigation.navigate('AddMenu')} />
      <Button title="Filter Menu" onPress={() => navigation.navigate('Filter')} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  item: { fontSize: 16, marginVertical: 4 },
  avg: { fontSize: 16, marginVertical: 4, fontWeight: 'bold' },
});
