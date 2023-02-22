import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {colors, icons} from '../Constants';

const CustomTimeButtons = props => {
  const {
    styleContainer,
    styleButtonLeft,
    styleButtonRight,
    title,
    leftLabel,
    rightLabel,
    valueLeft,
    valueRight,
    onPressLeft,
    onPressRightt,
  } = props;
  return (
    <View style={styleContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.label}>{title}</Text>
        <Text style={{color: 'red', fontSize: 14}}> *</Text>
      </View>
      <View style={[styles.viewRow, {marginTop: 5}]}>
        {leftLabel && (
          <TouchableOpacity
            style={[styles.viewButton, styleButtonLeft]}
            onPress={onPressLeft}>
            <Text style={styles.label}>{leftLabel}</Text>
            <Text style={styles.time}>{`${valueLeft}`}</Text>
          </TouchableOpacity>
        )}
        {rightLabel && (
          <TouchableOpacity
            style={[styles.viewButton, styleButtonRight]}
            onPress={onPressRightt}>
            <Text style={styles.label}>{rightLabel}</Text>
            <Text style={styles.time}>{`${valueRight}`}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {fontSize: 15, color: 'black', fontWeight: '500'},
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: colors.mainColor,
    paddingHorizontal: 5,
  },
  time: {
    backgroundColor: '#ebedee',
    borderRadius: 5,
    color: 'black',
    fontSize: 14,
  },
});
export default CustomTimeButtons;
