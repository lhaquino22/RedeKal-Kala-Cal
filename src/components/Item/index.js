import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import Text from '../../components/Text';
import defaultStyle from './style';
import { colors } from '../../commons'; 


function Item({
  item,
  icon = 'folder-open-outline',
  iconColor = colors.mainColor,
  onNavigate,
  showIcon = true,
  style,
}) {
  function onPress() {
    onNavigate({
      nextScreen: 'Conteudo',
      dados: item.content,
      title: item.title,
    });
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[defaultStyle.container, style]}
    >
      <View style={defaultStyle.info}>
        {showIcon && <Icon name={icon} color={iconColor} size={25} />}
        <Text numberOfLines={2} ellipsizeMode="tail" style={defaultStyle.title}>
          {item.title}
        </Text>
      </View>
      <Icon name="ios-arrow-round-forward" color="lightgray" size={25} />
    </TouchableOpacity>
  );
}

export default Item;
