import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import ButtonComponent from '../../../components/commonComponent/ButtonComponent';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import {colors, icons, images} from '../../../constants';
import {convertDate} from '../../../utils/common';
import {GetContractDetailApi} from '../../../apis/homeApi/tenantApi';
import {useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import PersonInforComponent from '../../../components/commonComponent/PersonInforComponent';
import {StraightLine} from '../../../components/commonComponent/lineComponent';
import RenderService from '../../../components/renderComponent/RenderService';
import RenderAmenity from '../../../components/renderComponent/RenderAmenity';
// import Line from '../../../Components/CommonComponent/Line';

const DetailContractLiquidated = () => {
  const navgation = useNavigation();
  const tokenStore = useSelector(token);
  const route = useRoute();
  const widthWindow = Dimensions.get('window').width;
  const contractId: any = route.params;

  const [loading, setLoading] = useState(true);
  const [contract, setContract] = useState<any>(null);
  // console.log(contract);
  useEffect(() => {
    const getData = async () => {
      await GetContractDetailApi(tokenStore, contractId)
        .then((res: any) => {
          if (res?.status == 200) {
            setContract(res?.data);
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Chi tiết hợp đồng'}
        iconRight={icons.ic_bell}
        pressIconLeft={() => navgation.goBack()}
        pressIconRight={() => {}}
      />
      <ImageBackground
        source={images.im_backgroundRoom}
        style={[{width: widthWindow}, styles.IMGBackground]}>
        <ButtonComponent
          label={'Hoạt động'}
          styleLabel={{fontSize: 12, color: 'white'}}
          disabled={true}
          styleButton={styles.viewStatus}
        />
        <View style={styles.viewPropImage}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.propImage} source={icons.ic_home} />
            <Text style={{fontSize: 13, fontWeight: '600', color: '#374047'}}>
              {`${contract?.unit?.name} - ${contract?.unit?.house?.name}`}
            </Text>
          </View>
          <Text numberOfLines={2} style={{fontSize: 11, color: '#7F8A93'}}>
            {contract?.unit?.house?.fullAddress}
          </Text>
        </View>
      </ImageBackground>

      <ScrollView style={{paddingHorizontal: 10, paddingTop: 20}}>
        <View style={styles.viewRow}>
          <Image
            source={icons.ic_calendar}
            style={{width: 20, height: 20, marginRight: 10}}
          />
          <Text style={{color: '#374047', fontSize: 12}}>{`Từ ${convertDate(
            contract?.startDate,
          )} đến ${convertDate(contract?.endDate)}`}</Text>
        </View>
        {StraightLine()}
        <TextTitleComponent label={'Chủ hợp đồng'} />
        <PersonInforComponent
          avatar={contract?.contractOwner?.avatarImage?.fileUrl}
          userName={contract?.contractOwner?.fullName}
          phoneNumber={contract?.contractOwner?.phoneNumber}
        />
        {StraightLine()}

        <View style={styles.viewRowBetween}>
          <Text style={{color: '#7F8A93', fontSize: 13}}>Tiền phòng</Text>
          <View style={styles.viewRow}>
            <Text style={styles.labelBlack}>{`${parseInt(
              contract?.leasingFee,
            ).toLocaleString()}`}</Text>
            <Text style={{color: '#7F8A93', fontSize: 13}}> VNĐ</Text>
          </View>
        </View>

        <View style={styles.viewRowBetween}>
          <Text style={{color: '#7F8A93', fontSize: 13}}>Tiền cọc</Text>
          <View style={styles.viewRow}>
            <Text style={styles.labelBlack}>{`${parseInt(
              contract?.depositMoney,
            ).toLocaleString()}`}</Text>
            <Text style={{color: '#7F8A93', fontSize: 13}}> VNĐ</Text>
          </View>
        </View>

        <View style={styles.viewRowBetween}>
          <Text style={{color: '#7F8A93', fontSize: 13}}>Kỳ thanh toán</Text>
          <View style={styles.viewRow}>
            <Text style={styles.labelBlack}>{contract?.paymentDuration}</Text>
            <Text style={{color: '#7F8A93', fontSize: 13}}> Tháng</Text>
          </View>
        </View>
        {StraightLine()}
        <TextTitleComponent label={'Dịch vụ có phí'} />
        {contract?.chargeServices?.length > 0 && (
          <FlatList
            // listKey="chargeServices"
            data={contract?.chargeServices}
            numColumns={2}
            keyExtractor={key => key?.id}
            renderItem={({item, index}) => {
              return (
                <RenderService
                  label={item?.name}
                  value={item?.fee?.toLocaleString()}
                  icon={item?.icon}
                />
              );
            }}
          />
        )}
        {StraightLine()}
        <TextTitleComponent label={'Tiện ích miễn phí'} />
        {contract?.amenities?.length > 0 && (
          <FlatList
            // listKey="amenities"
            data={contract?.amenities}
            numColumns={3}
            keyExtractor={key => key?.id}
            renderItem={({item, index}) => {
              return <RenderAmenity label={item?.name} />;
            }}
          />
        )}
        {StraightLine()}
        <TextTitleComponent label={'Điều khoản'} />
        <SuggestComponent label={`${contract?.termAndCondition}`} />
        <View style={{height: 56}} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  viewStatus: {
    height: 30,
    width: 100,
    backgroundColor: colors.backgroundButton,
    borderRadius: 4,
  },
  propImage: {
    width: 18,
    height: 18,
    marginRight: 5,
    tintColor: '#374047',
  },
  viewPropImage: {
    minHeight: 70,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 5,
  },
  IMGBackground: {
    height: 146,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  viewRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewRow: {alignItems: 'center', flexDirection: 'row'},
  labelBlack: {
    color: '#374047',
    fontSize: 15,
    fontWeight: '600',
  },
});
export default DetailContractLiquidated;
