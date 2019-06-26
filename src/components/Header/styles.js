import { StyleSheet } from 'react-native';

HEADER_MAX_HEIGHT = 120;

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MAX_HEIGHT,
    justifyContent: 'flex-end',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray'
  },
  itemsContainer: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  textContainer: {
    marginLeft: 5
  },
  title: {
    fontSize: 30, 
    fontWeight: 'bold', 
    color: 'forestgreen'
  },
  subTitle: {
    fontSize: 15, 
    fontWeight: 'normal'
  },
  image: {
    width: 45,
    height: 50
  }
});