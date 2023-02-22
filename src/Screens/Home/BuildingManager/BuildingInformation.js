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

const BuildingInformation = () => {
  const navigation = useNavigation();
  let avatar =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ragdoll_Kater%2C_drei_Jahre_alt%2C_RAG_n_21_seal-tabby-colourpoint%2C_Januar_2015.JPG/330px-Ragdoll_Kater%2C_drei_Jahre_alt%2C_RAG_n_21_seal-tabby-colourpoint%2C_Januar_2015.JPG';

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
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Thông tin tòa nhà'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <CustomSecondAppBar />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 20}}>
        <View style={styles.viewUtils}>
          <CustomOptionBT
            title={'Số phòng'}
            content={'12'}
            icon={icons.ic_bed}
            styleImageBG={{tintColor: '#1297c0'}}
            styleBGIcon={{backgroundColor: '#ebf9fd'}}
            onPress={() => navigation.navigate('FloorInformation')}
          />
          <CustomOptionBT
            title={'Phòng trống'}
            content={'8'}
            icon={icons.ic_key}
            styleImageBG={{tintColor: '#ff8d37'}}
            styleBGIcon={{backgroundColor: '#fff3e9'}}
          />
          <CustomOptionBT
            title={'Người'}
            content={'6'}
            icon={icons.ic_men}
            styleImageBG={{tintColor: '#7ace68'}}
            styleBGIcon={{backgroundColor: '#e6f6e2'}}
          />
          <CustomOptionBT
            title={'Sự cố'}
            content={'2'}
            icon={icons.ic_exclamation}
            styleImageBG={{tintColor: '#f5dc00'}}
            styleBGIcon={{backgroundColor: '#fefdd9'}}
          />
        </View>

        <View style={styles.line} />

        <Text style={[styles.textTitle, {marginVertical: 5}]}>
          Thông tin tòa nhà
        </Text>
        <View style={[styles.viewRow, {marginBottom: 10}]}>
          <CustomViewInfor
            title={'Giờ mở cửa'}
            label={'08:00'}
            content={'AM'}
          />
          <CustomViewInfor
            title={'Giờ đóng cửa'}
            label={'23:00'}
            content={'PM'}
          />
        </View>
        <CustomViewInfor
          title={'Chi phí thuê'}
          label={'30000000'}
          content={'VNĐ'}
        />

        <View style={styles.line} />

        <Text style={[styles.textTitle, {marginVertical: 5}]}>
          Quản lý tòa nhà
        </Text>
        <CustomManagerInfor
          styleView={{marginTop: 10}}
          avatar={avatar}
          userName={'Trường Vân'}
          phoneNumber={`0123456789`}
          onPress={() => {}}
        />
        <CustomManagerInfor
          styleView={{marginTop: 10}}
          avatar={avatar}
          userName={'Trường Vân'}
          phoneNumber={`0123456789`}
          onPress={() => {}}
        />
        <CustomManagerInfor
          styleView={{marginTop: 10}}
          avatar={avatar}
          userName={'Trường Vân'}
          phoneNumber={`0123456789`}
          onPress={() => {}}
        />
        <View style={styles.line} />

        <Text style={[styles.textTitle, {marginVertical: 5}]}>
          Thông tin thanh toán
        </Text>
        <View style={[styles.viewRow, {marginBottom: 10}]}>
          <CustomViewInfor title={'Thời gian đóng tiền'} label={'Ngày 2'} />
          <CustomViewInfor title={'Hạn'} label={'Ngày 8'} />
        </View>
        <CustomViewInfor title={'Ngày chốt tiền'} label={'Ngày 28'} />

        <View style={styles.line} />

        <Text style={[styles.textTitle, {marginVertical: 5}]}>
          Dịch vụ có phí
        </Text>
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

        <Text style={[styles.textTitle, {marginVertical: 5}]}>
          Tiện ích miễn phí
        </Text>
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

        <Text style={[styles.textTitle, {marginVertical: 5}]}>Lưu ý</Text>
        <Text style={{color: 'black'}}>
          {
            'Ăn ở bẩn thịu hoặc làm ảnh hưởng người xung quanh sẽ bị đơn phương chấm dứt hợp đồng'
          }
        </Text>

        <View style={styles.line} />

        <CustomButton
          label={'Chỉnh sửa'}
          styleLabel={styles.pickerTotal}
          styleButton={styles.styleButton}
        />

        <View style={{marginBottom: 56}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  appBar: {
    backgroundColor: colors.mainColor,
    height: 70,
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
    backgroundColor: 'orange',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  labelEdit: {color: 'white', marginLeft: 3, fontSize: 14},
  viewUtils: {
    height: 110,
    backgroundColor: 'white',
    elevation: 1,
    zIndex: 1,
    padding: 2,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {color: '#173b5f', fontSize: 16, fontWeight: 'bold'},
  textPicker: {fontSize: 14, color: 'orange'},
  pickerTotal: {fontSize: 15, color: 'orange', fontWeight: 'bold'},
  styleButton: {
    borderWidth: 2,
    height: 50,
    borderRadius: 10,
    borderColor: 'orange',
    marginTop: 30,
  },
});

const CustomOptionBT = props => {
  const {
    icon,
    styleImageBG,
    styleButton,
    styleBGIcon,
    title,
    content,
    onPress,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styleOption.button, styleButton]}>
      <View style={[styleOption.backgroundIcon, styleBGIcon]}>
        <Image
          style={[styleOption.icon, styleImageBG]}
          source={icon}
          resizeMode={'contain'}
        />
      </View>
      {title && <Text style={styleOption.title}>{title}</Text>}
      {content && <Text style={styleOption.content}>{content}</Text>}
    </TouchableOpacity>
  );
};
const styleOption = StyleSheet.create({
  button: {
    width: 90,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {height: 35, width: 35},
  title: {fontSize: 11, color: 'grey', textAlign: 'center'},
  content: {fontSize: 14, fontWeight: 'bold', color: 'black'},
  backgroundIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
export default BuildingInformation;

const CustomSecondAppBar = props => {
  const {} = props;
  return (
    <View style={styles.appBar}>
      <View style={styles.whiteLine} />
      <View style={styles.viewRow}>
        <Text style={styles.textBuilding}>Tòa nhà D1</Text>
        <CustomButton
          styleButton={styles.buttonEdit}
          icon={icons.ic_edit}
          styleIcon={styles.iconEdit}
          label={'Chỉnh sửa'}
          styleLabel={styles.labelEdit}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={icons.ic_location}
          style={{width: 20, height: 20, tintColor: 'white'}}
        />
        <Text style={{color: 'white', fontSize: 14, marginLeft: 5}}>
          448 Lê Văn Việt, Tăng Nhơn Phú A, TP. Thủ Đức
        </Text>
      </View>
    </View>
  );
};
