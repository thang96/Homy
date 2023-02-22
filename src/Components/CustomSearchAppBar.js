import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomTextInput from './CustomTextInput';
import CustomButton from './CustomButton';
import {icons, colors} from '../Constants';

const CustomSearchAppBar = props => {
  const {keyboard, textSearch, value, placeholder, onChangeText, onPress} =
    props;
  return (
    <View style={stylesAppBar.viewContainer}>
      <View style={stylesAppBar.viewSearch}>
        <CustomTextInput
          styleViewTextInput={stylesAppBar.viewInput}
          placeholder={placeholder}
          iconLeft={
            textSearch == '' && keyboard == false ? icons.ic_search : null
          }
          styleIconLeft={stylesAppBar.styleIconLeft}
          value={value}
          onChangeText={onChangeText}
        />
        <CustomButton
          styleButton={stylesAppBar.styleButton}
          styleIcon={stylesAppBar.styleIcon}
          icon={icons.ic_option}
          onPress={onPress}
        />
      </View>
    </View>
  );
};
const stylesAppBar = StyleSheet.create({
  viewContainer: {
    backgroundColor: colors.mainColor,
    height: 64,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  viewSearch: {
    height: 64,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderTopWidth: 0.5,
    borderTopColor: 'white',
    alignItems: 'center',
  },
  viewInput: {backgroundColor: 'white', height: 50, flex: 1, borderRadius: 10},
  styleButton: {
    height: 50,
    width: 50,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  styleIcon: {height: 40, width: 40, tintColor: 'white'},
  styleIconLeft: {
    width: 25,
    height: 25,
    tintColor: colors.mainColor,
    marginLeft: 10,
  },
});
export default CustomSearchAppBar;
