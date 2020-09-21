import { StyleSheet } from 'react-native';
import { colors } from '../../commons';
export default StyleSheet.create({
  KeyboardAvoidingViewStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
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
  textInput: {
    fontSize: 14,
    color: 'gray',
    borderBottomColor: colors.mainColor,
    borderBottomWidth: 1,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#00A198',
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
