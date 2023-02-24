import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {colors, icons} from '../Constants';

const CustomViewInfor = props => {
  const widthView = Dimensions.get('window').width / 2 - 15;
  const {styleView, title, label, content} = props;
  return (
    <View style={[styles.container, {width: widthView}, styleView]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.viewRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.mainColor,
    height: 60,
    borderRadius: 5,
    padding: 10,
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {color: 'grey', fontSize: 14},
  label: {fontSize: 15, fontWeight: 'bold', color: 'black'},
  content: {fontSize: 15, color: 'black'},
});
export default CustomViewInfor;
