import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors, icons} from '../Constants';
import CustomButton from './CustomButton';

const CustomManagerInfor = props => {
  const {styleView, avatar, userName, phoneNumber, onPress} = props;
  return (
    <View style={[styles.container, styleView]}>
      <Image
        style={styles.avatar}
        source={avatar ? {uri: avatar} : icons.ic_user}
      />
      <View style={{marginLeft: 10}}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </View>
      <CustomButton
        icon={icons.ic_moreOption}
        styleIcon={{width: 30, height: 30}}
        styleButton={styles.styleButton}
        onPress={onPress}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 80,
    elevation: 1,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#ebedee',
  },
  styleButton: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  userName: {color: 'black'},
  phoneNumber: {color: 'blue'},
});
export default CustomManagerInfor;
