import React, { Component } from 'react';
import { View, Text, Image, Alert, StyleSheet, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Button } from 'react-native-elements';
import AppColors from '../templates/appColors';

class BuildThumbnails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compress: 0.25,
      image: null,
      images: null
    };
  }

  pickSingle(cropit, circular = false) {
    console.log('About to select a photo');
    ImagePicker.openPicker({
      //width: 176,
      //height: 128,
      width: 1056,
      height: 768,
      mediaType: 'photo',
      cropping: cropit,
      //multiple: true,
      //circular: true,
      cropperCircleOverlay: circular,
      //compressImageMaxWidth: 1280,
      //compressImageMaxHeight: 720,
      compressImageQuality: this.state.compress,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      includeBase64: true,
      cropperToolbarColor: AppColors.mainDarkColor,
      cropperActiveWidgetColor: AppColors.mainLiteColor,
      //cropperStatusBarColor: 'red',
      //hideBottomControls: true,
      //showCropGuidelines: false,
      cropperToolbarTitle: 'Position Photo',
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: { 
          uri: image.path, 
          width: image.width, 
          height: image.height,
          size: image.size,
          mimeType: image.mime,
          created: image.modificationDate,
          base64: image.data
        },
        images: null
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }

  renderImage(image) {
    return <Image style={{ width: 308, height: 224, resizeMode: 'contain' }} source={image} />;
  }

  renderImageStats(image) {
    //const rightNow = new Date().toLocaleString('de-DE', { hour12: false });
    const fileDate = new Date(Number(image.created)).toLocaleString('de-DE', { hour12: false });
    return (
      <View style={styles.container}>
        <Text>Path: {image.uri}</Text> 
        <Text style={styles.text}>Pixels: {image.width} x {image.height}</Text> 
        <Text style={styles.text}>Compressed @: {this.state.compress * 100}%</Text> 
        <Text style={styles.text}>Size: {image.size} bytes</Text> 
        <Text style={styles.text}>Type: {image.mimeType}</Text> 
        <Text style={styles.text}>File Created: {fileDate}</Text> 
      </View>);
  }

  render() {
    return (
      <View>
        <Button title="Get an Image to Crop" onPress={() => this.pickSingle(true)} />
        <ScrollView>
          <View style={styles.container}>
            {this.state.image ? this.renderImage(this.state.image) : null}
            {this.state.image ? this.renderImageStats(this.state.image) : null}
          </View>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginBottom: 75,
    alignItems: 'center'
  },
  text: {
    fontWeight: '700',
  }
});

export default BuildThumbnails;
