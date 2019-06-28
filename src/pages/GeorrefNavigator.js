import React from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GeorrefScreen from './GeorrefScreen';

const GeorrefNavigator = createMaterialTopTabNavigator(
  {
    Casos: GeorrefScreen,
    Cadastro: GeorrefScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = MaterialCommunityIcons;
        let iconName;

        if (routeName === 'Casos') {
          iconName = focused ? 'map-marker' : 'map-marker-outline';
        } else if (routeName === 'Cadastro') {
          iconName = focused ? 'account-plus' : 'account-plus-outline';
        }

        return <IconComponent name={iconName} size={25} color='black' />;
      },
    }),
    tabBarOptions: {
      style: {
        backgroundColor: 'white'
      },
      indicatorStyle: {
        backgroundColor: 'black'
      },
      showIcon: true,
      showLabel: false,
    }
  }
);

export default createAppContainer(GeorrefNavigator);