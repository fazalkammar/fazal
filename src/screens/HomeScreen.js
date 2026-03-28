import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTodos } from '../context/TodoContext';
import TodoItem from '../components/TodoItem';
import StatsCard from '../components/StatsCard';
import FilterChips from '../components/FilterChips';

export default function HomeScreen({ navigation }) {
  const { filteredTodos, stats } = useTodos();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>{greeting()} 👋</Text>
                <Text style={styles.subtitle}>
                  {stats.active > 0
                    ? `You have ${stats.active} task${stats.active > 1 ? 's' : ''} remaining`
                    : 'All caught up!'}
                </Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <StatsCard icon="list" label="Total" value={stats.total} color="#6366F1" />
              <View style={{ width: 10 }} />
              <StatsCard icon="checkmark-circle" label="Done" value={stats.completed} color="#10B981" />
              <View style={{ width: 10 }} />
              <StatsCard icon="time" label="Active" value={stats.active} color="#F59E0B" />
            </View>

            <FilterChips />

            <Text style={styles.sectionTitle}>
              {filteredTodos.length > 0 ? 'Your Tasks' : ''}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onPress={() => navigation.navigate('TaskDetail', { todoId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="clipboard-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No tasks yet</Text>
            <Text style={styles.emptySubtitle}>Tap the + button to add your first task</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#CBD5E1',
    marginTop: 6,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
});
