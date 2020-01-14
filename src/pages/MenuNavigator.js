import { createStackNavigator, createAppContainer } from 'react-navigation';
import MenuScreen from './MenuScreen';
import CasoScreen from './CasoScreen';
import GeorrefNavigator from './GeorrefNavigator';
import PontosCuiadoScreen from './PontosCuiadoScreen';

const Navigator = createStackNavigator(
  {
    Main: MenuScreen,
    Georreferenciamento: {
      screen: GeorrefNavigator,
      navigationOptions: {
        title: 'Ocorrência dos Casos',
        headerStyle: {
          backgroundColor: '#00A198',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }
    },
    Caso: CasoScreen,
    PontosCuidado: PontosCuiadoScreen
  }
)

export default createAppContainer(Navigator);