import { createStackNavigator, createAppContainer } from 'react-navigation';
import NotificacoesScreen from './NotificacoesScreen';

const Navigator = createStackNavigator(
  {
    Main: NotificacoesScreen
  }
)

export default createAppContainer(Navigator);