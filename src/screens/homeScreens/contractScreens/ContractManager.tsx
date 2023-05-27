import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GetContractsApi} from '../../../apis/homeApi/tenantApi';
import ContractIsActive from '../../../components/contractComponent/ContractIsActive';
import ContractLiquidated from '../../../components/contractComponent/ContractLiquidated';
import CustomContractAppBar from '../../../components/appBarComponent/CustomContractAppBar';
import {colors, icons, images} from '../../../constants';
import {
  reloadState,
  updateReloadStatus,
} from '../../../store/slices/reloadSlice';
import {token} from '../../../store/slices/tokenSlice';

const ContractManager = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const reload = useSelector(reloadState);
  const tokenStore = useSelector(token);
  const [isChoose, setIschoose] = useState(true);
  const [isActive, setIsActive] = useState(0);
  const [contractActive, setContractActive] = useState<any>([]);
  const [contractLiquidated, setContractLiquidated] = useState<any>([]);

  useEffect(() => {
    const getListData = async () => {
      await GetContractsApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            let response = res?.data;
            let active = [];
            let liquidated = [];
            for (let index = 0; index < response.length; index++) {
              const element = response[index];
              if (element?.status == 0) {
                active.push(element);
              } else if (element?.status == 1) {
                liquidated.push(element);
              }
            }
            setContractActive(active);
            setContractLiquidated(liquidated);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    getListData();
  }, [reload]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.container}
        source={images.im_backgroundSearch}>
        <CustomContractAppBar
          label={'Hợp đồng'}
          isActive={isActive}
          isChoose={isChoose}
          onPressBack={() => navigation.goBack()}
          onPressOne={() => setIsActive(0)}
          onPressTwo={() => setIsActive(1)}
        />
        <View style={[{paddingHorizontal: 10, paddingTop: 20, flex: 1}]}>
          {isActive == 0 ? (
            <ContractIsActive
              data={contractActive}
              onPress={(id: any) => {
                dispatch(updateReloadStatus('toDoUpdateContractActive'));
                navigation.navigate('DetailContract', id);
              }}
            />
          ) : isActive == 1 ? (
            <ContractLiquidated
              data={contractLiquidated}
              onPress={(id: any) => {
                dispatch(updateReloadStatus('toDoUpdateContractLiquidated'));
                navigation.navigate('DetailContractLiquidated', id);
              }}
            />
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  viewShadow: {
    height: 150,
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    margin: 5,
    padding: 10,
    borderTopWidth: 3,
    borderTopColor: colors.backgroundButton,
  },
  viewStatus: {
    height: 30,
    width: 100,
    backgroundColor: colors.backgroundButton,
    borderRadius: 5,
  },
});
export default ContractManager;
