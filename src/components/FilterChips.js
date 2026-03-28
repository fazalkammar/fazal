import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTodos } from '../context/TodoContext';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Done' },
];

export default function FilterChips() {
  const { filter, setFilter } = useTodos();

  return (
    <View style={styles.container}>
      {filters.map((f) => (
        <TouchableOpacity
          key={f.key}
          style={[styles.chip, filter === f.key && styles.chipActive]}
          onPress={() => setFilter(f.key)}
        >
          <Text style={[styles.chipText, filter === f.key && styles.chipTextActive]}>
            {f.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  chipActive: {
    backgroundColor: '#6366F1',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  chipTextActive: {
    color: '#fff',
  },
});
