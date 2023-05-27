import {useNavigation} from '@react-navigation/native';
import React, {Children, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AppBarHomeComponent from '../../components/appBarComponent/AppBarHomeComponent';
import TextTitleComponent from '../../components/commonComponent/TextTitleComponent';
import {colors, icons, images} from '../../constants';
import {FlatList} from 'react-native-gesture-handler';
import LoadingComponent from '../../components/commonComponent/LoadingComponent';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../store/slices/tokenSlice';
import {reloadState} from '../../store/slices/reloadSlice';
import {updateUser, userInfor} from '../../store/slices/userInforSlice';
import {GetContractsApi, GetInvoicesApi} from '../../apis/homeApi/tenantApi';
import RenderInvoice from '../../components/renderComponent/RenderInvoice';
import {convertDate, dateToDMY, formatNumber} from '../../utils/common';
import RenderContract from '../../components/renderComponent/RenderContract';
import RenderWarterAndElectric from '../../components/renderComponent/RenderWarterAndElectric';
import {GetAllInvoiceUnClosingsApi} from '../../apis/homeApi/waterAndElectricityApis';
import {GetUserAPi} from '../../apis/userApi/userApi';

const widthView = Dimensions.get('window').width - 40;

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const tokenStore = useSelector(token);
  const reload = useSelector(reloadState);
  const [loading, setLoading] = useState<any>(true);
  const userStore = useSelector(userInfor);
  const [listContract, setListContract] = useState<any[]>([]);
  const [listInvoice, setListInvoice] = useState<any[]>([]);
  const [listWaterElectric, setListWaterElectric] = useState<any[]>([]);

  const [invoiceActive, setInvoiceActive] = useState(0);
  const [contractActive, setContractActive] = useState(0);
  const [waterElectricActive, setWaterElectricActive] = useState(0);

  useEffect(() => {
    const getData = async () => {
      await GetUserAPi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            dispatch(updateUser(res?.data));
          }
        })
        .catch((error: any) => {
          console.log(error);
        });

      await GetAllInvoiceUnClosingsApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            let data = res?.data;
            let array = [];
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              if (element?.statusName == 'Chưa chốt') {
                array.push(element);
              }
            }
            setListWaterElectric(array);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });

      await GetContractsApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            setListContract(res?.data);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });

      await GetInvoicesApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            let response = res?.data;
            let arrays = [];
            for (let index = 0; index < response.length; index++) {
              const element = response[index];
              if (element?.status == 0 || element?.status == 1) {
                arrays.push(element);
              }
            }
            setListInvoice(arrays);
            setLoading(false);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    };
    getData();
  }, [tokenStore,reload]);

  const renderListWaterElectric = (item: any, index: number) => {
    return (
      <RenderWarterAndElectric
        widthSlide={widthView}
        name={`Chốt dịch vụ tháng ${item?.stage}`}
        place={`${item?.contract?.unit?.house?.name} - ${item?.contract?.unit?.name}`}
        status={item?.status}
        onPress={() =>
          navigation.navigate('ConfirmService', item?.id)
        }
      />
    );
  };
  const renderListInvoice = (item: any, index: number) => {
    return (
      <RenderInvoice
        widthSlide={widthView}
        name={item?.name}
        totalFee={`${formatNumber(`${item?.totalFee}`)}`}
        contractOwner={item?.contract?.contractOwner?.fullName}
        createTime={`${convertDate(item?.createTime)}`}
        status={item?.status}
        onPress={() => {
          if (item?.status == 0) {
            // navigation.navigate('InvoiceDetail', item?.id);
          } else if (item?.status == 1) {
            navigation.navigate('InvoiceUnpaidDetail', item?.id);
          }
        }}
      />
    );
  };
  const renderListContract = (item: any, index: number) => {
    return (
      <RenderContract
        widthSlide={widthView}
        startDate={item?.startDate}
        endDate={item?.endDate}
        houseName={item?.unit?.house?.name}
        unitName={item?.unit?.name}
        address={item?.unit?.house?.fullAddress}
        onPress={() => navigation.navigate('DetailContract', item?.id)}
      />
    );
  };

  const onChangeInvoice = (nativeEvent: any) => {
    if (nativeEvent) {
      let slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != invoiceActive) {
        setInvoiceActive(slide);
      }
    }
  };
  const onChangeContract = (nativeEvent: any) => {
    if (nativeEvent) {
      let slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != contractActive) {
        setContractActive(slide);
      }
    }
  };
  const onChangeWaterElectric = (nativeEvent: any) => {
    if (nativeEvent) {
      let slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != waterElectricActive) {
        setWaterElectricActive(slide);
      }
    }
  };
  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      <AppBarHomeComponent
        userName={userStore?.fullName}
        avatarImage={userStore?.avatarImage?.fileUrl}
      />
      <ScrollView style={styles.eachContainer}>
        {listWaterElectric.length > 0 && (
          <View style={[styles.viewWaterElectric, styles.viewShadow]}>
            <View style={{flex: 1}}>
              <TextTitleComponent
                viewTitle={{marginBottom: 10}}
                label={'Chốt điện nước'}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FlatList
                  onScroll={({nativeEvent}) =>
                    onChangeWaterElectric(nativeEvent)
                  }
                  style={{flex: 1}}
                  pagingEnabled={true}
                  horizontal
                  data={listWaterElectric}
                  keyExtractor={key => key?.id}
                  renderItem={({item, index}) =>
                    renderListWaterElectric(item, index)
                  }
                />
              </View>
            </View>
            <View style={styles.wrapDot}>
              {listWaterElectric.map((e, index) => (
                <Text
                  key={e?.id}
                  style={
                    waterElectricActive == index ? styles.dotActive : styles.dot
                  }>
                  &#11044;
                </Text>
              ))}
            </View>
          </View>
        )}
        {listInvoice.length > 0 && (
          <View style={[styles.viewContract, styles.viewShadow]}>
            <View style={{flex: 1}}>
              <TextTitleComponent
                viewTitle={{marginBottom: 10}}
                label={'Hóa đơn cần xử lý'}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FlatList
                  onScroll={({nativeEvent}) => onChangeInvoice(nativeEvent)}
                  style={{height: 150, flex: 1}}
                  pagingEnabled={true}
                  horizontal
                  data={listInvoice}
                  keyExtractor={key => key?.id}
                  renderItem={({item, index}) => renderListInvoice(item, index)}
                />
              </View>
            </View>
            <View style={styles.wrapDot}>
              {listInvoice.map((e, index) => (
                <Text
                  key={e?.id}
                  style={
                    invoiceActive == index ? styles.dotActive : styles.dot
                  }>
                  &#11044;
                </Text>
              ))}
            </View>
          </View>
        )}

        {listContract.length > 0 && (
          <View style={[styles.viewContract, styles.viewShadow]}>
            <View style={{flex: 1}}>
              <TextTitleComponent label={'Hợp đồng'} />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FlatList
                  onScroll={({nativeEvent}) => onChangeContract(nativeEvent)}
                  style={{height: 150, flex: 1}}
                  pagingEnabled={true}
                  horizontal
                  data={listContract}
                  keyExtractor={key => key?.id}
                  renderItem={({item, index}) =>
                    renderListContract(item, index)
                  }
                />
              </View>
            </View>
            <View style={styles.wrapDot}>
              {listContract.map((e, index) => (
                <Text
                  key={e?.id}
                  style={
                    contractActive == index ? styles.dotActive : styles.dot
                  }>
                  &#11044;
                </Text>
              ))}
            </View>
          </View>
        )}
        <View style={styles.viewManage}>
          <TextTitleComponent label={'Quản lý'} />
          <View style={[styles.viewRow, {marginTop: 10}]}>
            <CustomButtonManager
              icon={icons.ic_file}
              label={'Hợp đồng'}
              onPress={() => navigation.navigate('ContractManager')}
            />
            <CustomButtonManager
              icon={icons.ic_bill}
              label={'Hóa đơn'}
              onPress={() => navigation.navigate('InvoiceManager')}
            />
            <CustomButtonManager
              icon={icons.ic_waterDrop}
              label={'Dịch vụ'}
              onPress={() => navigation.navigate('CheckServiceManager')}
            />
            {/* <CustomButtonManager
              icon={icons.ic_hammer}
              label={'Sự cố'}
              onPress={() => {}}
            /> */}
          </View>
          {/* <View style={[styles.viewRow, {marginTop: 10}]}>
            <CustomButtonManager
              icon={icons.ic_linkPeople}
              label={'Liên kết'}
              onPress={() => {}}
            />
          </View> */}
        </View>
        <View style={{height: 56}} />
      </ScrollView>
    </View>
  );
};

const CustomButtonManager = (props: any) => {
  const {iconSVG, label, onPress, icon} = props;
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
        {icon && (
          <Image
            source={icon}
            style={{width: 24, height: 24, tintColor: colors.mainColor}}
          />
        )}
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
    minHeight: 216,
    borderRadius: 8,
    margin: 5,
    padding: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewWaterElectric: {
    backgroundColor: 'white',
    minHeight: 150,
    borderRadius: 8,
    margin: 5,
    padding: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
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
  wrapDot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotActive: {margin: 3, color: '#FE7A37'},
  dot: {margin: 3, color: '#D1D1D6'},
});

export default HomeScreen;
