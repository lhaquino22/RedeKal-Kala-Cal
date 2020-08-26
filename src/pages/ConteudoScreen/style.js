import { StyleSheet } from 'react-native';
import { colors } from '../../commons';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultBackgroundColor,
    paddingHorizontal: 20,
  },
  content: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  secao: {
    marginTop: 20,
  },
  secaoTitle: {
    marginBottom: 15,
    marginLeft: 20,
  },
  searchBar: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#6C6C80',
    letterSpacing: 0.5,
  },
  extraInfo: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  extraTitle: {
    color: '#6C6C80',
  },
  extraDescription: {
    backgroundColor: '#00A198',
    borderRadius: 5,
    padding: 16,
    maxWidth: 140,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraDescriptionText: {
    color: '#fff',
  },
});
