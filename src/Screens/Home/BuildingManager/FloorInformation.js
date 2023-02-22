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

const FloorInformation = () => {
  const navigation = useNavigation();
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  appBar: {
    backgroundColor: colors.mainColor,
    height: 120,
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

    paddingHorizontal: 5,
    borderRadius: 5,
  },
  labelEdit: {color: 'white', marginLeft: 3, fontSize: 14},
});
export default FloorInformation;

const CustomSecondAppBar = props => {
  const {} = props;
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
