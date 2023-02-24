import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  Text,
  ScrollView,
} from 'react-native';
import CustomAppBar from '../../../../Components/CustomAppBar';
import CustomTwoButtonBottom from '../../../../Components/CustomTwoButtonBottom';
import {icons, colors} from '../../../../Constants';
// import {ScrollView} from 'react-native-virtualized-view';
import CustomButton from '../../../../Components/CustomButton';
import CustomChecker from '../../../../Components/CustomChecker';
import CustomSearchAppBar from '../../../../Components/CustomSearchAppBar';

const BillManagement = props => {
  const navigation = useNavigation();
  const [keyboard, setKeyboard] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [isActive, setIsActive] = useState(1);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomAppBar
          iconLeft={icons.ic_back}
          label={'Quản lý hợp đồng'}
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
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <ScrollView style={[styles.eachContainer]}>
            <ScrollView horizontal style={{height: 45}}>
              <CustomButton
                label={'Chưa tạo'}
                styleLabel={[
                  styles.labelTop,
                  {color: isActive == 1 ? colors.backgroundButton : 'grey'},
                ]}
                styleButton={[
                  styles.topButton,
                  {
                    borderBottomWidth: isActive == 1 ? 3 : 0,
                    borderBottomColor:
                      isActive == 1 ? colors.backgroundButton : 'grey',
                  },
                ]}
                onPress={() => setIsActive(1)}
              />
              <CustomButton
                label={'Chưa thanh toán'}
                styleLabel={[
                  styles.labelTop,
                  {color: isActive == 2 ? colors.backgroundButton : 'grey'},
                ]}
                styleButton={[
                  styles.topButton,
                  {
                    borderBottomWidth: isActive == 2 ? 3 : 0,
                    borderBottomColor:
                      isActive == 2 ? colors.backgroundButton : 'grey',
                  },
                ]}
                onPress={() => setIsActive(2)}
              />
              <CustomButton
                label={'Quá hạn'}
                styleLabel={[
                  styles.labelTop,
                  {color: isActive == 3 ? colors.backgroundButton : 'grey'},
                ]}
                styleButton={[
                  styles.topButton,
                  {
                    borderBottomWidth: isActive == 3 ? 3 : 0,
                    borderBottomColor:
                      isActive == 3 ? colors.backgroundButton : 'grey',
                  },
                ]}
                onPress={() => setIsActive(3)}
              />
              <CustomButton
                label={'Đã thanh toán'}
                styleLabel={[
                  styles.labelTop,
                  {color: isActive == 4 ? colors.backgroundButton : 'grey'},
                ]}
                styleButton={[
                  styles.topButton,
                  {
                    borderBottomWidth: isActive == 4 ? 3 : 0,
                    borderBottomColor:
                      isActive == 4 ? colors.backgroundButton : 'grey',
                  },
                ]}
                onPress={() => setIsActive(4)}
              />
            </ScrollView>
            {/* {isActive == 1 ? (
              <CustomIsActive />
            ) : isActive == 2 ? (
              <CustomOutOfDate />
            ) : isActive == 3 ? (
              <CustomLiquidated />
            ) : null} */}
          </ScrollView>
          <CustomButton
            icon={icons.ic_plus}
            styleButton={styles.styleButton}
            label={'Thêm dịch vụ mới'}
            styleLabel={styles.styleLabel}
            styleIcon={{width: 20, height: 20, tintColor: 'white'}}
            onPress={() => navigation.navigate('AddService')}
          />
        </View>
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
  styleButton: {
    backgroundColor: colors.mainColor,
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 5,
  },
  styleButton: {
    backgroundColor: colors.mainColor,
    height: 50,
    borderRadius: 10,
    marginBottom: 5,
    flexDirection: 'row',
  },
  styleLabel: {color: 'white', fontWeight: '500', marginLeft: 5},
  topButton: {marginRight: 15},
  labelTop: {color: colors.backgroundButton, fontWeight: 'bold', fontSize: 16},
});
export default BillManagement;
