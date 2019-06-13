import {createStackNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
});

const App = createAppContainer(MainNavigator);

export default App;