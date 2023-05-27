import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {icons, images} from '../../constants';
import {convertDate} from '../../utils/common';
const RenderContract = (props:any) => {
  const {
    startDate,
    endDate,
    houseName,
    unitName,
    address,
    onPress,
    widthSlide,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.renderViewContract, {width: widthSlide}]}>
      <Image
        source={images.im_backgroundRoom}
        style={[styles.imageContract, {width: widthSlide}]}
        resizeMode={'cover'}
      />

      <View style={styles.viewRowContract}>
        <View />
        <View style={[styles.viewBackgroundContract, styles.viewRow]}>
          <Text style={{fontSize: 11, color: '#374047'}}>{`Từ ${convertDate(
            startDate,
          )} đến ${convertDate(endDate)}`}</Text>
        </View>
      </View>

      <View style={{minHeight: 62, padding: 10}}>
        <View style={styles.viewAddressContract}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={icons.ic_home} style={styles.iconContract} />
            <Text style={{fontSize: 13, fontWeight: '600', color: '#374047'}}>
              {`${houseName} - ${unitName}`}
            </Text>
          </View>
          <Text numberOfLines={2} style={{fontSize: 11, color: '#374047'}}>
            {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  renderViewContract: {
    overflow: 'hidden',
    height: 150,
    alignSelf: 'center',
    borderRadius: 10,
  },
  imageContract: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignSelf: 'center',
  },
  viewRowContract: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  viewBackgroundContract: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 5,
  },
  viewAddressContract: {
    minHeight: 62,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
  },
  iconContract: {
    width: 20,
    height: 20,
    tintColor: '#374047',
    marginRight: 5,
  },
  viewRow: {flexDirection: 'row'},
});
export default RenderContract;
