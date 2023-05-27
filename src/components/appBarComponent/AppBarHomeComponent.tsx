import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, icons} from '../../constants';
import ButtonComponent from '../commonComponent/ButtonComponent';

const AppBarHomeComponent = (props: any) => {
  const {userName, avatarImage} = props;
  const widthScreen = Dimensions.get('window').width;
  return (
    <View style={[styles.container, {width: widthScreen}]}>
      <View style={[styles.viewAppBar, {height: 56}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={{marginRight: 0}}>
            <Image source={icons.ic_logoApp} style={{width: 25, height: 25}} />
          </TouchableOpacity>
          <Text style={styles.title}>Homy</Text>
        </View>
        <ButtonComponent icon={icons.ic_bell} styleIcon={styles.icon} />
      </View>
      <View style={styles.viewLine} />
      <View style={[styles.viewAppBar, {height: 74}]}>
        <View>
          <Text style={{fontSize: 13, color: 'white'}}>Xin chào</Text>
          <Text style={{fontWeight: '600', color: 'white'}}>{userName}</Text>
        </View>
        <Image
          style={{width: 60, height: 60, borderRadius: 60}}
          source={
            typeof avatarImage == 'string' ? {uri: avatarImage} : icons.ic_user
          }
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 130,
    paddingHorizontal: 10,
    backgroundColor: colors.mainColor,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  viewAppBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#77d5d2',
    position: 'absolute',
    top: 56,
    alignSelf: 'center',
  },
  title: {color: 'white', fontSize: 17, fontWeight: '600'},
  icon: {width: 24, height: 24, tintColor: 'white'},
});
export default AppBarHomeComponent;
