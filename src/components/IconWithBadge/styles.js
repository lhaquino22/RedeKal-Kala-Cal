import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 2
  },
  badgeContainer: {
    position: 'absolute',
    right: -3,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    color: 'white', 
    fontSize: 8, 
    fontWeight: 'bold'
  }
});