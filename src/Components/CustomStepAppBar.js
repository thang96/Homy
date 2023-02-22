import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {icons, colors} from '../Constants';

const CustomStepAppBar = props => {
  const {step} = props;
  return (
    <View style={stylesAppBar.viewContainer}>
      <View style={stylesAppBar.viewStep}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <View style={[stylesAppBar.step, {backgroundColor: 'orange'}]} />
          <View style={{height: 1, backgroundColor: 'white', flex: 1}} />
          <View
            style={[
              stylesAppBar.step,
              {backgroundColor: step >= 2 ? 'orange' : colors.mainColor},
            ]}
          />
          <View style={{height: 1, backgroundColor: 'white', flex: 1}} />
          <View
            style={[
              stylesAppBar.step,
              {backgroundColor: step >= 3 ? 'orange' : colors.mainColor},
            ]}
          />
        </View>
        <View style={stylesAppBar.viewRow}>
          <Text style={[stylesAppBar.title, {position: 'absolute', left: 0}]}>
            Thông tin
          </Text>
          <Text style={stylesAppBar.title}>Tiền nhà</Text>
          <Text style={[stylesAppBar.title, {position: 'absolute', right: 0}]}>
            Dịch vụ
          </Text>
        </View>
      </View>
    </View>
  );
};
const stylesAppBar = StyleSheet.create({
  viewContainer: {
    backgroundColor: colors.mainColor,
    height: 64,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  viewStep: {
    height: 64,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    paddingHorizontal: 10,
    borderTopWidth: 0.5,
    borderTopColor: 'white',
    width: '100%',
    justifyContent: 'center',
  },
  step: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  title: {color: 'white', fontSize: 11, alignSelf: 'center'},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 3,
  },
});
export default CustomStepAppBar;
