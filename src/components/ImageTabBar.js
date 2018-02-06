import React from 'react';
import {
  StyleSheet,
  //Image,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

  gotoNewPage(tabNum) {
    //console.log('tab number pressed: ', tabNum);
    this.props.goToPage(tabNum);
  }

  render() {
    return (
      <View>
        <View style={[styles.tabs, this.props.style]}>
          {this.props.tabs.map((tab, i) => {
            return ( 
              <TouchableOpacity key={tab} style={styles.tab} onPress={() => this.gotoNewPage(i)}>
                <Icon
                  name={`md-${tab}`}
                  size={26}
                  style={{ color: '#999' }}
                  ref={(image) => { this.images[i] = image; }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  tab: {
    //flex: 1,
    width: '16%',
    //margin: 3,
    borderRadius: 3,
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingBottom: 5,
  },
  tabs: {
    height: 35,
    flexDirection: 'row',
    backgroundColor: '#525252',
    //paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.25)',
  },
});

export default ImageTabBar;
