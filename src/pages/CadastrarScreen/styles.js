import { StyleSheet } from 'react-native';
import { colors } from '../../commons';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.mainColor,
    padding: 10,
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
