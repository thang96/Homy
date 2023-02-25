import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CustomTextInput from './CustomTextInput';
import CustomButton from './CustomButton';
import {icons, colors} from '../Constants';

const CustomSearchAppBar = props => {
  const {
    iconLeft,
    label,
    iconRight,
    iconSecondRight,
    pressIconLeft,
    pressIconRight,
    pressSeccodIconRight,
    keyboard,
    textSearch,
    value,
    placeholder,
    onChangeText,
    onPress,
  } = props;
  return (
    <View
      style={{
        height: 134,
        backgroundColor: colors.mainColor,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      }}>
      <View style={styles.styleAppBar}>
        {iconLeft && (
          <CustomButton
            styleButton={styles.styleButton}
            icon={iconLeft}
            styleIcon={styles.icon}
            onPress={pressIconLeft}
          />
        )}
        {label && <Text style={styles.label}>{label}</Text>}
        {iconRight && (
          <CustomButton
            styleButton={styles.styleButton}
            icon={iconRight}
            styleIcon={styles.icon}
            onPress={pressIconRight}
          />
        )}
        {iconSecondRight && (
          <CustomButton
            styleButton={styles.styleButton}
            icon={iconSecondRight}
            styleIcon={styles.icon}
            onPress={pressSeccodIconRight}
          />
        )}
      </View>
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
  icon: {width: 24, height: 24, tintColor: 'white'},
  label: {
    color: 'white',
    marginLeft: 8,
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
  },
  styleButton: {width: 25, height: 56, marginHorizontal: 10},
});
const stylesAppBar = StyleSheet.create({
  viewContainer: {
    height: 76,
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
  viewInput: {
    backgroundColor: 'white',
    height: 48,
    flex: 1,
    borderRadius: 10,
    width: 298,
  },
  styleButton: {
    height: 48,
    width: 48,
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
