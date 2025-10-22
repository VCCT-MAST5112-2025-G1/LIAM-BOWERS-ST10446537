// components/MenuItemCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuItem } from '../types';

export default function MenuItemCard({ item, onDelete }: { item: MenuItem; onDelete: () => void }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
        </View>

        <Text style={styles.course}>{item.course}</Text>
        {item.description ? <Text style={styles.desc}>{item.description}</Text> : <Text style={styles.noDesc}>No description</Text>}
      </View>

      <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E6EEF8',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  name: { fontWeight: '700', fontSize: 16, color: '#1A365D' },
  price: { fontWeight: '700', color: '#2B6CB0' },
  course: { marginTop: 4, color: '#718096', fontWeight: '600' },
  desc: { marginTop: 6, color: '#4A5568' },
  noDesc: { marginTop: 6, color: '#A0AEC0', fontStyle: 'italic' },
  deleteBtn: { backgroundColor: '#E53E3E', padding: 8, borderRadius: 8, marginLeft: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
});
