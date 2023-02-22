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

const LoginScreen = () => {
  const [username, setUsername] = useState('');
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
    <View style={styles.container}>
      <ImageBackground
        source={images.im_backgroundSplash}
        style={styles.imageContainer}>
        <Text style={styles.title}>Đăng nhập/ Đăng ký</Text>
        <View style={{width: '90%', marginTop: 30}}>
          <Text style={styles.content}>Tài khoản</Text>
          <CustomTextInput
            styleViewTextInput={styles.styleViewTextInput}
            placeholder={'nhập tài khoản'}
            value={username}
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View style={{width: '90%', marginTop: 15}}>
          <Text style={styles.content}>Mật khẩu</Text>
          <CustomTextInput
            secureTextEntry={isShow ? false : true}
            styleViewTextInput={styles.styleViewTextInput}
            placeholder={'nhập mật khẩu'}
            value={password}
            onChangeText={text => setPassword(text)}
            iconRight={isShow ? icons.ic_show : icons.ic_hide}
            styleIconRight={{width: 30, height: 30}}
            onPressIconRight={() => setIsShow(!isShow)}
          />
        </View>
        <CustomButton
          label={'Tiếp tục'}
          styleButton={styles.styleButton}
          styleLabel={styles.styleLabel}
          onPress={() => loginFuntion()}
        />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  imageContainer: {justifyContent: 'center', alignItems: 'center', flex: 1},
  title: {color: colors.backgroundButton, fontWeight: 'bold', fontSize: 18},
  content: {color: 'black', fontSize: 15},
  styleViewTextInput: {
    height: 50,
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    paddingHorizontal: 10,
  },
  styleButton: {
    width: 180,
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 5,
    marginTop: 50,
  },
  styleLabel: {color: 'white'},
});
export default LoginScreen;
