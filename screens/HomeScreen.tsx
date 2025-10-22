// screens/HomeScreen.tsx
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Course } from '../types';
import MenuItemCard from '../components/MenuItemCard';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../contexts/MenuContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const predefinedCourses: Course[] = ['Starters', 'Mains', 'Desserts'];

export default function HomeScreen({ navigation }: Props) {
  const { menu, addItem, removeItem } = useMenu();

  const [quickName, setQuickName] = React.useState('');
  const [quickDesc, setQuickDesc] = React.useState('');
  const [quickCourse, setQuickCourse] = React.useState<Course>('Starters');
  const [quickPrice, setQuickPrice] = React.useState('');

  const highlightAnim = useRef(new Animated.Value(1)).current;

  const runHighlight = () => {
    highlightAnim.setValue(0.3);
    Animated.timing(highlightAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  const handleAddQuick = () => {
    if (!quickName.trim()) {
      Alert.alert('Validation', 'Please enter a dish name.');
      return;
    }
    if (!quickPrice.trim() || isNaN(Number(quickPrice))) {
      Alert.alert('Validation', 'Please enter a valid price (number).');
      return;
    }
    addItem({
      name: quickName.trim(),
      description: quickDesc.trim(),
      course: quickCourse,
      price: Number(quickPrice),
    });
    setQuickName('');
    setQuickDesc('');
    setQuickPrice('');
    runHighlight();
  };

  const handleAddTemplates = () => {
    // adds three editable template items (minimal content) so chef can edit later
    addItem({ name: 'New Dish 1', description: '', course: 'Starters', price: 0 });
    addItem({ name: 'New Dish 2', description: '', course: 'Mains', price: 0 });
    addItem({ name: 'New Dish 3', description: '', course: 'Desserts', price: 0 });
    runHighlight();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Chef's Menu</Text>
          <Text style={styles.count}>Total items: {menu.length}</Text>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('AddItem')}>
            <Text style={styles.buttonText}>+ Add Item (full form)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleAddTemplates}>
            <Text style={styles.buttonText}>+ Add 3 Templates</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickAddCard}>
          <Text style={styles.sectionTitle}>Quick add from Home</Text>

          <TextInput
            placeholder="Dish name"
            value={quickName}
            onChangeText={setQuickName}
            style={styles.input}
            placeholderTextColor="#666"
          />

          <TextInput
            placeholder="Description"
            value={quickDesc}
            onChangeText={setQuickDesc}
            style={[styles.input, { height: 80 }]}
            multiline
            placeholderTextColor="#666"
          />

          <View style={styles.pickerRow}>
            <View style={{ flex: 1, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden' }}>
              <Picker selectedValue={quickCourse} onValueChange={(val) => setQuickCourse(val as Course)}>
                {predefinedCourses.map(c => <Picker.Item label={c} value={c} key={c} />)}
              </Picker>
            </View>

            <TextInput
              placeholder="Price"
              value={quickPrice}
              onChangeText={setQuickPrice}
              style={[styles.input, { flex: 0.6, marginLeft: 10 }]}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleAddQuick}>
            <Text style={styles.buttonText}>Add to menu</Text>
          </TouchableOpacity>
        </View>

        <Animated.View style={{ opacity: highlightAnim }}>
          <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Menu Items</Text>
        </Animated.View>

        {menu.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No items yet. Use "Add Item" or the quick form to add dishes.</Text>
          </View>
        ) : (
          <FlatList
            data={menu}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MenuItemCard item={item} onDelete={() => removeItem(item.id)} />}
            contentContainerStyle={{ paddingBottom: 40 }}
            style={{ width: '100%', marginTop: 8 }}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center', backgroundColor: '#F7FAFC', flex: 1 },
  header: { width: '100%', marginBottom: 8 },
  title: { fontSize: 26, fontWeight: '700', color: '#1A365D' },
  count: { marginTop: 4, color: '#2D3748' },
  buttonsRow: { flexDirection: 'row', marginTop: 12, width: '100%', justifyContent: 'space-between' },
  primaryButton: { backgroundColor: '#2B6CB0', padding: 12, borderRadius: 10, alignItems: 'center', flex: 1, marginRight: 8 },
  secondaryButton: { backgroundColor: '#4A5568', padding: 12, borderRadius: 10, alignItems: 'center', flex: 1, marginLeft: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
  quickAddCard: { marginTop: 16, width: '100%', backgroundColor: '#fff', padding: 12, borderRadius: 12 },
  sectionTitle: { fontWeight: '700', fontSize: 18, color: '#2D3748', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#E2E8F0', padding: 10, borderRadius: 8, backgroundColor: '#F8FAFC', marginBottom: 8, color: '#1A202C' },
  pickerRow: { flexDirection: 'row', alignItems: 'center' },
  emptyBox: { marginTop: 16, padding: 20, borderRadius: 10, backgroundColor: '#EDF2F7', width: '100%' },
  emptyText: { color: '#4A5568' },
});
