import { StyleSheet } from 'react-native';

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
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginRight: 5,
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#e3e3e3'
  },
  casoContainer: {
    flex: 1,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
  },
  casoSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textoContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  texto: {
    flex: 1,
    fontSize: 18,
    flexWrap: 'wrap',
    marginLeft: 10
  },
  subtitulo: {
    flex: 1,
    fontSize: 12,
    flexWrap: 'wrap',
    marginLeft: 10
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  icone: {
    marginLeft: 5
  }
})