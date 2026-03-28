import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTodos } from '../context/TodoContext';

const priorityColors = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#10B981',
};

export default function TodoItem({ todo, onPress }) {
  const { toggleTodo, deleteTodo, categories } = useTodos();
  const category = categories.find((c) => c.id === todo.categoryId);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <TouchableOpacity
        style={[styles.checkbox, todo.completed && styles.checkboxChecked]}
        onPress={() => toggleTodo(todo.id)}
      >
        {todo.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, todo.completed && styles.titleCompleted]} numberOfLines={1}>
          {todo.title}
        </Text>
        <View style={styles.meta}>
          {category && (
            <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
              <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
              <Text style={[styles.categoryText, { color: category.color }]}>{category.name}</Text>
            </View>
          )}
          <View style={[styles.priorityBadge, { backgroundColor: priorityColors[todo.priority] + '20' }]}>
            <Text style={[styles.priorityText, { color: priorityColors[todo.priority] }]}>
              {todo.priority}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteTodo(todo.id)}>
        <Ionicons name="trash-outline" size={18} color="#94A3B8" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  checkboxChecked: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 6,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  deleteBtn: {
    padding: 6,
    marginLeft: 8,
  },
});
