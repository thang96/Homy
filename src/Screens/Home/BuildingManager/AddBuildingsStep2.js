import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import CustomAppBar from '../../../Components/CustomAppBar';
import CustomButton from '../../../Components/CustomButton';
import CustomManagerInfor from '../../../Components/CustomManagerInfor';
import CustomModalDateTimePicker from '../../../Components/CustomModalDateTimePicker';
import CustomStepAppBar from '../../../Components/CustomStepAppBar';
import CustomInputText from '../../../Components/CustomTextInput';
import CustomTwoButtonBottom from '../../../Components/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../../Components/CustomModalCamera';
import {uuid} from '../../../utils/uuid';
import CustomInput from '../../../Components/CustomInput';
import CustomTimeButtons from '../../../Components/CustomTimeButton';

const AddBuildingsStep2 = props => {
  const navigation = useNavigation();
  const [toDay, setToDay] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [toDayValue, setToDayValue] = useState('');
  const [fromDateValue, setFromDateValue] = useState('');
  const [toDateValue, setToDateValue] = useState('');
  const [modalToDay, setModalToDay] = useState(false);
  const [modalFromDate, setModalFromDate] = useState(false);
  const [modalToDate, setModalToDate] = useState(false);

  function dateToYMD(value) {
    var d = value.getDate();
    var m = value.getMonth() + 1; //Month from 0 to 11
    var y = value.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }
  useEffect(() => {
    let newToday = dateToYMD(toDay);
    setToDayValue(newToday);
    setFromDateValue(newToday);
    setToDateValue(newToday);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {modalToDay && (
        <CustomModalDateTimePicker
          onCancel={() => setModalToDay(false)}
          value={toDay}
          mode={'date'}
          openPicker={modalToDay}
          onDateChange={value => {
            let newToday = dateToYMD(value);
            setToDay(value);
            setToDayValue(newToday);
          }}
          onPress={() => setModalToDay(false)}
        />
      )}
      {modalFromDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalFromDate(false)}
          value={fromDate}
          mode={'date'}
          openPicker={modalFromDate}
          onDateChange={value => {
            let newToday = dateToYMD(value);
            setFromDate(value);
            setFromDateValue(newToday);
          }}
          onPress={() => setModalFromDate(false)}
        />
      )}
      {modalToDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalToDay(false)}
          value={toDay}
          mode={'date'}
          openPicker={modalToDay}
          onDateChange={value => {
            let newToday = dateToYMD(value);
            setToDay(value);
            setToDayValue(newToday);
          }}
          onPress={() => setModalToDay(false)}
        />
      )}
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomAppBar
          iconLeft={icons.ic_back}
          label={'Thiết lập tiền nhà'}
          iconRight={icons.ic_bell}
          iconSecondRight={icons.ic_moreOption}
          pressIconLeft={() => navigation.goBack()}
        />
        <CustomStepAppBar step={2} />
        <ScrollView style={[styles.eachContainer]}>
          <Text style={styles.content}>
            Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc
          </Text>
          <Text style={styles.textTitle}>Thiết lập tiền nhà</Text>

          <CustomInput
            type={'button'}
            styleViewInput={{marginTop: 10}}
            title={'Ngày chốt tiền'}
            placeholder={'Chọn ngày'}
            value={toDayValue}
            onPress={() => setModalToDay(true)}
          />

          <CustomTimeButtons
            styleContainer={{marginTop: 20}}
            title={'Thời gian nộp tiền phòng'}
            leftLabel={'Từ'}
            rightLabel={'Đến'}
            styleButtonLeft={{marginRight: 5}}
            styleButtonRight={{marginLeft: 5}}
            valueLeft={fromDateValue}
            valueRight={toDateValue}
            onPressLeft={() => setModalFromDate(true)}
            onPressRightt={() => setModalToDate(true)}
          />
        </ScrollView>
        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Tiếp tục'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => navigation.navigate('AddBuildingsStep3')}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
  textTitle: {color: '#173b5f', fontSize: 16, fontWeight: 'bold'},
  content: {color: 'grey', fontSize: 14},
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'grey',
    paddingHorizontal: 5,
  },
  time: {
    backgroundColor: '#ebedee',
    borderRadius: 5,
    color: 'black',
    fontSize: 14,
  },
  title: {fontWeight: 'bold', fontSize: 16, color: '#163a5f'},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default AddBuildingsStep2;
