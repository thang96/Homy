import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import AppBarSearchComponent from '../../../components/appBarComponent/AppBarSearchComponent';
import {colors, icons, images} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateReloadStatus,
  reloadState,
} from '../../../store/slices/reloadSlice';
import {token} from '../../../store/slices/tokenSlice';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import InvoiceUnpaid from '../../../components/invoiceComponent/InvoiceUnpaid';
import InvoicePaid from '../../../components/invoiceComponent/InvoicePaid';
import {GetInvoicesApi} from '../../../apis/homeApi/tenantApi';
import ButtonComponent from '../../../components/commonComponent/ButtonComponent';

const InvoiceManager = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const reload = useSelector(reloadState);
  const tokenStore = useSelector(token);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(1);

  const [listInvoiceUnpaid, setListInvoiceUnpaid] = useState<any>([]);
  const [listInvoicePaid, setListInvoicePaid] = useState<any>(1);

  useEffect(() => {
    const getData = async () => {
      await GetInvoicesApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            let eachListInvoice = res?.data;
            let unpaid = [];
            let paid = [];
            for (let index = 0; index < eachListInvoice.length; index++) {
              const element = eachListInvoice[index];
              if (element?.status == 1) {
                unpaid.push(element);
              } else if (element?.status == 2) {
                paid.push(element);
              }
            }
            setListInvoiceUnpaid(unpaid);
            setListInvoicePaid(paid);
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    getData();
  }, [reload]);

  const renderButtonTop = () => {
    return (
      <View style={styles.viewButtonTop}>
        <ButtonComponent
          styleButton={[
            {
              backgroundColor:
                isActive == 1 ? colors.backgroundOrange : 'white',
            },
            styles.viewButton,
          ]}
          label={'Chưa thanh toán'}
          styleLabel={{color: isActive == 1 ? 'white' : '#7F8A93'}}
          onPress={() => setIsActive(1)}
        />
        <ButtonComponent
          styleButton={[
            {
              backgroundColor:
                isActive == 2 ? colors.backgroundOrange : 'white',
            },
            styles.viewButton,
          ]}
          label={'Đã thanh toán'}
          styleLabel={{color: isActive == 2 ? 'white' : '#7F8A93'}}
          onPress={() => setIsActive(2)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      <ImageBackground
        style={styles.container}
        source={images.im_backgroundSearch}>
        <AppBarSearchComponent
          label={'Hóa đơn'}
          onPressBack={() => navigation.goBack()}
        />
        {renderButtonTop()}
        <View style={{paddingHorizontal: 10, paddingTop: 10, flex: 1}}>
          {isActive == 1 ? (
            <InvoiceUnpaid
              data={listInvoiceUnpaid}
              onPress={(id: any) => {
                dispatch(updateReloadStatus('goToUpdateInvoice'));
                navigation.navigate('InvoiceUnpaidDetail', id);
              }}
            />
          ) : isActive == 2 ? (
            <InvoicePaid
              data={listInvoicePaid}
              onPress={(id: any) =>
                navigation.navigate('InvoicePaidDetail', id)
              }
            />
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  viewContainer: {
    height: 105,
    marginBottom: 15,
  },
  viewRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewBill: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 8,
    margin: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  viewBreakdow: {
    position: 'absolute',
    top: 62,
    height: 5,
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  breakdowLine: {
    height: 1,
    width: 15,
    marginHorizontal: 5,
    backgroundColor: '#97A1A7',
  },
  viewBottomBill: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonShow: {
    backgroundColor: colors.mainColor,
    height: 34,
    width: 64,
    borderRadius: 5,
  },
  viewButtonTop: {
    backgroundColor: 'white',
    borderRadius: 4,
    height: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  viewButton: {
    height: 42,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    flex: 1,
  },
});
export default InvoiceManager;
