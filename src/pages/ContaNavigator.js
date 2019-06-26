import { createStackNavigator, createAppContainer } from 'react-navigation';
import ContaScreen from './ContaScreen';

const Navigator = createStackNavigator(
  {
    Main: ContaScreen
  }
)

export default createAppContainer(Navigator);