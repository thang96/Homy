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

const LoginScreen = () => {
  const [numberPhone, setNumberPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isShow, setIsShow] = useState(false);
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
        <Text style={styles.title}>Đăng nhập</Text>
        <CustomSuggest
          label={'Ứng dụng cho người thuê nhà'}
          styleSuggest={{marginVertical: 10}}
        />
        <View style={{width: '100%'}}>
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
        <CustomButton
          label={'Quên mật khẩu?'}
          styleLabel={styles.forgotPassword}
          styleButton={styles.buttonForgotPassword}
        />
        <CustomButton
          label={'Đăng nhập'}
          styleButton={styles.styleButton}
          styleLabel={styles.styleLabel}
          onPress={() => loginFuntion()}
        />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 13, color: '#374047'}}>
            Bạn chưa có tài khoản?
          </Text>
          <CustomButton
            label={'Đăng ký ngay'}
            styleLabel={{fontSize: 13, color: '#55CCEF', fontWeight: '600'}}
            onPress={() => navigation.navigate('RegisterScreen')}
          />
        </View>
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
  styleButton: {
    width: 180,
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 5,
    marginVertical: 30,
  },
  styleLabel: {color: 'white'},
  forgotPassword: {
    fontSize: 13,
    color: colors.backgroundButton,
    alignSelf: 'flex-end',
  },
  buttonForgotPassword: {
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
  },
});
export default LoginScreen;
