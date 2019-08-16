import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import TabIcone from '../components/TabIcone';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MenuNavigator from './MenuNavigator';
import NotificacoesNavigator from './NotificacoesNavigator';
import ContaNavigator from './ContaNavigator';

const MainNavigator = createBottomTabNavigator(
  {
    Menu: MenuNavigator,
    Notificacoes: NotificacoesNavigator,
    Conta: ContaNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = MaterialCommunityIcons;
        let iconName;

        if (routeName === 'Menu') {
          iconName = focused ? 'home' : 'home-outline';
          IconComponent = TabIcone;
        } else if (routeName === 'Notificacoes') {
          iconName = focused ? 'bell' : 'bell-outline';
        } else {
          iconName = focused ? 'account' : 'account-outline';
        }

        return <IconComponent name={iconName} size={32} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'black',
      showLabel: false,
    }
  }
);

export default createAppContainer(MainNavigator);