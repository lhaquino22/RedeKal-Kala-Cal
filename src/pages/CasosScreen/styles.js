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
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
    borderRadius: 2,
    paddingVertical: 10,
    justifyContent: 'space-between'
  },
  item_info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titulo: {
    flexDirection: 'column',
    marginLeft: 10
  },
  tituloTexto: {
    fontSize: 16
  },
  subtitulo: {
    color: 'lightgray'
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginRight: 5, 
    padding: 6,
    borderRadius: 5, 
    justifyContent: 'center',
    backgroundColor: '#e3e3e3'
  }
})