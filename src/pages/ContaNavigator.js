import { createStackNavigator, createAppContainer } from 'react-navigation';
import ContaScreen from './ContaScreen';
import EntrarScreen from './EntrarScreen'
import CadastrarScreen from './CadastrarScreen'

const Navigator = createStackNavigator(
  {
    Main: ContaScreen,
    CadastrarScreen: {
      screen: CadastrarScreen,
      navigationOptions: {
        title: 'Cadastrar'
      }
    },
    EntrarScreen: {
      screen: EntrarScreen,
      navigationOptions: {
        title: 'Entrar'
      }
    },
  }
)

export default createAppContainer(Navigator);