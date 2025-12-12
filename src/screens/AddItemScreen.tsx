// src/screens/AddItemScreen.tsx
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
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Course } from '../types';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../contexts/MenuContext';

type Props = NativeStackScreenProps<RootStackParamList, 'AddItem'>;

const predefinedCourses: Course[] = ['Starters', 'Mains', 'Desserts'];

export default function AddItemScreen({ navigation }: Props) {
  const { addItem } = useMenu();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>('Starters');
  const [price, setPrice] = useState('');

  const onSave = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Dish name is required.');
      return;
    }
    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert('Validation', 'Please enter a valid price greater than 0.');
      return;
    }

    addItem({
      name: name.trim(),
      description: description.trim(),
      course,
      price: Number(price),
    });

    Alert.alert('Success', 'Menu item added successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Add a New Menu Item</Text>

          <Text style={styles.label}>Dish Name *</Text>
          <TextInput
            placeholder="e.g. Grilled Salmon"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#A0AEC0"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Describe your dish..."
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            placeholderTextColor="#A0AEC0"
          />

          <Text style={styles.label}>Course *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={course}
              onValueChange={(v) => setCourse(v as Course)}
              style={styles.picker}
            >
              {predefinedCourses.map(c => (
                <Picker.Item label={c} value={c} key={c} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Price (R) *</Text>
          <TextInput
            placeholder="e.g. 150"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            style={styles.input}
            placeholderTextColor="#A0AEC0"
          />

          <TouchableOpacity style={styles.primaryButton} onPress={onSave}>
            <Text style={styles.buttonText}>Save Menu Item</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F7FAFC',
  },
  scrollContent: {
    padding: 16,
  },
  card: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 12, 
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#1A365D', 
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 8,
    marginTop: 12,
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#E2E8F0', 
    padding: 12, 
    borderRadius: 8, 
    backgroundColor: '#F8FAFC',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  primaryButton: { 
    backgroundColor: '#2B6CB0', 
    padding: 14, 
    borderRadius: 10, 
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryButtonText: {
    color: '#4A5568',
    fontWeight: '600',
    fontSize: 16,
  },
});