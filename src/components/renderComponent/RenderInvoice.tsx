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
import ButtonComponent from '../commonComponent/ButtonComponent';
import { BreakLine } from '../commonComponent/lineComponent'; 

const RenderInvoice = (props:any) => {
  const {
    totalFee,
    name,
    createTime,
    contractOwner,
    status,
    onPress,
    widthSlide,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.viewAroundBill, {width: widthSlide}]}>
      <View style={{}}>
        <View style={styles.viewRowBetween}>
          <Text numberOfLines={1} style={styles.name}>
            {name}
          </Text>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text numberOfLines={1} style={styles.textTotalFee}>
                {totalFee}
              </Text>
              <Text numberOfLines={1} style={{fontSize: 12, color: 'white'}}>
                {' VNĐ'}
              </Text>
              <Image source={icons.ic_next} style={styles.iconNext} />
            </View>
          </View>
        </View>
        {BreakLine()}
      </View>
      <View style={[styles.viewRowBetween, {flex: 1}]}>
        <View>
          <Text style={{color: 'white', fontSize: 9}}>Người gửi</Text>
          <Text style={{color: 'white', fontSize: 11, fontWeight: '600'}}>
            {contractOwner}
          </Text>
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 9}}>Thời gian</Text>
          <Text style={{color: 'white', fontSize: 11, fontWeight: '600'}}>
            {createTime}
          </Text>
        </View>
        <ButtonComponent
          disabled={true}
          styleLabel={styles.styleLabel}
          styleButton={styles.styleButton}
          label={
            status == 0
              ? 'Chưa chốt'
              : status == 1
              ? 'Chưa thanh toán'
              : status == 2
              ? 'Đã thanh toán'
              : ''
          }
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  viewAroundBill: {
    height: 130,
    marginBottom: 15,
    backgroundColor: colors.mainColor,
    borderRadius: 8,
    padding: 8,
  },
  name: {color: 'white', fontWeight: '600', fontSize: 12, maxWidth: '50%'},
  viewRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconNext: {
    width: 16,
    height: 16,
    marginLeft: 10,
    tintColor: 'white',
  },
  textTotalFee: {
    fontWeight: '600',
    color: 'white',
    lineHeight: 20,
    fontSize: 14,
  },
  styleLabel: {
    color: 'red',
    fontSize: 9,
    fontWeight: '600',
    margin: 5,
  },
  styleButton: {backgroundColor: 'white', borderRadius: 4},
});
export default RenderInvoice;
