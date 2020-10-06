import { StyleSheet } from 'react-native';
import { colors} from '../../commons';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#ebebeb",
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    padding: 10,
    marginBottom: 0,
    backgroundColor: "#fff",
    borderRadius: 4
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.secondaryColor,
    padding: 10,
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 13
  },
  tituloSecaoContainer: {
    textAlign: 'center',
    marginBottom: 5
  },
  tituloSecao: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 15,
    fontWeight: 'bold'
  }
})