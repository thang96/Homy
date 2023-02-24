import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
} from 'react-native';
import CustomAppBar from '../../../Components/CustomAppBar';
import CustomButton from '../../../Components/CustomButton';
import CustomTwoButtonBottom from '../../../Components/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import CustomChecker from '../../../Components/CustomChecker';
import {ScrollView} from 'react-native-virtualized-view';
import CustomSearchAppBar from '../../../Components/CustomSearchAppBar';

const ServiceManager = props => {
  const navigation = useNavigation();
  const [keyboard, setKeyboard] = useState(false);
  const [textSearch, setTextSearch] = useState('');

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);

  const [listSevice, setListSevice] = useState([
    {label: 'Điện', value: '4000/KWH', isCheck: true},
    {label: 'Nước', value: '5000/M³', isCheck: false},
    {label: 'Wifi', value: '50000/T', isCheck: false},
    {label: 'Ga', value: '200000/T', isCheck: true},
    {label: 'Ga1', value: '200000/T', isCheck: false},
    {label: 'Ga2', value: '200000/T', isCheck: false},
    {label: 'Ga3', value: '200000/T', isCheck: true},
  ]);

  const renderListService = (item, index) => {
    const updateItem = () => {
      let newList = [...listSevice];
      let itemCheck = newList[index];
      let newItem = {
        ...itemCheck,
        isCheck: itemCheck?.isCheck == false ? true : false,
      };
      newList[index] = newItem;
      setListSevice(newList);
    };
    return (
      <CustomChecker
        icon={icons.ic_paidService}
        label={item?.label}
        value={item?.value}
        isCheck={item?.isCheck}
        onPress={() => updateItem()}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Quản lý dịch vụ'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <CustomSearchAppBar
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
      />
      <KeyboardAvoidingView style={{flex: 1, paddingHorizontal: 10}}>
        <ScrollView style={[styles.eachContainer]}>
          <Text style={styles.content}>
            Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ
          </Text>
          <Text style={styles.textTitle}>Dịch vụ đã thêm</Text>

          {listSevice.length > 0 ? (
            <FlatList
              listKey="listPaidSevice"
              style={{justifyContent: 'space-between'}}
              horizontal={false}
              scrollEnabled={false}
              numColumns={2}
              data={listSevice}
              keyExtractor={key => key.label}
              renderItem={({item, index}) => renderListService(item, index)}
            />
          ) : null}
        </ScrollView>

        <CustomButton
          icon={icons.ic_plus}
          styleButton={styles.styleButton}
          label={'Thêm dịch vụ mới'}
          styleLabel={styles.styleLabel}
          styleIcon={{width: 20, height: 20, tintColor: 'white'}}
          onPress={() => navigation.navigate('AddService')}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,

    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
  textTitle: {color: '#173b5f', fontSize: 16, fontWeight: 'bold'},
  content: {color: 'grey', fontSize: 14, fontWeight: '500'},
  viewButton: {alignSelf: 'center', alignItems: 'center', marginVertical: 10},
  styleButton: {
    backgroundColor: colors.mainColor,
    height: 50,
    borderRadius: 10,
    marginBottom: 5,
    flexDirection: 'row',
  },
  styleLabel: {color: 'white', fontWeight: '500', marginLeft: 5},
});
export default ServiceManager;
