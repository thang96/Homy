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

const FLOORINFOR = [
  {
    numberFloor: 1,
    rooms: [
      {
        numberRoom: 'P101',
        status: true,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
      {
        numberRoom: 'P102',
        status: false,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
      {
        numberRoom: 'P103',
        status: false,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
      {
        numberRoom: 'P104',
        status: true,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
    ],
  },
  {
    numberFloor: 2,
    rooms: [
      {
        numberRoom: 'P201',
        status: true,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
      {
        numberRoom: 'P202',
        status: false,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
      {
        numberRoom: 'P203',
        status: false,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
      {
        numberRoom: 'P204',
        status: true,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
    ],
  },
];

const FloorInformation = () => {
  const navigation = useNavigation();
  const [listFloors, setListFloors] = useState(FLOORINFOR);

  const renderListFloor = (item, index) => {
    return (
      <View key={`${uuid}${index}`}>
        <View style={[styles.viewRow, {height: 50, paddingHorizontal: 10}]}>
          <Text style={styles.textTitle}>{`Tầng ${item?.numberFloor}`}</Text>
          <CustomButton
            styleButton={styles.styleButton}
            label={'Thêm phòng'}
            styleLabel={styles.labelEdit}
            icon={icons.ic_plus}
            styleIcon={styles.icon}
          />
        </View>
        <FlatList
          listKey={`${uuid}${index}`}
          horizontal={false}
          scrollEnabled={false}
          numColumns={2}
          keyExtractor={key => key?.numberRoom}
          data={item?.rooms}
          renderItem={({item, index}) => {
            return (
              <CustomFloorInfor
                numberRoom={`${item?.numberRoom}`}
                status={`${item?.status}`}
                username={`${item?.username}`}
                price={`${item?.price}`}
                onPress={() => {
                  navigation.navigate('RoomInformation');
                }}
              />
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Thông tin tầng'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <CustomSecondAppBar PressAddRoom={() => navigation.navigate('AddRoom')} />

      <ScrollView style={{paddingHorizontal: 5, paddingTop: 10}}>
        {listFloors.length > 0
          ? listFloors.map((item, index) => renderListFloor(item, index))
          : null}

        <CustomButton
          styleButton={styles.buttomAddFloor}
          icon={icons.ic_plus}
          styleIcon={styles.iconAddFloor}
          label={'Thêm tầng mới'}
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
    paddingBottom: 5,
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
  styleButton: {
    backgroundColor: colors.backgroundButton,
    height: 40,
    paddingHorizontal: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  icon: {width: 15, height: 15, tintColor: 'white', marginRight: 5},
  icHome: {width: 20, height: 25, tintColor: 'purple'},
  viewFloor: {
    padding: 5,
    borderWidth: 1,
    borderColor: colors.mainColor,
    borderRadius: 10,
    margin: 5,
  },
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
});

const CustomFloorInfor = props => {
  const widthView = Dimensions.get('window').width / 2 - 15;
  const {numberRoom, status, username, price, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{width: widthView}, styles.viewFloor]}>
      <View style={styles.viewRow}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={icons.ic_home}
            style={[styles.icHome, {marginRight: 5}]}
          />
          <Text style={{color: 'grey', fontSize: 14}}>{numberRoom}</Text>
        </View>
        <CustomButton
          disabled={true}
          label={status ? 'Đã thuê' : 'Trống'}
          styleLabel={styles.labelEdit}
          styleButton={[
            styles.buttonEdit,
            {
              backgroundColor: status ? colors.backgroundButton : 'orange',
            },
          ]}
        />
      </View>
      <Text style={{color: 'black', fontWeight: 'bold'}}>{username}</Text>
      <Text style={{color: 'purple', fontSize: 14}}>{`Giá: ${price} VNĐ`}</Text>
    </TouchableOpacity>
  );
};

export default FloorInformation;

const CustomSecondAppBar = props => {
  const {PressAddRoom} = props;
  return (
    <View style={styles.appBar}>
      <View style={styles.whiteLine} />
      <View style={styles.viewRow}>
        <Text style={styles.textBuilding}>Tòa nhà D1</Text>
        <CustomButton
          styleButton={[styles.buttonEdit, {backgroundColor: 'orange'}]}
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
          onPress={PressAddRoom}
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
