import { createStackNavigator, createAppContainer } from 'react-navigation';
import TesteScreen from '../TesteScreen/index';

const Navigator = createStackNavigator(
  {
    Main: TesteScreen
  }
)

export default createAppContainer(Navigator);