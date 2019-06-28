import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20    
  },
  header: {
    fontSize: 24,
    color: '#35424A',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#A2CBC3'
  },
  textInput: {
    alignSelf: 'stretch',
    height:40,
    marginBottom: 30,
    color: 'black',
    borderBottomColor: '#A2CBC3',
    borderBottomWidth: 1,
  },
  buttom: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#A2CBC3',
    margin: 30,
  },
})