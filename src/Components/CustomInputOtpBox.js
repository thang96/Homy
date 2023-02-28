import React, {useEffect, useRef, useState} from 'react';
import {View, TextInput, Keyboard, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../Constants';

const CustomInputOtpBox = props => {
  const {changeValue} = props;
  const otp1Ref = useRef();
  const otp2Ref = useRef();
  const otp3Ref = useRef();
  const otp4Ref = useRef();
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [verifyOtp, setVerifyOtp] = useState('');
  useEffect(() => {
    otp1Ref.current.focus();
  }, []);

  useEffect(() => {
    setVerifyOtp(`${otp1}${otp2}${otp3}${otp4}`);
  }, [otp4]);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 50,
        width: 200,
      }}>
      <TextInput
        maxLength={1}
        ref={otp1Ref}
        style={styles.textInput}
        onChangeText={otp1 => {
          setOtp1(otp1);
          if (otp1 != '') {
            otp2Ref.current.focus();
          }
        }}
      />
      <TextInput
        maxLength={1}
        ref={otp2Ref}
        style={styles.textInput}
        onChangeText={otp2 => {
          setOtp2(otp2);
          if (otp2 == '') {
            // otp2Ref.current.blur();
            otp1Ref.current.focus();
          }
          if (otp2 != '') {
            otp3Ref.current.focus();
          }
        }}
      />
      <TextInput
        maxLength={1}
        ref={otp3Ref}
        style={styles.textInput}
        onChangeText={otp3 => {
          setOtp3(otp3);
          if (otp3 == '') {
            // otp3Ref.current.blur();
            otp2Ref.current.focus();
          }
          if (otp3 != '') {
            otp4Ref.current.focus();
          }
        }}
      />
      <TextInput
        maxLength={1}
        ref={otp4Ref}
        style={styles.textInput}
        onChangeText={otp4 => {
          setOtp4(otp4);
          if (otp4 == '') {
            otp3Ref.current.focus();
            // otp4Ref.current.blur();
          }
          if (otp4 != '') {
            otp4Ref.current.blur();
            changeValue(verifyOtp);
          }
        }}
      />
      <TouchableOpacity
        style={{height: 44, width: 44, marginLeft: 10, backgroundColor: 'red'}}
        onPress={() => changeValue(verifyOtp)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    width: 32,
    height: 44,
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: 4,
  },
});
export default CustomInputOtpBox;
