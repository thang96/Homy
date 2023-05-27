import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GetInvoiceDetailApi} from '../../../apis/homeApi/tenantApi';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import CustomButtonBottom from '../../../components/commonComponent/CustomButtonBottom';
import CustomModalNotify from '../../../components/commonComponent/CustomModalNotify';
import {colors, icons} from '../../../constants';
import {token} from '../../../store/slices/tokenSlice';
import {convertDate, formatNumber} from '../../../utils/common';
import {
  BreakLine,
  StraightLine,
} from '../../../components/commonComponent/lineComponent';
import CustomViewServiceFee from '../../../components/invoiceComponent/CustomViewServiceFee';
import RenderImage from '../../../components/renderComponent/RenderImage';
import {DeleteImageApi} from '../../../apis/fileDataApi/fileDataApi';
import {
  updateReloadStatus,
  reloadState,
} from '../../../store/slices/reloadSlice';

const InvoiceUnpaidDetail = () => {
  const route = useRoute();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const reLoad = useSelector(reloadState);
  const tokenStore = useSelector(token);
  const invoiceId: any = route.params;
  const [loading, setLoading] = useState(true);
  const [modalCloseTheBill, setModalCloseTheBill] = useState(false);
  const [invoice, setInvoice] = useState<any>(null);
  const [invoiceServices, setInvoiceServices] = useState<any>([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>();
  const timeNow = new Date();

  useEffect(() => {
    const getData = async () => {
      await GetInvoiceDetailApi(tokenStore, invoiceId)
        .then((res: any) => {
          if (res?.status == 200) {
            setInvoiceServices(res?.data?.invoiceServices);
            setInvoice(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getData();
  }, [reLoad]);

  const deleteImage = async () => {
    setModalDelete(false);
    setLoading(true);
    await DeleteImageApi(tokenStore, selectedItem?.id)
      .then((res: any) => {
        if (res?.status === 200) {
          dispatch(updateReloadStatus(`deleteImage${selectedItem?.id}`));
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = (item: any, index: number) => {
    let totalPrice =
      parseInt(item?.fee ? item?.fee : 0) *
      parseInt(item?.usageAmount ? item?.usageAmount : 0);
    return (
      <CustomViewServiceFee
        chargeServiceName={item?.chargeServiceName}
        usageAmount={item?.usageAmount}
        totalPrice={totalPrice}
      />
    );
  };
  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      {modalDelete && (
        <CustomModalNotify
          title={'Xóa ảnh'}
          label={'Ảnh này hiện có trên hệ thống, bạn có muốn xóa ảnh này ?'}
          onRequestClose={() => setModalDelete(false)}
          pressConfirm={() => deleteImage()}
        />
      )}
      {modalCloseTheBill && (
        <CustomModalNotify
          title={'Chốt hóa đơn'}
          label={'Bạn có muốn chốt hóa đơn này ?'}
          onRequestClose={() => setModalCloseTheBill(false)}
          //   pressConfirm={() => closeTheBill()}
        />
      )}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Hóa đơn chưa thanh toán'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <View style={[styles.shadowView, styles.viewInvoice]}>
          <Text style={styles.title}>{`${invoice?.name ?? ''}`}</Text>
          <Text style={{color: 'red', fontSize: 13, alignSelf: 'center'}}>
            Chưa thanh toán
          </Text>

          <View style={styles.viewBetween}>
            <Text style={styles.title}>{``}</Text>
            <Text style={{color: '#000000', fontSize: 13}}>
              {`${convertDate(invoice?.createTime ?? timeNow)}`}
            </Text>
          </View>

          <View style={styles.viewRow}>
            <Image
              source={icons.ic_home}
              style={{height: 20, width: 20, marginRight: 10}}
            />
            <Text
              style={{
                color: 'black',
              }}>{`${invoice?.contract?.unit?.house?.name ?? ''} - ${
              invoice?.contract?.unit?.name ?? ''
            }`}</Text>
          </View>

          <View style={styles.viewRow}>
            <Image
              source={icons.ic_location}
              style={{height: 20, width: 20, marginRight: 10}}
            />
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: 'black',
                }}>
                {`${invoice?.contract?.unit?.house?.fullAddress ?? ''}`}
              </Text>
            </View>
          </View>

          {BreakLine()}

          <View style={styles.viewBetween}>
            <Text style={styles.label}>Tiền phòng</Text>
            <Text style={styles.label}>
              {`${formatNumber(`${invoice?.leasingFee ?? 0}`)}`}
            </Text>
          </View>

          {BreakLine()}
          <View>
            <ScrollView horizontal={true} style={{width: '100%'}}>
              {invoiceServices.length > 0 && (
                <FlatList
                  data={invoiceServices}
                  keyExtractor={key => key?.id}
                  renderItem={({item, index}) => renderItem(item, index)}
                />
              )}
            </ScrollView>
          </View>

          {BreakLine()}
          <View style={styles.viewBetween}>
            <Text style={styles.label}>Phát sinh</Text>
            <Text style={styles.label}>{`${formatNumber(
              `${invoice?.otherFee ?? '0'}`,
            )}`}</Text>
          </View>
          {BreakLine()}
          <View style={styles.viewBetween}>
            <Text style={styles.label}>Giảm giá</Text>
            <Text style={styles.label}>{`${formatNumber(
              `${invoice?.discountFee ?? '0'}`,
            )}`}</Text>
          </View>
          {BreakLine()}

          <View style={styles.viewBetween}>
            <Text style={styles.label}>Tổng</Text>
            <Text style={{color: 'red', fontSize: 15, fontWeight: '600'}}>
              {`${formatNumber(`${invoice?.totalFee ?? 0}`)}`}
            </Text>
          </View>

          {BreakLine()}

          <TextTitleComponent label={'Ghi chú'} />
          <SuggestComponent
            label={`Hạn thanh toán hóa đơn là 3 ngày kể từ ngày xuất hóa đơn, vui lòng thanh toán hoặc xin gia hạn trong thời gian này`}
          />
          {invoice?.paymentImages?.length > 0 && (
            <View>
              <TextTitleComponent label={'Ảnh thanh toán'} />
              <FlatList
                horizontal
                data={invoice?.paymentImages}
                keyExtractor={key => key?.id}
                renderItem={({item, index}) => {
                  return (
                    <RenderImage
                      deleteItem={() => {
                        setSelectedItem(item);
                        setModalDelete(true);
                      }}
                      deleteButton={true}
                      data={item}
                    />
                  );
                }}
              />
            </View>
          )}
        </View>

        <View style={{height: 56}} />
      </ScrollView>
      <CustomButtonBottom
        isAddNew={true}
        label={'Thanh toán'}
        onPress={() => navigation.navigate('PaymentScreen', invoiceId)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  shadowView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    margin: 1,
    elevation: 4,
  },
  viewInvoice: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderRadius: 8,
  },
  viewBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {fontSize: 16, color: '#000000', fontWeight: '600'},
  viewRow: {flexDirection: 'row'},
  label: {color: '#374047', fontSize: 15, fontWeight: '600'},
});
export default InvoiceUnpaidDetail;
