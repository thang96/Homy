import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import CustomAppBar from '../../../Components/CustomAppBar';
import CustomButton from '../../../Components/CustomButton';
import CustomStepAppBar from '../../../Components/CustomStepAppBar';
import CustomTwoButtonBottom from '../../../Components/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import CustomPaidService from '../../../Components/CustomPaidService';
import CustomFreeService from '../../../Components/CustomFreeService';

const AddBuildingsStep3 = props => {
  const navigation = useNavigation();
  const [listPaidSevice, setListPaidSevice] = useState([
    {label: 'Điện', value: '4000/KWH'},
    {label: 'Nước', value: '5000/M³'},
    {label: 'Wifi', value: '50000/T'},
    {label: 'Ga', value: '200000/T'},
    {label: 'Ga1', value: '200000/T'},
    {label: 'Ga2', value: '200000/T'},
    {label: 'Ga3', value: '200000/T'},
  ]);
  const [listFreeSevice, setListFreeSevice] = useState([
    {label: 'Máy lạnh', value: '1'},
    {label: 'WC riêng', value: '2'},
    {label: 'Chỗ để xe', value: '3'},
    {label: 'Tủ lạnh', value: '4'},
    {label: 'Máy giặt', value: '5'},
    {label: 'Giờ tự do', value: '6'},
    {label: 'Chăn - màn', value: '7'},
  ]);

  const renderPaidSevice = (item, index) => {
    let value = item;
    return (
      <CustomPaidService
        label={item?.label}
        value={item?.value}
        onPress={() => {
          deletePaidService(value);
        }}
      />
    );
  };
  const deletePaidService = (item, index) => {
    let result = [...listPaidSevice];
    let newResult = result.filter(itemResult => itemResult !== item);
    setListPaidSevice(newResult);
  };
  const renderFreeSevice = (item, index) => {
    let value = item;
    return (
      <CustomFreeService
        label={item?.label}
        value={item?.value}
        onPress={() => {
          deleteFreeSevice(value);
        }}
      />
    );
  };
  const deleteFreeSevice = (item, index) => {
    let result = [...listFreeSevice];
    let newResult = result.filter(itemResult => itemResult !== item);
    setListFreeSevice(newResult);
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomAppBar
          iconLeft={icons.ic_back}
          label={'Thiết lập dịch vụ'}
          iconRight={icons.ic_bell}
          iconSecondRight={icons.ic_moreOption}
          pressIconLeft={() => navigation.goBack()}
        />
        <CustomStepAppBar step={3} />

        <ScrollView style={[styles.eachContainer]}>
          <Text style={styles.content}>
            Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc
          </Text>

          <View style={styles.viewRow}>
            <Text style={[styles.textTitle, {marginVertical: 5}]}>
              Dịch vụ có phí
            </Text>
            <CustomButton
              icon={icons.ic_plus}
              styleIcon={[styles.icon, {tintColor: 'white', marginRight: 5}]}
              label={'Thêm mới'}
              styleLabel={{fontWeight: '500', fontSize: 14, color: 'white'}}
              styleButton={[styles.viewRow, styles.styleButton]}
              onPress={() => navigation.navigate('Service')}
            />
          </View>

          {listPaidSevice.length > 0 ? (
            <FlatList
              listKey="listPaidSevice"
              style={{justifyContent: 'space-between'}}
              horizontal={false}
              scrollEnabled={false}
              numColumns={2}
              keyExtractor={key => key.label}
              data={listPaidSevice}
              renderItem={({item, index}) => renderPaidSevice(item, index)}
            />
          ) : null}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.textPicker}>Đã chọn </Text>
            <Text style={styles.pickerTotal}>{`${listPaidSevice.length}`}</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.viewRow}>
            <Text style={[styles.textTitle, {marginVertical: 5}]}>
              Tiện ích miễn phí
            </Text>
            <CustomButton
              icon={icons.ic_plus}
              styleIcon={[styles.icon, {tintColor: 'white', marginRight: 5}]}
              label={'Thêm mới'}
              styleLabel={{fontWeight: '500', fontSize: 14, color: 'white'}}
              styleButton={[styles.viewRow, styles.styleButton]}
              onPress={() => navigation.navigate('Utilities')}
            />
          </View>

          {listFreeSevice.length > 0 ? (
            <FlatList
              listKey="listFreeSevice"
              style={{justifyContent: 'space-between'}}
              horizontal={false}
              scrollEnabled={false}
              numColumns={2}
              keyExtractor={key => key.value}
              data={listFreeSevice}
              renderItem={({item, index}) => renderFreeSevice(item, index)}
            />
          ) : null}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.textPicker}>Đã chọn </Text>
            <Text style={styles.pickerTotal}>{`${listFreeSevice.length}`}</Text>
          </View>

          <View style={styles.line} />

          <Text style={[styles.textTitle, {marginVertical: 5}]}>Lưu ý</Text>

          <Text style={[styles.label, {marginTop: 10}]}>Lưu ý của tòa nhà</Text>
          <View style={styles.viewTextInput}>
            <TextInput
              multiline
              placeholder="Nhập lưu ý của tòa nhà cho người thuê phòng"
            />
          </View>

          <Text style={[styles.label, {marginTop: 20}]}>Ghi chú hóa đơn</Text>
          <View style={styles.viewTextInput}>
            <TextInput multiline placeholder="Nhập ghi chú hóa đơn" />
          </View>

          <View style={{marginBottom: 56}} />
        </ScrollView>

        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Hoàn tất'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => {
            console.log('Ok');
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
  content: {color: 'grey', fontSize: 14},
  textTitle: {color: '#173b5f', fontSize: 16, fontWeight: 'bold'},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {width: 20, height: 20},
  styleButton: {
    backgroundColor: colors.backgroundButton,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 20,
    alignSelf: 'center',
  },
  textPicker: {fontSize: 14, color: 'orange'},
  pickerTotal: {fontSize: 15, color: 'orange', fontWeight: 'bold'},
  viewTextInput: {
    paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 10,
    borderColor: colors.mainColor,
    height: 100,
  },
  label: {fontSize: 15, color: 'black', fontWeight: '500'},
});
export default AddBuildingsStep3;
