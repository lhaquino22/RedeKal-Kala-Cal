import { createStackNavigator, createAppContainer } from 'react-navigation';
import MenuScreen from './MenuScreen';
import GeorrefNavigator from './GeorrefNavigator';

const Navigator = createStackNavigator(
  {
    Main: MenuScreen,
    Georreferenciamento: {
      screen: GeorrefNavigator,
      navigationOptions: {
        title: 'Casos de Ocorrência'
      }
    }
  }
)

export default createAppContainer(Navigator);