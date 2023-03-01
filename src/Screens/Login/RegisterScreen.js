import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Alert,
  Text,
  ImageBackground,
} from 'react-native';
import {colors, icons, images} from '../../Constants';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../Store/slices/tokenSlice';
import CustomSuggest from '../../Components/CustomSuggest';

const RegisterScreen = () => {
  const [numberPhone, setNumberPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [agree, setAgree] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loginFuntion = async () => {
    await AsyncStorage.setItem('token', '123456').then(() => {
      navigation.navigate('HomeNavigation');
      dispatch(updateToken('123465'));
    });
  };
  return (
    <ImageBackground
      source={images.im_backgroundSplash}
      style={styles.imageContainer}>
      <View style={styles.container}>
        <CustomButton
          icon={icons.ic_back}
          styleIcon={styles.iconBack}
          styleButton={styles.buttonBack}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <CustomSuggest
          label={'Ứng dụng cho người thuê nhà'}
          styleSuggest={{marginVertical: 10}}
        />
        <View style={{width: '100%'}}>
          <Text style={styles.content}>Họ và tên</Text>
          <CustomTextInput
            styleViewTextInput={styles.styleViewTextInput}
            placeholder={'Nhập họ và tên'}
            value={numberPhone}
            onChangeText={text => setNumberPhone(text)}
          />
        </View>
        <View style={{width: '100%', marginTop: 10}}>
          <Text style={styles.content}>Số điện thoại</Text>
          <CustomTextInput
            styleViewTextInput={styles.styleViewTextInput}
            placeholder={'Nhập số điện thoại'}
            value={numberPhone}
            onChangeText={text => setNumberPhone(text)}
          />
        </View>
        <View style={{width: '100%', marginTop: 10}}>
          <Text style={styles.content}>Mật khẩu</Text>
          <CustomTextInput
            secureTextEntry={isShow ? false : true}
            styleViewTextInput={styles.styleViewTextInput}
            placeholder={'Nhập mật khẩu'}
            value={password}
            onChangeText={text => setPassword(text)}
            iconRight={isShow ? icons.ic_show : icons.ic_hide}
            styleIconRight={{width: 30, height: 30}}
            onPressIconRight={() => setIsShow(!isShow)}
          />
        </View>
        <View style={[styles.viewRow, {marginTop: 20}]}>
          <CustomButton
            styleButton={{marginRight: 8}}
            icon={agree ? icons.ic_check : icons.ic_unCheck}
            styleIcon={[
              styles.iconCheckBox,
              {tintColor: agree ? colors.backgroundButton : '#797979'},
            ]}
            onPress={() => {
              setAgree(prev => (prev == false ? true : false));
            }}
          />
          <Text style={{fontSize: 13, color: '#374047'}}>Đồng ý với </Text>
          <CustomButton
            label={'Điều khoản & Dịch vụ'}
            styleLabel={styles.labelButtonCheck}
          />
        </View>
        <CustomButton
          styleButton={styles.buttonNext}
          label={'Tiếp tục'}
          styleLabel={styles.labelButtonNext}
          onPress={() => navigation.navigate('VerifyOtpScreen')}
        />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  imageContainer: {flex: 1},
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBack: {width: 24, height: 24, tintColor: 'white'},
  buttonBack: {position: 'absolute', top: 10, left: 10},
  title: {color: colors.mainColor, fontWeight: '600', fontSize: 17},
  content: {fontSize: 15, color: '#374047'},
  styleViewTextInput: {
    height: 50,
    width: '100%',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.borderInput,
    backgroundColor: colors.backgroundInput,
    paddingHorizontal: 10,
  },
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  iconCheckBox: {width: 20, height: 20},
  labelButtonCheck: {
    color: colors.backgroundButton,
    fontWeight: '600',
    fontSize: 13,
  },
  buttonNext: {
    width: 200,
    height: 44,
    backgroundColor: colors.mainColor,
    borderRadius: 5,
    marginTop: 20,
  },
  labelButtonNext: {fontSize: 13, color: 'white'},
});
export default RegisterScreen;
