import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors, icons} from '../Constants';
import CustomButton from './CustomButton';

const CustomFreeService = props => {
  const widthImage = Dimensions.get('window').width / 2 - 15;
  const {label, value, onPress} = props;
  return (
    <View style={[styles.container, {width: widthImage}]}>
      <Text style={[styles.text]}>{label}</Text>
      <CustomButton
        icon={icons.ic_close}
        styleIcon={styles.styleIcon}
        styleButton={styles.styleButton}
        onPress={onPress}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: colors.mainColor,
    elevation: 1,
    zIndex: 1,
    padding: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
    margin: 2.5,
  },
  styleIcon: {width: 15, height: 15, tintColor: 'white'},
  styleButton: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  text: {fontSize: 12, color: 'white'},
});
export default CustomFreeService;
