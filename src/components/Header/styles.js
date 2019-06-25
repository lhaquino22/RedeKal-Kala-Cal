import { StyleSheet } from 'react-native';

HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 70;

export default StyleSheet.create({
  headerContainer: {
    position: 'relative',
    height: HEADER_MAX_HEIGHT,
    justifyContent: 'flex-end',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray'
  },
  headerItemsContainer: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  headerTextContainer: {
    marginLeft: 5
  },
  headerTitle: {
    fontSize: 30, 
    fontWeight: 'bold', 
    color: 'forestgreen'
  },
  headerSubTitle: {
    fontSize: 15, 
    fontWeight: 'normal'
  },
  headerImage: {
    width: 45,
    height: 50
  }

});