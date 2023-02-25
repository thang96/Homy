import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  Image,
  TouchableOpacity,
  Dimensions,
  SectionList,
} from 'react-native';
import CustomAppBar from '../../../Components/CustomAppBar';
import CustomButton from '../../../Components/CustomButton';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import CustomViewInfor from '../../../Components/CustomViewInfor';
import CustomManagerInfor from '../../../Components/CustomManagerInfor';
import {FlatList} from 'react-native-gesture-handler';
import CustomChecker from '../../../Components/CustomChecker';
import CustomPaidService from '../../../Components/CustomPaidService';
import CustomFreeService from '../../../Components/CustomFreeService';
import {uuid} from '../../../utils/uuid';

const RoomInformation = props => {
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
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Thông tin tầng'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <CustomSecondAppBar />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <Text style={[styles.textTitle, {marginBottom: 10}]}>
          Thông tin phòng
        </Text>
        <View style={styles.viewRow}>
          <CustomViewInfor title={'Tầng'} label={'1'} />
          <CustomViewInfor title={'Diện tích'} label={'10'} content={'m2'} />
        </View>
        <View style={[styles.viewRow, {marginTop: 10}]}>
          <CustomViewInfor
            title={'Số người tối đa'}
            label={'4'}
            content={'Người'}
          />
          <CustomViewInfor title={'Đặt cọc'} label={'500000'} content={'VNĐ'} />
        </View>
        <CustomViewInfor
          styleView={{marginTop: 10}}
          title={'Loại phòng'}
          label={'Studio'}
        />

        <View style={styles.line} />

        <Text style={[styles.textTitle, {marginBottom: 10}]}>
          Hợp đồng cho thuê
        </Text>

        <CustomContract />

        <View style={styles.line} />

        <View style={[styles.viewRow, {marginBottom: 10}]}>
          <Text style={[styles.textTitle]}>Thông tin người ở</Text>
          <CustomButton
            styleButton={[
              styles.buttonEdit,
              {
                marginTop: 3,
                backgroundColor: colors.backgroundButton,
                height: 40,
              },
            ]}
            icon={icons.ic_plus}
            styleIcon={[styles.iconEdit]}
            label={'Thêm người'}
            styleLabel={styles.labelEdit}
          />
        </View>
        <CustomTenantInformation styleView={{marginBottom: 10}} />
        <CustomTenantInformation />

        <View style={styles.line} />

        <Text style={[styles.textTitle]}>Dịch vụ có phí</Text>

        {listPaidSevice.length > 0 ? (
          <FlatList
            listKey="listPaidSevice"
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
        <Text style={[styles.textTitle]}>Tiện ích miễn phí</Text>

        {listFreeSevice.length > 0 ? (
          <FlatList
            listKey="listFreeSevice"
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

        <Text style={[styles.textTitle]}>Mô tả phòng</Text>
        <Text style={{color: 'black', fontSize: 14}}>
          Phòng đầy đủ tiện nghi
        </Text>
        <View style={styles.line} />

        <Text style={[styles.textTitle]}>Lưu ý cho người thuê</Text>
        <Text style={{color: 'black', fontSize: 14}}>
          Lưu ý đi nghủ sớm tránh ảnh hưởng người khác
        </Text>

        <View style={styles.line} />

        <CustomButton
          styleButton={styles.buttomAddFloor}
          icon={icons.ic_plus}
          styleIcon={styles.iconAddFloor}
          label={'Thêm phòng mới'}
          styleLabel={styles.labelAddFloor}
        />

        <View style={{height: 56}} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  appBar: {
    backgroundColor: colors.mainColor,
    minHeight: 120,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  whiteLine: {
    height: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
  },
  line: {
    height: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'black',
    marginVertical: 20,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBuilding: {fontSize: 25, fontWeight: 'bold', color: 'white'},
  iconEdit: {tintColor: 'white', width: 15, height: 15},
  buttonEdit: {
    height: 28,
    flexDirection: 'row',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  labelEdit: {color: 'white', marginLeft: 3, fontSize: 14},
  textTitle: {color: '#173b5f', fontSize: 16, fontWeight: 'bold'},
  buttomAddFloor: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.backgroundButton,
    marginTop: 30,
    flexDirection: 'row',
  },
  iconAddFloor: {width: 20, height: 20, tintColor: 'white', marginRight: 5},
  labelAddFloor: {fontSize: 16, fontWeight: '500', color: 'white'},
  textPicker: {fontSize: 14, color: 'orange'},
  pickerTotal: {fontSize: 15, color: 'orange', fontWeight: 'bold'},
});

const CustomTenantInformation = props => {
  const {styleView} = props;
  return (
    <View
      style={[
        {
          backgroundColor: 'rgba(1,1,1,0.1)',
          borderRadius: 10,
          borderLeftWidth: 5,
          borderLeftColor: colors.backgroundButton,
          justifyContent: 'center',
          padding: 10,
        },
        styleView,
      ]}>
      <View style={styles.viewRow}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>Nguyễn Văn A</Text>
        <CustomButton
          label={'Xóa'}
          styleLabel={{fontWeight: 'bold', color: 'red'}}
        />
      </View>
      <View style={styles.viewRow}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>
          {'SĐT: 0123456789'}
        </Text>
        <Text style={{fontWeight: 'bold', color: 'black'}}>
          {'Ngày vào: 01-02-2022'}
        </Text>
      </View>
    </View>
  );
};

const CustomContract = props => {
  const {} = props;
  return (
    <View
      style={{
        backgroundColor: 'rgba(1,1,1,0.1)',
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: colors.backgroundButton,
        justifyContent: 'center',
        padding: 10,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={icons.ic_contract}
          style={{width: 20, height: 20, tintColor: 'black'}}
        />
        <Text
          style={{marginLeft: 5, color: 'black'}}>{`Số hợp đồng: #12345`}</Text>
      </View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
        <Text>Thời hạn:</Text>
        <Text
          style={{
            marginLeft: 5,
            color: 'black',
            fontWeight: 'bold',
          }}>{`Từ 09-02-2023 Đến 09-03-2025`}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomButton
          styleButton={{
            height: 40,
            borderWidth: 1,
            borderColor: 'orange',
            borderRadius: 5,
            paddingHorizontal: 10,
          }}
          label={'Thanh lý'}
          styleLabel={{fontWeight: 'bold', color: 'orange'}}
        />
        <CustomButton
          styleButton={{
            height: 40,
            borderWidth: 1,
            borderColor: colors.backgroundButton,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginHorizontal: 10,
          }}
          label={'Xóa'}
          styleLabel={{fontWeight: 'bold', color: colors.backgroundButton}}
        />
        <CustomButton
          styleButton={{
            height: 40,
            borderWidth: 1,
            borderColor: 'red',
            borderRadius: 5,
            paddingHorizontal: 10,
          }}
          label={'Chỉnh sửa'}
          styleLabel={{fontWeight: 'bold', color: 'red'}}
        />
      </View>
    </View>
  );
};

export default RoomInformation;

const CustomSecondAppBar = props => {
  const {} = props;
  return (
    <View style={styles.appBar}>
      <View style={styles.whiteLine} />
      <View style={styles.viewRow}>
        <Text style={styles.textBuilding}>{`Tòa nhà D1 > P101`}</Text>
        <CustomButton
          disabled={true}
          styleButton={[styles.buttonEdit, {backgroundColor: 'orange'}]}
          label={'Trống'}
          styleLabel={styles.labelEdit}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={icons.ic_dollar}
          style={{width: 20, height: 20, tintColor: 'white', marginVertical: 3}}
        />
        <Text style={{color: 'white', fontSize: 14, marginLeft: 5}}>
          1500000 VNĐ
        </Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomButton
          styleButton={[
            styles.buttonEdit,
            {marginTop: 3, backgroundColor: 'orange'},
          ]}
          icon={icons.ic_plus}
          styleIcon={styles.iconEdit}
          label={'Thêm phòng nhanh'}
          styleLabel={styles.labelEdit}
        />
        <CustomButton
          styleButton={[
            styles.buttonEdit,
            {marginTop: 3, marginLeft: 10, backgroundColor: '#94d400'},
          ]}
          icon={icons.ic_edit}
          styleIcon={styles.iconEdit}
          label={'Sửa'}
          styleLabel={styles.labelEdit}
        />
      </View>
    </View>
  );
};
