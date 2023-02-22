import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {icons} from '../Constants';
import CustomButton from './CustomButton';

const CustomChecker = props => {
  const widthImage = Dimensions.get('window').width / 2 - 15;
  const {icon, label, value, isCheck, onPress} = props;

  return (
    <View style={[styles.container, {width: widthImage}]}>
      <Image style={[styles.icon]} resizeMode={'contain'} source={icon} />
      <View style={{marginLeft: 5}}>
        <Text style={[styles.text, {color: 'black'}]}>{label}</Text>
        <Text style={[styles.text, {color: 'purple'}]}>{value}</Text>
      </View>
      <View style={styles.styleButton}>
        {isCheck ? (
          <CustomButton
            icon={icons.ic_check}
            styleIcon={styles.styleIcon}
            onPress={onPress}
            styleButton={styles.styleButton}
          />
        ) : (
          <CustomButton
            icon={icons.ic_unCheck}
            styleIcon={styles.styleIcon}
            onPress={onPress}
            styleButton={styles.styleButton}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    elevation: 1,
    zIndex: 1,
    padding: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
    margin: 2.5,
  },
  icon: {width: 20, height: 20},
  styleIcon: {width: 15, height: 15},
  styleButton: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  text: {fontSize: 12},
});
export default CustomChecker;
