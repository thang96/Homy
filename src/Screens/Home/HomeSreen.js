import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {Children, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CustomAppBarHome from '../../Components/CustomAppBarHome';
import CustomTitle from '../../Components/CustomTitle';
import {colors, icons, images} from '../../Constants';
import FileDocument from '../../Assets/Svgs/FileDocument.svg';
import Water from '../../Assets/Svgs/Water.svg';
import Bill from '../../Assets/Svgs/Bill.svg';
import Hammer from '../../Assets/Svgs/Hammer.svg';
import Peoples from '../../Assets/Svgs/Peoples.svg';
import {FlatList} from 'react-native-gesture-handler';
import CustomLoading from '../../Components/CustomLoading';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [listContract, setListContract] = useState([
    {
      contractCode: '#123465',
      duration: '10/02/2023-10/02/2025',
      buildingName: 'P101 - Tòa nhà D2',
      address: '448 Lê văn Việt, Tăng Nhơn Phú A, TP. Thủ Đức',
    },
    {
      contractCode: '#999999',
      duration: '10/02/2025-Không xác định',
      buildingName: 'P105 - Tòa nhà MYHIRO B',
      address: '28 Nguyễn Huệ - Ngọc Trạo - Bỉm Sơn - Thanh Hóa',
    },
  ]);
  const renderListContract = (item, index) => {
    return (
      <View style={styles.renderViewContract}>
        <Image
          source={images.im_backgroundRoom}
          style={styles.imageContract}
          resizeMode={'cover'}
        />

        <View style={styles.viewRowContract}>
          <View style={styles.viewBackgroundContract}>
            <Text style={{fontSize: 11, color: '#374047'}}>
              {item?.contractCode}
            </Text>
          </View>
          <View style={styles.viewBackgroundContract}>
            <Text style={{fontSize: 11, color: '#374047'}}>
              {item?.duration}
            </Text>
          </View>
        </View>

        <View style={{height: 62, padding: 10}}>
          <View style={styles.viewAddressContract}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={icons.ic_home} style={styles.iconContract} />
              <Text style={{fontSize: 13, fontWeight: '600', color: '#374047'}}>
                {item?.buildingName}
              </Text>
            </View>
            <Text style={{fontSize: 11, color: '#374047'}}>
              {item?.address}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      <CustomAppBarHome />
      <ScrollView style={styles.eachContainer}>
        <View style={styles.viewContract}>
          <CustomTitle label={'Hợp đồng'} />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <FlatList
              style={{height: 150, width: 350}}
              pagingEnabled={true}
              horizontal
              data={listContract}
              keyExtractor={key => key.contractCode}
              renderItem={({item, index}) => renderListContract(item, index)}
            />
          </View>
        </View>
        <View style={styles.viewManage}>
          <CustomTitle label={'Quản lý'} />
          <View style={[styles.viewRow, {marginTop: 10}]}>
            <CustomButtonManager
              iconSVG={FileDocument}
              label={'Hợp đồng'}
              onPress={() => navigation.navigate('ContractScreen')}
            />
            <CustomButtonManager
              iconSVG={Bill}
              label={'Hóa đơn'}
              onPress={() => {}}
            />
            <CustomButtonManager
              iconSVG={Water}
              label={'Điện-nước'}
              onPress={() => {}}
            />
            <CustomButtonManager
              iconSVG={Hammer}
              label={'Sự cố'}
              onPress={() => {}}
            />
          </View>
          <View style={[styles.viewRow, {marginTop: 10}]}>
            <CustomButtonManager
              iconSVG={Peoples}
              label={'Liên kết'}
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const CustomButtonManager = props => {
  const {iconSVG, label, onPress} = props;
  let IconItem = iconSVG;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 72,
        width: 85,
        alignItems: 'center',
      }}>
      <View style={styles.viewAroundItem}>
        {iconSVG && <IconItem width={24} height={24} fill={'#21BAB5'} />}
      </View>
      {label && <Text style={{fontSize: 11, color: '#7F8A93'}}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  eachContainer: {flex: 1, paddingHorizontal: 10, paddingTop: 20},
  viewContract: {
    backgroundColor: 'white',
    height: 216,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    margin: 5,
    padding: 5,
  },
  viewManage: {
    backgroundColor: 'white',
    height: 236,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    margin: 5,
    padding: 5,
    marginTop: 20,
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAroundItem: {
    width: 48,
    height: 48,
    backgroundColor: '#EDFCFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  renderViewContract: {
    overflow: 'hidden',
    width: 350,
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
});

export default HomeScreen;
