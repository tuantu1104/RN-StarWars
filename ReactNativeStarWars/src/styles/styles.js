import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 10
  },
  center: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  error: {
    fontSize: 20,
    color: 'red'
  },
  cell: {
    backgroundColor: '#333',
    borderRadius: 5,
    marginVertical: 5,
    padding: 10
  },
  text: {
    color: '#eee',
  },
  header: { 
    marginTop: 15, 
    marginBottom: 8,
    fontSize: 22,
    fontWeight: '600'
  },
  title: {
    fontSize: 22,
    fontWeight: '600'
  },
  date: {
    fontSize: 14,
  },
  scroll: {
    fontSize: 18,
    marginTop: 5
  }
});