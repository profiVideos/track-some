import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import PictureFrame from '../images/PictureFrameBare.png';
import ItemInfo from '../images/ItemInfo.png';
import ItemNote from '../images/ItemNote.png';
import CloudShare from '../images/CloudShare.png';

//import Icon from 'react-native-vector-icons/Ionicons';
//import AppColors from '../templates/appColors';

class ImageTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.images = [];
    this.state = {
      toggled: false,
      hasloaded: false,
    };
  }

  componentDidUpdate() {
    //console.log(`Switch is: ${this.state.checked}`);
    //console.log(this.props);
    //this.props.canEdit(this.props.activeTab === 0 ? true : false);
  }

  images = [];

  pressedButton(whichOne) {
    switch (whichOne) {
      case 'photo': {
        this.gotoNewPage(0);
        break;
      }
      case 'info': {
        this.gotoNewPage(1);
        break;
      }
      case 'notes': {
        this.gotoNewPage(2);
        break;
      }
      case 'share': {
        this.gotoNewPage(3);
        break;
      }
      default: break;
    }  // ... switch ...
  }

  gotoNewPage(tabNum) {
    //console.log('tab number pressed: ', tabNum);
    this.props.goToPage(tabNum);
  }

  render() {
    //ToastAndroid.show(`Tabs: ${this.props.activeTab}`, ToastAndroid.SHORT);
    const opacity01 = (this.props.activeTab === 0 ? 0.90 : 0.45);
    const opacity02 = (this.props.activeTab === 1 ? 0.90 : 0.45);
    const opacity03 = (this.props.activeTab === 2 ? 0.90 : 0.45);
    const opacity04 = (this.props.activeTab === 3 ? 0.90 : 0.45);
    return (
      <View style={[styles.tabs, this.props.style]}>
        <TouchableOpacity activeOpacity={0.25} onPress={() => this.pressedButton('photo')}>
          <Image 
            style={[styles.imageIconStyle, { opacity: opacity01 }]} 
            source={PictureFrame} 
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.25} onPress={() => this.pressedButton('info')}>
          <Image 
            style={[styles.imageIconStyle, { opacity: opacity02 }]} 
            source={ItemInfo} 
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.25} onPress={() => this.pressedButton('notes')}>
          <Image 
            style={[styles.imageIconStyle, { opacity: opacity03 }]} 
            source={ItemNote} 
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.25} onPress={() => this.pressedButton('share')}>
          <Image 
            style={[styles.imageIconStyle, { opacity: opacity04 }]} 
            source={CloudShare} 
          />
        </TouchableOpacity>
      </View>
    );
  }

}

/*

          {this.props.tabs.map((tab, i) => {
            return ( 
              <TouchableOpacity key={tab} style={styles.tab} onPress={() => this.gotoNewPage(i)}>
                <Image 
                  style={styles.imageIconStyle} 
                  source={require('../images/ItemInfo.png')} 
                  ref={(image) => { this.images[i] = image; }}
                />
              </TouchableOpacity>
            );
          })}

                <Icon
                  name={`md-${tab}`}
                  size={26}
                  style={{ color: '#999' }}
                  ref={(image) => { this.images[i] = image; }}
                />
*/

const styles = StyleSheet.create({
  imageIconStyle: {
    height: 28,
    width: 28,
    opacity: 0.55,
    marginHorizontal: 10,
    resizeMode: 'contain'
  },
  tab: {
    //flex: 1,
    width: '16%',
    //margin: 3,
    borderRadius: 3,
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: 2,
  },
  tabs: {
    height: 32,
    flexDirection: 'row',
    backgroundColor: '#727272',
    paddingTop: 3,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.25)',
  },
});

export default ImageTabBar;
