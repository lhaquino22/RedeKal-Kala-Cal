import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './HomeScreen';
import LishmanioseVisceralScreen from './LeishmanioseVisceralScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Leishmaniose: {screen: LishmanioseVisceralScreen},
},
);

const App = createAppContainer(MainNavigator);

export default App;