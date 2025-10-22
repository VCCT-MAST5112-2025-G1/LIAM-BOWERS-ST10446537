// screens/AddItemScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Course } from '../types';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../contexts/MenuContext';

type Props = NativeStackScreenProps<RootStackParamList, 'AddItem'>;

const predefinedCourses: Course[] = ['Starters', 'Mains', 'Desserts'];

export default function AddItemScreen({ navigation }: Props) {
  const { addItem } = useMenu();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [course, setCourse] = React.useState<Course>('Starters');
  const [price, setPrice] = React.useState('');

  const onSave = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Dish name required.');
      return;
    }
    if (!price.trim() || isNaN(Number(price))) {
      Alert.alert('Validation', 'Enter a valid numeric price.');
      return;
    }

    addItem({
      name: name.trim(),
      description: description.trim(),
      course,
      price: Number(price),
    });

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.card}>
        <Text style={styles.title}>Add a menu item</Text>

        <TextInput placeholder="Dish name" value={name} onChangeText={setName} style={styles.input} placeholderTextColor="#666" />

        <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={[styles.input, { height: 100 }]} multiline placeholderTextColor="#666" />

        <View style={{ borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginBottom: 10 }}>
          <Picker selectedValue={course} onValueChange={(v) => setCourse(v as Course)}>
            {predefinedCourses.map(c => <Picker.Item label={c} value={c} key={c} />)}
          </Picker>
        </View>

        <TextInput placeholder="Price e.g. 150" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} placeholderTextColor="#666" />

        <TouchableOpacity style={styles.primaryButton} onPress={onSave}>
          <Text style={styles.buttonText}>Save item</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC', justifyContent: 'center', padding: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, elevation: 2 },
  title: { fontSize: 20, fontWeight: '700', color: '#1A365D', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#E2E8F0', padding: 10, borderRadius: 8, marginBottom: 10, backgroundColor: '#F8FAFC' },
  primaryButton: { backgroundColor: '#2B6CB0', padding: 12, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});
