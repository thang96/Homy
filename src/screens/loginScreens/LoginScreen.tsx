import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Alert,
  Text,
  ImageBackground,
} from 'react-native';
import {colors, icons, images} from '../../constants';
import TextInputComponent from '../../components/commonComponent/TextInputComponent';
import ButtonComponent from '../../components/commonComponent/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../store/slices/tokenSlice';
import SuggestComponent from '../../components/commonComponent/SuggestComponent';
import {AuthenticationAPi}  from '../../apis/loginApi/loginApi'
import LoadingComponent from '../../components/commonComponent/LoadingComponent';
import { updateAppStatus } from '../../store/slices/appStatusSlice';
import { updateReloadStatus } from '../../store/slices/reloadSlice';

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShow, setIsShow] = useState(false);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const loginFuntion = async () => {
    setLoading(true);
    let user = {username: username, password: password};
    await AuthenticationAPi(password, username)
      .then(async (res:any) => {
        if (res?.status === 200) {
          let token = res?.data?.token;
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('user', JSON.stringify(user));
          dispatch(updateToken(token));
          dispatch(updateAppStatus('success'));
          dispatch(updateReloadStatus('login'));
          setLoading(false);
        }
      })
      .catch((error:any) => {
        Alert.alert('Lỗi', `Lỗi đăng nhập`);
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <ImageBackground
      source={images.im_backgroundLogin}
      style={styles.imageContainer}>
      {loading && <LoadingComponent />}
      <View style={[styles.container, {paddingTop: 100}]}>
        <Text style={styles.title}>Đăng nhập</Text>
        <SuggestComponent
          label={'Ứng dụng cho người thuê nhà'}
          styleSuggest={{marginVertical: 10}}
        />
        <View style={{width: '100%'}}>
          <Text style={styles.content}>Tài khoản</Text>
          <TextInputComponent
            styleViewTextInput={styles.styleViewTextInput}
            placeholder={'Nhập tài khoản'}
            value={username}
            onChangeText={(text:string) => setUsername(text)}
          />
        </View>
        <View style={{width: '100%', marginTop: 10}}>
          <Text style={styles.content}>Mật khẩu</Text>
          <TextInputComponent
            secureTextEntry={isShow ? false : true}
            styleViewTextInput={styles.styleViewTextInput}
            placeholder={'Nhập mật khẩu'}
            value={password}
            onChangeText={(text:string) => setPassword(text)}
            iconRight={isShow ? icons.ic_show : icons.ic_hide}
            styleIconRight={{width: 30, height: 30}}
            onPressIconRight={() => setIsShow(!isShow)}
          />
        </View>
        <ButtonComponent
          label={'Quên mật khẩu?'}
          styleLabel={styles.forgotPassword}
          styleButton={styles.buttonForgotPassword}
          // onPress={() => navigation.navigate('ForgotPasswordScreen')}
        />
        <ButtonComponent
          label={'Đăng nhập'}
          styleButton={styles.styleButton}
          styleLabel={styles.styleLabel}
          onPress={() => loginFuntion()}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 13, color: '#374047'}}>
            Bạn chưa có tài khoản?
          </Text>
          <ButtonComponent
            label={'Đăng ký ngay'}
            styleLabel={{fontSize: 13, color: '#55CCEF', fontWeight: '600'}}
            // onPress={() => navigation.navigate('RegisterScreen')}
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
    backgroundColor: 'white',
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
