import React from 'react';
import {
  Modal,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import CustomSearchAppBar from '../../../Components/CustomSearchAppBar';
import {images} from '../../../Constants';

const ContractScreen = props => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.container}
        source={images.im_backgroundSearch}>
        <CustomSearchAppBar label={'Hợp đồng'} />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
});
export default ContractScreen;
