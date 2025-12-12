// src/components/MenuItemCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuItem } from '../types';

export default function MenuItemCard({ 
  item, 
  onDelete 
}: { 
  item: MenuItem; 
  onDelete: () => void;
}) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
        </View>

        <Text style={styles.course}>{item.course}</Text>
        
        {item.description ? (
          <Text style={styles.desc}>{item.description}</Text>
        ) : (
          <Text style={styles.noDesc}>No description</Text>
        )}
      </View>

      <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
        <Text style={styles.deleteBtnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: { 
    fontWeight: '700', 
    fontSize: 16, 
    color: '#1A365D',
    flex: 1,
  },
  price: { 
    fontWeight: '700', 
    color: '#2B6CB0',
    fontSize: 16,
    marginLeft: 8,
  },
  course: { 
    marginTop: 4,
    marginBottom: 6,
    color: '#718096', 
    fontWeight: '600',
    fontSize: 13,
  },
  desc: { 
    marginTop: 4,
    color: '#4A5568',
    fontSize: 14,
    lineHeight: 20,
  },
  noDesc: { 
    marginTop: 4,
    color: '#A0AEC0', 
    fontStyle: 'italic',
    fontSize: 13,
  },
  deleteBtn: { 
    backgroundColor: '#E53E3E', 
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8, 
    marginLeft: 12,
  },
  deleteBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
});