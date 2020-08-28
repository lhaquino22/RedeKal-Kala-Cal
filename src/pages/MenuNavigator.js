import { createStackNavigator, createAppContainer } from 'react-navigation';
import MenuScreen from './MenuScreen';
import CasoScreen from './CasoScreen';
import GeorrefNavigator from './GeorrefNavigator';
import PontosCuiadoScreen from './PontosCuiadoScreen';
import LeishmanioseScreen from './LeishmanioseScreen';
import PlanoEnfrentamentoScreen from './PlanoEnfrentamentoScreen';
import ConteudoScreen from './ConteudoScreen';
import CadastrarReferenciaScreen from './CadastrarReferenciaScreen';

const Navigator = createStackNavigator({
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
      },
    },
  },
  Caso: CasoScreen,
  PontosCuidado: PontosCuiadoScreen,
  Leishmaniose: LeishmanioseScreen,
  PlanoEnfrentamento: PlanoEnfrentamentoScreen,
  Conteudo: ConteudoScreen,
  CadastrarReferencia: CadastrarReferenciaScreen,
});

export default createAppContainer(Navigator);
