import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoContext = createContext();

const STORAGE_KEY = '@todos';
const CATEGORIES_KEY = '@categories';

const defaultCategories = [
  { id: '1', name: 'Personal', color: '#6366F1', icon: 'person' },
  { id: '2', name: 'Work', color: '#F59E0B', icon: 'briefcase' },
  { id: '3', name: 'Shopping', color: '#10B981', icon: 'cart' },
  { id: '4', name: 'Health', color: '#EF4444', icon: 'heart' },
];

function todoReducer(state, action) {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'ADD_TODO':
      return { ...state, todos: [action.payload, ...state.todos] };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date().toISOString() : null }
            : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload.updates } : todo
        ),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    categories: defaultCategories,
    filter: 'all',
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
  }, [state.todos]);

  async function loadData() {
    try {
      const todosJson = await AsyncStorage.getItem(STORAGE_KEY);
      if (todosJson) {
        dispatch({ type: 'SET_TODOS', payload: JSON.parse(todosJson) });
      }
      const categoriesJson = await AsyncStorage.getItem(CATEGORIES_KEY);
      if (categoriesJson) {
        dispatch({ type: 'SET_CATEGORIES', payload: JSON.parse(categoriesJson) });
      }
    } catch (e) {
      console.error('Failed to load data:', e);
    }
  }

  function addTodo({ title, description = '', categoryId = '1', priority = 'medium', dueDate = null }) {
    const newTodo = {
      id: Date.now().toString(),
      title,
      description,
      categoryId,
      priority,
      dueDate,
      completed: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  }

  function toggleTodo(id) {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }

  function deleteTodo(id) {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }

  function updateTodo(id, updates) {
    dispatch({ type: 'UPDATE_TODO', payload: { id, updates } });
  }

  function setFilter(filter) {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }

  function getFilteredTodos() {
    switch (state.filter) {
      case 'active':
        return state.todos.filter((t) => !t.completed);
      case 'completed':
        return state.todos.filter((t) => t.completed);
      default:
        return state.todos;
    }
  }

  function getStats() {
    const total = state.todos.length;
    const completed = state.todos.filter((t) => t.completed).length;
    const active = total - completed;
    const todayTasks = state.todos.filter((t) => {
      const today = new Date().toDateString();
      return new Date(t.createdAt).toDateString() === today;
    }).length;
    return { total, completed, active, todayTasks };
  }

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        categories: state.categories,
        filter: state.filter,
        filteredTodos: getFilteredTodos(),
        stats: getStats(),
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
