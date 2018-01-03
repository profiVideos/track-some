import React, { Component } from 'react';
import { 
  View, 
  Text, 
  Image, 
  Alert, 
  StyleSheet, 
  ScrollView,
  TouchableNativeFeedback } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Button } from 'react-native-elements';
import selectCameraImage from '../images/Source-Camera.jpg';
import selectFolderImage from '../images/Source-Folder.jpg';
import AppColors from '../templates/appColors';

/*
const AppColors = {
  paperColor: '#e2e2e2',      // ... off white ...
  hiliteColor: '#fff8b2',     // ... light yellow ...
  accentColor: '#dea140',     // ... medium orange ...
  mainLiteColor: '#a32b26',   // ... medium red ...
  mainDarkColor: '#590d0b',   // ... dark red (burgundy) ...
  darkerColor: '#325a66'      // ... dark cyan ....
*/

class BuildCard extends Component {
  static navigatorStyle = {
    drawUnderNavBar: false,
    screenBackgroundColor: AppColors.paperColor,
    navBarTextColor: AppColors.accentColor,
    navBarBackgroundColor: AppColors.mainDarkColor,
    navBarTranslucent: true
  };

  constructor(props) {
    super(props);
    this.state = {
      compress: 0.25,
      image: null,
      images: null
    };
  }

/*
  componentWillMount() {
    console.log(`removed tmp image ${image.uri} from tmp directory`);
  }
*/

  pickSingle(cropit, circular = false) {
    console.log('About to select a photo');
    ImagePicker.openPicker({
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
      //compressVideoPreset: 'MediumQuality',
      includeExif: true,
      includeBase64: true,
      cropperToolbarColor: AppColors.mainDarkColor,
      cropperActiveWidgetColor: AppColors.mainLiteColor,
      //cropperStatusBarColor: 'transparent',
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
      //Alert.alert(e.message ? e.message : e);
    });
  }

  doSomeFunction() {
    Alert.alert('About to do something');
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
        <Text style={styles.text}>Compressed @ {this.state.compress * 100}%</Text> 
        <Text style={styles.text}>Size: {image.size} bytes</Text> 
        <Text style={styles.text}>Type: {image.mimeType}</Text> 
        <Text style={styles.text}>File Created: {fileDate}</Text> 
      </View>);
  }

  render() {
    return (
        <View style={styles.outerContainer}>
          <ScrollView>

          <View style={styles.cardContainer}>
            <View style={styles.buttonRow}>
              <View style={styles.columnContainer}>         
                <TouchableNativeFeedback onPress={() => this.doSomeFunction()}>
                  <View style={styles.imageContainer}>
                    <Image style={styles.imageStyle} source={selectCameraImage} />
                    <Text style={styles.buttonText}>Shoot a Photo</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={styles.columnContainer}>         
                <TouchableNativeFeedback onPress={() => this.doSomeFunction()}>
                  <View style={styles.imageContainer}>
                    <Image style={styles.imageStyle} source={selectFolderImage} />
                    <Text style={styles.buttonText}>Choose a Photo</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.normalText}>Markus is here!</Text>
            <Button title="Get an Image to Crop" onPress={() => this.pickSingle(true)} />
          </View>

          </ScrollView>
        </View>
    );
  }

}

/*

, resizeMode: 'contain'

//      <ScrollView style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => this.doSomeFunction} style={styles.photoContainer}>
          <View style={styles.cardContainer}>         
            <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component structure 
            than actual design.
            </Text>
          </View>  
*/

const styles = StyleSheet.create({
  outerContainer: {
    margin: 7,
    marginBottom: 25,
    borderRadius: 2,
    backgroundColor: 'white',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 2
  },
  cardContainer: {
    padding: 7,
    paddingBottom: 15,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 2,
    alignItems: 'center'
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: 200,
    borderRadius: 5,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    resizeMode: 'contain'
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 17,
    marginTop: -45,
    marginBottom: 25,
    fontWeight: '600',
    elevation: 2,
    color: '#858585'
  },
  columnContainer: {
    width: '50%',
    //backgroundColor: 'grey',
    alignItems: 'center'
  },
  imageContainer: {
    width: '100%',
    padding: 3,
    //backgroundColor: 'red',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 2,
    alignItems: 'center'
  },
  normalText: {
    color: 'black',
    fontWeight: '700',
  }
});

export default BuildCard;

/*
    margin: 0,
    padding: 0,

            <Button
              icon={{ name: 'code' }}
              backgroundColor='#03A9F4'
              buttonStyle={{ borderRadius: 3, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='Save Card' 
            />

    flex: 1,
const { overlapContainer, avatarContainer, avatar} = styles;

    return (
        <View style={overlapContainer}>

          <View style={avatarContainer}>
            <Image style={avatar} source={{ uri: 'http://lorempixel.com/output/cats-q-c-100-100-3.jpg' }} />
          </View>

          <View style={avatarContainer}>
            <Image style={avatar} source={{ uri: 'http://lorempixel.com/output/cats-q-c-100-100-7.jpg' }} />
          </View>

          <View style={avatarContainer}>
            <Image style={avatar} source={{ uri: 'http://lorempixel.com/output/cats-q-c-100-100-3.jpg' }} />
          </View>

          <View style={avatarContainer}>
            <Image style={avatar} source={{ uri: 'http://lorempixel.com/output/cats-q-c-100-100-7.jpg' }} />
          </View>

        </View>
    );
  }
}

const styles = {
  overlapContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    marginTop: 50,
    marginRight: 50
  },
  avatarContainer: {
    borderRadius: 33,
    height: 66,
    width: 66,
    marginLeft: -15,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'white'
  },
  avatar: {
    borderRadius: 30,
    height: 60,
    width: 60
  }
}

          <Image resizeMode='cover' source={selectSourceImage}/>
            style={styles.image} resizeMode='contain'
          image={selectSourceImage}
          imageStyle={{ height: 260 }}
          imageProps={{ resizeMode: 'contain' }}
          <Button title="Get an Image to Crop" onPress={() => this.pickSingle(true)} />
          <ScrollView>
            <View style={styles.container}>
              {this.state.image ? this.renderImage(this.state.image) : null}
              {this.state.image ? this.renderImageStats(this.state.image) : null}
            </View>
          </ScrollView>
*/
