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
} from 'react-native';
import CustomAppBar from '../../../Components/CustomAppBar';
import CustomTwoButtonBottom from '../../../Components/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import {ScrollView} from 'react-native-virtualized-view';
import CustomInput from '../../../Components/CustomInput';

const AddUtilities = props => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomAppBar
          iconLeft={icons.ic_back}
          label={'Thêm tiện ích'}
          iconRight={icons.ic_bell}
          iconSecondRight={icons.ic_moreOption}
          pressIconLeft={() => navigation.goBack()}
        />
        <ScrollView style={[styles.eachContainer]}>
          <Text style={styles.content}>
            Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ
          </Text>
          <Text style={styles.textTitle}>Thông tin dịch vụ</Text>

          <CustomInput
            styleViewInput={{marginTop: 20}}
            type={'input'}
            title={'Tên tiện ích'}
            placeholder={'Nhập tên tiện ích'}
          />

          <Text style={[styles.label, {marginTop: 20}]}>Ghi chú</Text>
          <View style={styles.viewTextInput}>
            <TextInput multiline placeholder="Nhập ghi chú cho tiện ích" />
          </View>
          <View style={{marginBottom: 56}} />
        </ScrollView>

        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Xác nhận'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => {
            console.log('do some thing');
          }}
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
  content: {color: 'grey', fontSize: 14, fontWeight: '500'},
  label: {fontSize: 15, color: 'black', fontWeight: '500'},
  viewTextInput: {
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.mainColor,
    padding: 10,
  },
});
export default AddUtilities;
