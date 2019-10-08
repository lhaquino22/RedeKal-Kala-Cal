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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'lightgray',
    borderRadius: 2,
    padding: 10
  },
  titulo: {
    flexDirection: 'column',
    marginLeft: 10
  },
  tituloTexto: {
    fontSize: 20
  },
  subtitulo: {
    color: 'lightgray'
  },
  input: {
    fontSize: 20,
    padding: 5,
    marginBottom: 10,
    justifyContent: 'center',
    textAlign: 'center'
  }
})