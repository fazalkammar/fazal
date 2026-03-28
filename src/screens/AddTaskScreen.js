import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTodos } from '../context/TodoContext';

const priorities = [
  { key: 'low', label: 'Low', color: '#10B981', icon: 'arrow-down' },
  { key: 'medium', label: 'Medium', color: '#F59E0B', icon: 'remove' },
  { key: 'high', label: 'High', color: '#EF4444', icon: 'arrow-up' },
];

export default function AddTaskScreen({ navigation }) {
  const { addTodo, categories } = useTodos();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [selectedPriority, setSelectedPriority] = useState('medium');

  const handleAdd = () => {
    if (!title.trim()) return;
    addTodo({
      title: title.trim(),
      description: description.trim(),
      categoryId: selectedCategory,
      priority: selectedPriority,
    });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Task</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Task Title</Text>
          <TextInput
            style={styles.input}
            placeholder="What needs to be done?"
            placeholderTextColor="#94A3B8"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description (optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add some details..."
            placeholderTextColor="#94A3B8"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.optionsRow}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryOption,
                  selectedCategory === cat.id && { borderColor: cat.color, backgroundColor: cat.color + '10' },
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <View style={[styles.catDot, { backgroundColor: cat.color }]} />
                <Text
                  style={[
                    styles.categoryLabel,
                    selectedCategory === cat.id && { color: cat.color },
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityRow}>
            {priorities.map((p) => (
              <TouchableOpacity
                key={p.key}
                style={[
                  styles.priorityOption,
                  selectedPriority === p.key && { borderColor: p.color, backgroundColor: p.color + '10' },
                ]}
                onPress={() => setSelectedPriority(p.key)}
              >
                <Ionicons
                  name={p.icon}
                  size={16}
                  color={selectedPriority === p.key ? p.color : '#94A3B8'}
                />
                <Text
                  style={[
                    styles.priorityLabel,
                    selectedPriority === p.key && { color: p.color },
                  ]}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.addBtn, !title.trim() && styles.addBtnDisabled]}
          onPress={handleAdd}
          disabled={!title.trim()}
        >
          <Ionicons name="add-circle" size={22} color="#fff" />
          <Text style={styles.addBtnText}>Add Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scroll: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#fff',
  },
  catDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 10,
  },
  priorityOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#fff',
    gap: 6,
  },
  priorityLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    marginTop: 10,
    marginBottom: 40,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addBtnDisabled: {
    opacity: 0.5,
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
