import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { menuItems, addMenuItem, removeMenuItem } from '../data/menuData';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type AddMenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddMenu'>;

interface Props {
  navigation: AddMenuScreenNavigationProp;
}

const AddMenuScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!name || !course || !price) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const newItem = {
      id: menuItems.length + 1,
      name,
      course: course.toLowerCase() as 'starter' | 'main' | 'dessert',
      price: parseFloat(price),
    };

    addMenuItem(newItem);
    setName('');
    setCourse('');
    setPrice('');
    Alert.alert('Success', 'Menu item added.');
  };

  const handleRemove = (id: number) => {
    removeMenuItem(id);
    Alert.alert('Removed', 'Item deleted.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add / Remove Menu Items</Text>

      <TextInput style={styles.input} placeholder="Dish Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Course (starter/main/dessert)" value={course} onChangeText={setCourse} />
      <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" value={price} onChangeText={setPrice} />

      <Button title="Add Dish" onPress={handleAdd} />

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name} - R{item.price}</Text>
            <Button title="Remove" onPress={() => handleRemove(item.id)} />
          </View>
        )}
      />

      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AddMenuScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 6, borderRadius: 5 },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
});
