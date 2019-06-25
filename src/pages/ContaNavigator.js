import { createStackNavigator, createAppContainer } from 'react-navigation';
import MenuScreen from './MenuScreen';

const Navigator = createStackNavigator(
  {
    Main: MenuScreen
  }
)

export default createAppContainer(Navigator);