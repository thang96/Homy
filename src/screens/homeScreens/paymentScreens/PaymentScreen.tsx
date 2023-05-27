import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetInvoiceDetailApi,
  GetTenantInvoicesPaymentinfoApi,
} from '../../../apis/homeApi/tenantApi';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import {colors, icons} from '../../../constants';
import {token} from '../../../store/slices/tokenSlice';
import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../../components/commonComponent/CustomModalCamera';
import RenderImage from '../../../components/renderComponent/RenderImage';
import ButtonComponent from '../../../components/commonComponent/ButtonComponent';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import {uuid} from '../../../utils/common';
import {PostImageInvoiceUploadPaymentApi} from '../../../apis/fileDataApi/fileDataApi';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';
import CustomModalNotify from '../../../components/commonComponent/CustomModalNotify';
import {PutInvoiceUploadServiceApi} from '../../../apis/homeApi/invoiceApi';
import {BreakLine} from '../../../components/commonComponent/lineComponent';

const widthQR = Dimensions.get('window').width - 40;

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const route = useRoute();
  const tokenStore = useSelector(token);
  const invoiceId: any = route.params;

  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [invoice, setInvoice] = useState<any>(null);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalPayment, setModalPayment] = useState(false);
  const [paymentImages, setPaymentImages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await GetTenantInvoicesPaymentinfoApi(tokenStore, invoiceId)
        .then((res: any) => {
          if (res?.status == 200) {
            setPaymentInfo(res?.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
      await GetInvoiceDetailApi(tokenStore, invoiceId)
        .then((res: any) => {
          if (res?.status == 200) {
            setInvoice(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getData();
  }, []);
  const openCamera = () => {
    setModalCamera(false);
    setTimeout(() => {
      ImagePicker.openCamera({width: 300, height: 400})
        .then(image => {
          let eachImg = {...image, uri: image?.path};
          const eachResult: any = [...paymentImages, eachImg];
          setPaymentImages(eachResult);
        })
        .catch(e => {
          ImagePicker.clean();
          setModalCamera(false);
        });
    }, 1000);
  };

  const openGallery = () => {
    setModalCamera(false);
    setTimeout(() => {
      ImagePicker.openPicker({multiple: true})
        .then(async image => {
          let albumImg: any = [];
          for (let index = 0; index < image.length; index++) {
            let element = image[index];
            let eachElement = {...element, uri: element?.path};
            albumImg.push(eachElement);
          }
          const eachResult = [...paymentImages];
          const newResult = eachResult.concat(albumImg);
          setPaymentImages(newResult);
        })
        .catch(e => {
          ImagePicker.clean();
          setModalCamera(false);
        });
    }, 1000);
  };

  const renderImageUser = (item: any, index: number) => {
    return (
      <RenderImage
        deleteButton={true}
        data={item}
        deleteItem={() => {
          let result = [...paymentImages];
          let newResult = result.filter(itemResult => itemResult !== item);
          setPaymentImages(newResult);
        }}
      />
    );
  };

  // const downloadQRCode = async () => {
  //   let position = paymentInfo?.qrCodeImage?.indexOf('.png');
  //   let result = paymentInfo?.qrCodeImage?.slice(0, position + 4);
  //   downloadFile(result);
  // };

  const paymentInvoice = async () => {
    setModalPayment(false);
    if (paymentImages.length <= 0) {
      Alert.alert('Thiếu thông tin', 'Vùi lòng thêm ảnh xác nhận thanh toán');
    } else {
      setLoading(true);
      await PutInvoiceUploadServiceApi(tokenStore, invoiceId)
        .then(async (res: any) => {
          if (res?.status == 200) {
            await PostImageInvoiceUploadPaymentApi(
              tokenStore,
              invoiceId,
              paymentImages,
            )
              .then((res: any) => {
                if (res?.status == 200) {
                  dispatch(updateReloadStatus('updateInvoicePaymentSuccess'));
                  navigation.navigate('InvoiceManager');
                  setLoading(true);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      {modalCamera && (
        <CustomModalCamera
          openCamera={() => openCamera()}
          openGallery={() => openGallery()}
          modalVisible={modalCamera}
          onRequestClose={() => setModalCamera(false)}
          cancel={() => setModalCamera(false)}
        />
      )}
      {modalPayment && (
        <CustomModalNotify
          modalVisible={modalPayment}
          title={'Thanh toán'}
          label={'Bạn có muốn hoàn thành thanh toán ?'}
          onRequestClose={() => setModalPayment(false)}
          pressConfirm={() => paymentInvoice()}
        />
      )}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'QR thanh toán'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <View style={[styles.viewQR, styles.shadowView]}>
          {/* <ButtonComponent
            styleButton={styles.buttonDownload}
            icon={icons.ic_download}
            styleIcon={{width: 40, height: 40, tintColor: colors.mainColor}}
            onPress={() => downloadQRCode()}
          /> */}
          <Image
            resizeMode="contain"
            source={{uri: paymentInfo?.qrCodeImage}}
            style={{height: widthQR, width: widthQR, alignSelf: 'center'}}
          />

          {<BreakLine />}

          <View style={styles.viewCenter}>
            <Text
              style={
                styles.title
              }>{`Số tiền: ${invoice?.totalFee?.toLocaleString()} VNĐ`}</Text>
            <Text
              style={
                styles.label
              }>{`Tên chủ TK: ${paymentInfo?.accountName}`}</Text>
            <Text
              style={styles.title}>{`Số TK: ${paymentInfo?.accountNo}`}</Text>
            <Text
              style={[
                styles.label,
                {maxWidth: 300},
              ]}>{`${paymentInfo?.bank?.name}`}</Text>
          </View>

          {<BreakLine />}
          <TextTitleComponent label={'Nội dung'} />
          <SuggestComponent label={`${invoice?.name}`} />
        </View>
        <TextTitleComponent label={'Thêm ảnh thanh toán'} />
        <View
          style={{
            height: 220,
            marginVertical: 5,
            borderRadius: 10,
            backgroundColor: 'white',
          }}>
          {paymentImages.length > 0 ? (
            <FlatList
              horizontal
              data={paymentImages}
              keyExtractor={uuid}
              renderItem={({item, index}) => renderImageUser(item, index)}
            />
          ) : (
            <ButtonComponent
              styleButton={{flex: 1}}
              label={'Tải lên ảnh thanh toán'}
              styleLabel={[styles.title, {marginTop: 5}]}
              disabled={true}
              icon={icons.ic_upload}
              styleIcon={{width: 100, height: 100, alignSelf: 'center'}}
            />
          )}
        </View>
        <ButtonComponent
          styleButton={[styles.buttonUploadIM]}
          label={'Tải lên ảnh thanh toán'}
          styleLabel={styles.labelUploadIM}
          onPress={() => setModalCamera(true)}
        />
        <View style={{height: 56}} />
        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Xác nhận'}
          styleLabelLeft={styles.styleLabelLeft}
          styleButtonLeft={styles.styleButtonLeft}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => setModalPayment(true)}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  viewQR: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  shadowView: {
    margin: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  viewCenter: {justifyContent: 'center', alignItems: 'center'},
  title: {color: '#004081', fontWeight: '600', fontSize: 12},
  label: {color: '#004081', fontSize: 12},
  buttonUploadIM: {
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 10,
  },
  labelUploadIM: {color: 'white', fontWeight: '500', fontSize: 15},
  styleLabelLeft: {color: '#FE7A37', fontSize: 15, fontWeight: '600'},
  styleButtonLeft: {
    borderColor: '#FE7A37',
    backgroundColor: 'white',
    marginRight: 5,
  },
  buttonDownload: {position: 'absolute', top: 10, right: 10, zIndex: 1},
});
export default PaymentScreen;
