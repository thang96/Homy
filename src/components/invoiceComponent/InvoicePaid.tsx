import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {icons, colors} from '../../constants';
import TextTitleComponent from '../commonComponent/TextTitleComponent';
import RenderInvoice from '../renderComponent/RenderInvoice';
import {formatNumber} from '../../utils/common';

const InvoicePaid = (props: any) => {
  const {data, onPress} = props;
  const [invoiceUnconfirmred, setInvoiceUnconfirmred] = useState([]);
  useEffect(() => {
    setInvoiceUnconfirmred(data);
  }, [props]);

  const renderBillNotCreatedYet = (item: any, index: number) => {
    return (
      <RenderInvoice
        totalFee={`${formatNumber(`${item?.totalFee}`)}`}
        status={`${item?.status}`}
        name={`${item?.name}`}
        houseName={`${item?.contract?.unit?.house?.name}`}
        unitName={`${item?.contract?.unit?.name}`}
        onPress={() => onPress(item?.id)}
      />
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <TextTitleComponent label={'Hóa đơn đã thanh toán'} />
      {invoiceUnconfirmred.length > 0 && (
        <FlatList
          //   listkey={'invoiceUnconfirmred'}
          data={invoiceUnconfirmred}
          keyExtractor={(key: any) => key?.id}
          renderItem={({item, index}) => renderBillNotCreatedYet(item, index)}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  viewAroundBill: {height: 106, marginBottom: 15},
  viewBill: {
    backgroundColor: 'white',
    margin: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 8,
    padding: 5,
  },
  viewRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonShow: {
    backgroundColor: colors.mainColor,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 4,
  },
  labelShow: {color: 'white', fontWeight: '600'},
  viewLine: {
    height: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    top: 63.28,
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    zIndex: 1,
    overflow: 'hidden',
  },
  line: {
    height: 1,
    width: 16,
    backgroundColor: colors.borderInput,
    marginLeft: 10,
  },
  textTotalFee: {
    fontWeight: '600',
    color: colors.mainColor,
    lineHeight: 20,
    fontSize: 15,
  },
});
export default InvoicePaid;
