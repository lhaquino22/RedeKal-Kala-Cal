import React from 'react';
import { Text } from 'react-native';
import { colors, sizes } from '../../commons';

function pText({ style, children, ...rest }) {

  const textStyle = {  color: colors.defaultTextColor, fontSize: sizes.defaultTextSize };

  return (
    <Text
      style={[textStyle, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export default pText;