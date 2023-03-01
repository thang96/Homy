import React from 'react';
import {Text} from 'react-native';

const CustomTitle = props => {
  const {label, color} = props;
  return (
    <Text
      style={{
        fontSize: 17,
        fontWeight: '600',
        color: color ? color : '#374047',
      }}>
      {label}
    </Text>
  );
};
export default CustomTitle;
