import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CustomAppBar from '../../../Components/CustomAppBar';
import CustomButton from '../../../Components/CustomButton';
import CustomSearchAppBar from '../../../Components/CustomSearchAppBar';
import CustomTextInput from '../../../Components/CustomTextInput';
import {colors, icons, images} from '../../../Constants';

const BuildingManager = () => {
  const navigation = useNavigation();
  const [keyboard, setKeyboard] = useState(null);
  const [textSearch, setTextSearch] = useState('');
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Quản lý tòa nhà'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <CustomSearchAppBar
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
      />

      <Text style={styles.title}>Tòa nhà hiện có</Text>
      <ScrollView style={{paddingHorizontal: 10}}>
        <CustomRenderBuilding
          image={images.im_frame1}
          name={'Tòa nhà D1'}
          address={'448 Lê Văn Việt, Tăng Nhơn Phú A, TP. Thủ Đức'}
          numberOfRoom={12}
          emptRoom={4}
          issue={2}
          onPress={() => navigation.navigate('BuildingInformation')}
        />
      </ScrollView>
      <CustomButton
        styleButton={styles.buttonAddBuilding}
        icon={icons.ic_plus}
        styleIcon={{width: 25, height: 25, tintColor: 'white', marginRight: 5}}
        label={'Thêm tòa nhà mới'}
        styleLabel={styles.labelAddBuilding}
        onPress={() => navigation.navigate('AddBuildings')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
  },
  buttonAddBuilding: {
    flexDirection: 'row',
    height: 50,
    width: '90%',
    backgroundColor: colors.mainColor,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  labelAddBuilding: {color: 'white', fontSize: 14},
  title: {fontSize: 16, color: 'black', fontWeight: 'bold', margin: 10},
});

const CustomRenderBuilding = props => {
  const {name, address, onPress, image} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styleRender.button}>
      <Image source={image} style={styleRender.image} />
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          padding: 10,
          justifyContent: 'space-between',
        }}>
        <View style={styleRender.viewRow}>
          <Text style={styleRender.name}>{name}</Text>
          <Image source={icons.ic_plus} style={styleRender.icon} />
        </View>
        <Text style={styleRender.address}>{address}</Text>
        <View style={[styleRender.viewRow]}>
          <CustomButton
            disabled={true}
            label={'12'}
            icon={icons.ic_home}
            styleIcon={styleRender.icon}
            styleButton={styleRender.styleButton}
          />
          <CustomButton
            disabled={true}
            label={'4'}
            icon={icons.ic_key}
            styleIcon={styleRender.icon}
            styleButton={styleRender.styleButton}
          />
          <CustomButton
            disabled={true}
            label={'2'}
            icon={icons.ic_exclamation}
            styleIcon={styleRender.icon}
            styleButton={styleRender.styleButton}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styleRender = StyleSheet.create({
  button: {
    flexDirection: 'row',
    flex: 1,
    height: 200,
    alignItems: 'center',
    padding: 10,
    elevation: 1,
    zIndex: 1,
    backgroundColor: 'white',
    margin: 2,
    borderRadius: 10,
  },
  image: {width: 150, height: 180, borderRadius: 10},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {width: 20, height: 20, tintColor: 'black', marginRight: 5},
  name: {fontSize: 16, fontWeight: 'bold', color: 'black'},
  styleButton: {flexDirection: 'row', alignItems: 'center'},
  address: {fontSize: 11, color: 'grey', marginVertical: 5},
});
export default BuildingManager;
