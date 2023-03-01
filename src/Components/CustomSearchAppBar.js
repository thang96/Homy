import React from 'react';
import {View, StyleSheet, Text, Image, TextInput} from 'react-native';
import CustomTextInput from './CustomTextInput';
import CustomButton from './CustomButton';
import {icons, colors, fonts} from '../Constants';

const CustomSearchAppBar = props => {
  const {label} = props;
  return (
    <View
      style={{
        height: 134,
        paddingHorizontal: 10,
      }}>
      <View style={styles.styleAppBar}>
        <CustomButton icon={icons.ic_back} styleIcon={styles.icon} />
        <Text style={styles.label}>{label}</Text>
        <CustomButton icon={icons.ic_bell} styleIcon={[styles.icon]} />
      </View>
      <View style={styles.viewLine} />
      <View style={[styles.viewRow, {marginTop: 10}]}>
        <View style={[styles.viewRow, styles.viewSearch]}>
          <Image
            source={icons.ic_search}
            style={[styles.icon, {tintColor: colors.mainColor}]}
          />
          <TextInput placeholder="Tìm kiếm..." style={{flex: 1}} />
        </View>
        <CustomButton
          styleButton={{
            width: 48,
            height: 48,
            marginLeft: 10,
            backgroundColor: colors.mainColor,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  styleAppBar: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {width: 24, height: 24, tintColor: '#374047'},
  label: {
    color: '#374047',
    marginLeft: 8,
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
  },
  viewLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: 56,
    alignSelf: 'center',
  },
  viewRow: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewSearch: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
export default CustomSearchAppBar;
