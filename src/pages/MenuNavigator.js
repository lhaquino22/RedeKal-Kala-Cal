import { createStackNavigator, createAppContainer } from 'react-navigation';
import MenuScreen from './MenuScreen';
import CasoScreen from './CasoScreen';
import GeorrefNavigator from './GeorrefNavigator';
import PontosCuiadoScreen from './PontosCuiadoScreen';
import LeishmanioseScreen from './LeishmanioseScreen';
import PlanoEnfrentamentoScreen from './PlanoEnfrentamentoScreen';
import ConteudoScreen from './ConteudoScreen';
import CadastrarReferenciaScreen from './CadastrarReferenciaScreen';
import RefCRefScreen from './RefCRefScreen';
import ReferenciaInfoScreen from './ReferenciaInfoScreen';
import {colors} from '../commons';

const Navigator = createStackNavigator({
  Main: MenuScreen,
  Georreferenciamento: {
    screen: GeorrefNavigator,
    navigationOptions: {
      title: 'Mapeamento dos Casos',
      headerStyle: {
        backgroundColor: colors.mainColor,
      },
      headerTintColor: '#fff',
    },
  },
  Caso: CasoScreen,
  PontosCuidado: PontosCuiadoScreen,
  Leishmaniose: LeishmanioseScreen,
  PlanoEnfrentamento: PlanoEnfrentamentoScreen,
  Conteudo: ConteudoScreen,
  CadastrarReferencia: CadastrarReferenciaScreen,
  ReferenciaContraReferencia: RefCRefScreen,
  ReferenciaInfomacoesScreen: ReferenciaInfoScreen,
});

export default createAppContainer(Navigator);
