import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import TabIcone from '../components/TabIcone';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MenuNavigator from './MenuNavigator';
import NotificacoesNavigator from './NotificacoesNavigator';
import ContaNavigator from './ContaNavigator';
import HomeButton from './HomeButton';
import TabButtons from './TabButtons';

const MainNavigator = createBottomTabNavigator(
  {
    Menu: {
      screen: MenuNavigator,
      navigationOptions: () => ({
        tabBarIcon: <HomeButton />
      })
    },
    Notificacoes: NotificacoesNavigator,
    Conta: ContaNavigator,
    Sobre: ContaNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = MaterialCommunityIcons;
        let iconName;
        
        if (routeName === 'Notificacoes') {
          iconName = focused ? 'bell' : 'bell-outline';
        } else if (routeName === "Conta") {
          iconName = focused ? 'account' : 'account-outline';
        }
        else {
          iconName = focused ? 'help-circle' : 'help-circle-outline';
        }

        return <IconComponent name={iconName} size={32} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#00a196',
      inactiveTintColor: 'gray',
      showLabel: false,
      style: {
        height: 70,
        backgroundColor: 'ghostwhite'
      }
    }
  }
);

export default createAppContainer(MainNavigator);