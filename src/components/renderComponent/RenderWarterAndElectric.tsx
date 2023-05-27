import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {colors, icons} from '../../constants';

const RenderWarterAndElectric = (props:any) => {
  const {onPress, widthSlide, name, place, status} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.viewAroundBill, styles.viewShadow, {width: widthSlide}]}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.viewBetween}>
        <View style={[styles.viewRow, {flex: 1}]}>
          <Image source={icons.ic_home} style={styles.icon} />
          <View style={{flex: 1}}>
            <Text numberOfLines={1} style={styles.label}>
              {place}
            </Text>
          </View>
        </View>
        <View style={styles.viewStatus}>
          <Text style={styles.labelStatus}>
            {status == 0 ? 'Chưa chốt' : 'Đã chốt'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  viewAroundBill: {
    marginBottom: 15,
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'white',
  },
  viewShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 1,
  },
  icon: {width: 20, height: 20, tintColor: colors.mainColor, marginRight: 5},
  title: {color: '#000000', fontSize: 15, fontWeight: '600'},
  label: {color: 'rgba(55, 64, 71, 1)', fontSize: 15},
  viewBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  viewStatus: {backgroundColor: '#FE7A37', borderRadius: 4},
  labelStatus: {fontSize: 12, color: 'white', marginHorizontal: 5},
});
export default RenderWarterAndElectric;
