import { createStackNavigator, createAppContainer } from 'react-navigation';
import SobreScreen from './SobreScreen';

const Navigator = createStackNavigator(
  {
    Main: SobreScreen
  }
)

export default createAppContainer(Navigator);