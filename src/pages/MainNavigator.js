import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import TabIcone from '../components/TabIcone';
import { Ionicons } from '@expo/vector-icons';
import MenuNavigator from './MenuNavigator';
import NotificacoesNavigator from './NotificacoesNavigator';
import ContaNavigator from './ContaNavigator';
import HomeButton from './HomeButton';
import SobreNavigator from './SobreNavigator';

const MainNavigator = createBottomTabNavigator(
  {
    Menu: MenuNavigator,
    Notificacoes: NotificacoesNavigator,
    Conta: ContaNavigator,
    Sobre: SobreNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;

        if (routeName === "Menu")
          iconName = 'ios-home'
        else if (routeName === 'Notificacoes')
          iconName = 'ios-notifications';
        else if (routeName === "Conta")
          iconName = 'ios-person';
        else
          iconName = 'ios-information-circle';

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#ff6633',
      inactiveTintColor: 'lightgray',
      showLabel: false,
    }
  }
);

export default createAppContainer(MainNavigator);