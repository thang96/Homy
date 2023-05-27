import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, icons} from '../../constants';
import ButtonComponent from '../commonComponent/ButtonComponent';
import {convertDate} from '../../utils/common';

const ContractLiquidated = (props:any) => {
  const {data, onPress} = props;

  const renderContract = (item:any, index:number) => {
    return (
      <TouchableOpacity
        onPress={() => onPress(item?.id)}
        style={styles.viewShadow}>
        <View style={[styles.viewRow, {justifyContent: 'space-between'}]}>
          <Text style={{color: '#5F6E78', fontWeight: '600', lineHeight: 18}}>
            {''}
          </Text>
          <ButtonComponent
            label={'Thanh lý'}
            styleLabel={{fontSize: 12, color: 'white', lineHeight: 16}}
            disabled={true}
            styleButton={styles.viewStatus}
          />
        </View>
        <View style={styles.viewRow}>
          <Image source={icons.ic_calendar} style={{width: 20, height: 20}} />
          <Text style={{color: '#374047', fontSize: 13, marginLeft: 5}}>
            {`Từ ${convertDate(item?.startDate)} đến ${convertDate(
              item?.endDate,
            )}`}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Image source={icons.ic_home} style={{width: 20, height: 20}} />
          <Text style={{color: '#374047', fontSize: 13, marginLeft: 5}}>
            {`${item?.unit?.house?.name} - ${item?.unit?.name}`}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={{color: '#374047', fontSize: 14, marginRight: 5}}>
            Người tạo:
          </Text>
          <Text style={{color: '#374047', fontSize: 14, fontWeight: '600'}}>
            {item?.contractOwner?.fullName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        // listKey="ContractLiquidated"
        data={data}
        keyExtractor={key => key?.id}
        renderItem={({item, index}) => renderContract(item, index)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  viewShadow: {
    height: 150,
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    margin: 5,
    padding: 10,
    borderTopWidth: 3,
    borderTopColor: colors.backgroundButton,
  },
  viewStatus: {
    height: 30,
    width: 100,
    backgroundColor: colors.backgroundButton,
    borderRadius: 5,
  },
});
export default ContractLiquidated;
