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
    marginBottom: 0,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  item: {
    flexDirection: "row",
    justifyContent: 'center',
  },
  itemInfo: {
    flex: 1,
    borderBottomColor: "#ebebeb",
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemIcon: {
    justifyContent: 'center',
    padding: 10
  },
  itemText1: {
    color: "#90a4ae",
    fontSize: 12,
  },
  itemText2: {
    color: "black",
    fontSize: 13,
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
    fontWeight: 'bold'
  },
  info: {
    flex: 1,
  },
  icon: {
    width: '100%',
    height: '100%',
  }
})