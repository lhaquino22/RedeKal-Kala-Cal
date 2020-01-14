import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#ebebeb",
    padding: 10,
    paddingBottom: 0,
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 4
  },
  info: {
    flex: 1
  },
  tituloHospital: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  icone: {
    marginRight: 10
  },
  cuidados: {
    flexDirection: 'row',
    marginTop: 5
  },
  cuidado: {
    backgroundColor: 'mediumseagreen',
    padding: 5,
    borderRadius: 10,
    marginRight: 5
  },
  textoCuiado: {
    fontWeight: 'bold',
    color: 'white'
  }
})