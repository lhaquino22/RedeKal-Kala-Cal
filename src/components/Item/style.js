import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    marginHorizontal: 10
  },
})