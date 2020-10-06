import { StyleSheet } from 'react-native';
import { colors } from '../../commons';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    padding: 10,
    paddingBottom: 0,
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
  },
  infoContainer2: {
    flex: 1,
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  property: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  description: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 14,
    color: '#6C6C80',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    backgroundColor: '#ebebeb',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryColor,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});