import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useTodos } from '../context/TodoContext';

const priorityColors = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#10B981',
};

export default function TaskDetailScreen({ route, navigation }) {
  const { todoId } = route.params;
  const { todos, categories, toggleTodo, deleteTodo } = useTodos();
  const todo = todos.find((t) => t.id === todoId);

  if (!todo) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Task not found</Text>
      </View>
    );
  }

  const category = categories.find((c) => c.id === todo.categoryId);

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteTodo(todo.id);
          navigation.goBack();
        },
      },
    ]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
          <Text style={styles.deleteIcon}>🗑</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.statusRow}>
          <TouchableOpacity
            style={[styles.statusBadge, todo.completed ? styles.statusDone : styles.statusActive]}
            onPress={() => toggleTodo(todo.id)}
          >
            <Text style={{ fontSize: 14 }}>{todo.completed ? '✅' : '⏳'}</Text>
            <Text style={[styles.statusText, { color: todo.completed ? '#10B981' : '#F59E0B' }]}>
              {todo.completed ? 'Completed' : 'In Progress'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.title, todo.completed && styles.titleDone]}>{todo.title}</Text>

        {todo.description ? (
          <Text style={styles.description}>{todo.description}</Text>
        ) : null}

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <View style={styles.detailIcon}>
            <Text style={{ fontSize: 16 }}>📁</Text>
          </View>
          <View>
            <Text style={styles.detailLabel}>Category</Text>
            <View style={styles.catRow}>
              {category && (
                <>
                  <View style={[styles.catDot, { backgroundColor: category.color }]} />
                  <Text style={styles.detailValue}>{category.name}</Text>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailIcon}>
            <Text style={{ fontSize: 16 }}>🚩</Text>
          </View>
          <View>
            <Text style={styles.detailLabel}>Priority</Text>
            <Text style={[styles.detailValue, { color: priorityColors[todo.priority] }]}>
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailIcon}>
            <Text style={{ fontSize: 16 }}>📅</Text>
          </View>
          <View>
            <Text style={styles.detailLabel}>Created</Text>
            <Text style={styles.detailValue}>{formatDate(todo.createdAt)}</Text>
          </View>
        </View>

        {todo.completedAt && (
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Text style={{ fontSize: 16 }}>✅</Text>
            </View>
            <View>
              <Text style={styles.detailLabel}>Completed</Text>
              <Text style={styles.detailValue}>{formatDate(todo.completedAt)}</Text>
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.toggleBtn, todo.completed && styles.toggleBtnUndo]}
        onPress={() => toggleTodo(todo.id)}
      >
        <Text style={styles.toggleBtnText}>
          {todo.completed ? '↩ Mark as Incomplete' : '✓ Mark as Complete'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  notFound: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 24,
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
  backIcon: {
    fontSize: 22,
    color: '#1E293B',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  deleteBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    fontSize: 18,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statusRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusDone: {
    backgroundColor: '#10B98115',
  },
  statusActive: {
    backgroundColor: '#F59E0B15',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  description: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  detailIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  detailLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '600',
    marginTop: 1,
  },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  catDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    marginTop: 24,
    marginBottom: 40,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  toggleBtnUndo: {
    backgroundColor: '#F59E0B',
  },
  toggleBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
