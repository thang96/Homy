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
import {FlatList, TextInput} from 'react-native-gesture-handler';
import CustomChecker from '../../../Components/CustomChecker';
import CustomPaidService from '../../../Components/CustomPaidService';
import CustomFreeService from '../../../Components/CustomFreeService';
import {uuid} from '../../../utils/uuid';
import CustomInput from '../../../Components/CustomInput';
import CustomTimeButtons from '../../../Components/CustomTimeButton';
import CustomModalDateTimePicker from '../../../Components/CustomModalDateTimePicker';
import CustomTwoButtonBottom from '../../../Components/CustomTwoButtonBottom';
import ImagePicker from 'react-native-image-crop-picker';
import CustomSearchAppBar from '../../../Components/CustomSearchAppBar';

const TenantList = () => {
  const navigation = useNavigation();
  const avatar =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ragdoll_Kater%2C_drei_Jahre_alt%2C_RAG_n_21_seal-tabby-colourpoint%2C_Januar_2015.JPG/330px-Ragdoll_Kater%2C_drei_Jahre_alt%2C_RAG_n_21_seal-tabby-colourpoint%2C_Januar_2015.JPG';
  const [keyboard, setKeyboard] = useState(null);
  const [textSearch, setTextSearch] = useState('');
  const [listTenants, setListTenants] = useState([
    {userName: 'Tường Vân', phoneNumber: '123321123', avatar: avatar},
    {userName: 'Hoàng Khánh', phoneNumber: '025874136', avatar: avatar},
    {userName: 'Gia Bảo', phoneNumber: '058963145', avatar: avatar},
  ]);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);

  const renderListTenants = (item, index) => {
    let value = item;
    return (
      <CustomManagerInfor
        styleView={{marginTop: 10}}
        avatar={item?.avatar}
        userName={item?.userName}
        phoneNumber={item?.phoneNumber}
        onPress={() => {}}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Danh sách người thuê'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
      />
      <CustomSearchAppBar
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        {listTenants.length > 0 ? (
          <FlatList
            listKey="listTenants"
            horizontal={false}
            scrollEnabled={false}
            keyExtractor={(key, index) => `${key.userName}${index}`}
            data={listTenants}
            renderItem={({item, index}) => renderListTenants(item, index)}
          />
        ) : null}
      </ScrollView>
      <CustomButton
        styleButton={styles.buttonAddBuilding}
        icon={icons.ic_plus}
        styleIcon={{width: 25, height: 25, tintColor: 'white', marginRight: 5}}
        label={'Thêm mới người thuê'}
        styleLabel={styles.labelAddBuilding}
        onPress={() => navigation.navigate('AddNewTenant')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonAddBuilding: {
    flexDirection: 'row',
    height: 50,
    width: '90%',
    backgroundColor: colors.mainColor,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  labelAddBuilding: {color: 'white', fontSize: 14},
});
export default TenantList;
