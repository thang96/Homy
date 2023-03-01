import React from 'react';
import {Text, StyleSheet} from 'react-native';

const CustomSuggest = props => {
  const {label, styleSuggest} = props;
  return <Text style={[styles.label, styleSuggest]}>{label}</Text>;
};
const styles = StyleSheet.create({
  label: {fontSize: 13, color: '#7F8A93'},
});
export default CustomSuggest;
