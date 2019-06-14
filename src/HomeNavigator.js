import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './HomeScreen';
import LishmanioseVisceralScreen from './LeishmanioseVisceral/LeishmanioseVisceralScreen';
import DescricaoScreen from './LeishmanioseVisceral/DescricaoScreen';
import LinhaDeCuidadoScreen from './LinhaDeCuidado/LinhaDeCuidadoScreen';
import VigilanciaEmSaudeScreen from './LinhaDeCuidado/VigilanciaEmSaudeScreen';
import GeorreferenciamentoScreen from './Georreferenciamento/GeorreferenciamentoScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Leishmaniose: {screen: LishmanioseVisceralScreen},
  Descricao: {screen: DescricaoScreen},
  LinhaDeCuidado: {screen: LinhaDeCuidadoScreen},
  VigilanciaEmSaude: {screen: VigilanciaEmSaudeScreen},
  Georreferenciamento: {screen: GeorreferenciamentoScreen}
});

const App = createAppContainer(MainNavigator);

export default App;