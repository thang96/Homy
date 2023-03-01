import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, icons} from '../Constants';
import CustomButton from '../Components/CustomButton';
import PuzzlePiece from '../Assets/Svgs/PuzzlePiece.svg';

const CustomAppBarHome = props => {
  const widthScreen = Dimensions.get('window').width;
  const avatar =
    'https://i.pinimg.com/550x/8d/6d/8f/8d6d8f7ab34868a5e32de2f458b103c2.jpg';
  return (
    <View style={[styles.container, {width: widthScreen}]}>
      <View style={[styles.viewAppBar, {height: 56}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={{marginRight: 10}}>
            <PuzzlePiece width={26} height={26} />
          </TouchableOpacity>
          <Text style={styles.title}>Homy</Text>
        </View>
        <CustomButton icon={icons.ic_bell} styleIcon={styles.icon} />
      </View>
      <View style={styles.viewLine} />
      <View style={[styles.viewAppBar, {height: 74}]}>
        <View>
          <Text style={{fontSize: 13, color: 'white'}}>Xin chào</Text>
          <Text style={{fontWeight: '600', color: 'white'}}>Nguyễn Văn A</Text>
        </View>
        <Image
          style={{width: 60, height: 60, borderRadius: 60}}
          source={{
            uri: avatar,
          }}
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
export default CustomAppBarHome;
