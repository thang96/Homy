import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';

const ButtonComponent = (props:any) => {
  const {
    styleButton,
    icon,
    styleIcon,
    label,
    styleLabel,
    onPress,
    disabled,
    svg,
    widthSvg,
    heightSvg,
  } = props;
  const IconSvg = svg;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styleButton, styles.button]}
      onPress={onPress}>
      {svg && <IconSvg width={widthSvg} height={heightSvg} />}
      {icon && <Image source={icon} style={styleIcon} resizeMode={'contain'} />}
      {label && <Text style={styleLabel}>{label}</Text>}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {justifyContent: 'center', alignItems: 'center'},
});
export default ButtonComponent;
