import { createStackNavigator, createAppContainer } from 'react-navigation';
import MenuScreen from './MenuScreen';
import GeorrefNavigator from './GeorrefNavigator';

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
    }
  }
)

export default createAppContainer(Navigator);