import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import ButtonComponent from '../commonComponent/ButtonComponent';
import {icons, colors} from '../../constants';

const AppBarSearchComponent = (props: any) => {
  const {label, onPressBack} = props;
  return (
    <View
      style={{
        minHeight: 134,
        paddingHorizontal: 10,
      }}>
      <View style={styles.styleAppBar}>
        <ButtonComponent
          icon={icons.ic_back}
          styleIcon={styles.icon}
          onPress={onPressBack}
        />
        <Text style={styles.label}>{label}</Text>
        {/* <ButtonComponent icon={icons.ic_bell} styleIcon={[styles.icon]} /> */}
      </View>
      <View style={styles.viewLine} />
      <View style={[styles.viewRow, {marginTop: 10}]}>
        <View style={[styles.viewRow, styles.viewSearch]}>
          <Image
            source={icons.ic_search}
            style={[styles.icon, {tintColor: colors.mainColor}]}
          />
          <TextInput placeholder="Tìm kiếm..." style={{flex: 1}} />
        </View>
        <ButtonComponent
          styleButton={styles.buttonOption}
          icon={icons.ic_option}
          styleIcon={{width: 24, height: 24, tintColor: 'white'}}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  styleAppBar: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {width: 24, height: 24, tintColor: '#374047'},
  label: {
    color: '#374047',
    marginLeft: 8,
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
  },
  viewLine: {
    width: '100%',
    height: 0.5,
    backgroundColor: 'white',
    position: 'absolute',
    top: 56,
    alignSelf: 'center',
  },
  viewRow: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewSearch: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonOption: {
    backgroundColor: colors.mainColor,
    width: 50,
    height: 50,
    borderRadius: 8,
    marginLeft: 10,
  },
});
export default AppBarSearchComponent;
