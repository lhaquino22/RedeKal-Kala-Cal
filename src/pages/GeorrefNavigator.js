import React from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GeorrefScreen from './GeorrefScreen';
import CasosScreen from './CasosScreen';

const GeorrefNavigator = createMaterialTopTabNavigator(
  {
    Lista: CasosScreen,
    Casos: GeorrefScreen
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
        } else {
          iconName = focused ? 'account-search' : 'account-search-outline';
        }

        return <IconComponent name={iconName} size={25} color="#00A198" />;
      },
    }),
    tabBarOptions: {
      style: {
        backgroundColor: 'white'
      },
      indicatorStyle: {
        backgroundColor: "#00A198"
      },
      showIcon: true,
      showLabel: false,
    }
  }
);

export default createAppContainer(GeorrefNavigator);