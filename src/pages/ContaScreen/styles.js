import { StyleSheet } from 'react-native';
import {colors} from '../../commons';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
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
    fontWeight: 'bold'
  }
})