import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  logo: {
    width: 200, 
    height: 200, 
    resizeMode: 'contain'
  },
  buttons: {
    width: 200, 
    height: 30, 
    resizeMode: 'contain'
  },
  buttonsContainer: {
    marginTop: 20
  },
  inputContainer: {
    width: 300
  },
  textInput: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: 300,
    height: 30,
    alignSelf: 'stretch',
    color: 'white',
    fontSize: 16
  },
  image: {
    width: '100%',
    height: '100%'
  }
})