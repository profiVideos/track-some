import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppColors from '../templates/appColors';

class EmojiTabBar extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props);
    this.icons = [];
    this.state = {
      toggled: false,
      hasloaded: false,
    };
  }

  componentDidMount() {
    this.listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
  }

  componentDidUpdate() {
    //console.log(`Switch is: ${this.state.checked}`);
    //console.log(this.props);
    //this.props.canEdit(this.props.activeTab === 0 ? true : false);
    this.props.canEdit(this.props.activeTab === 0);
  }

/*
    this.setColorValues();
*/

/*
  setColorValues() {
    if (this.props.activeTab === 0) {
      this.setState({ 
        backColor: AppColors.mainDarkColor,
        textColor: AppColors.paperColor,
        height: 30
      });
    } else {
      this.setState({ 
        backColor: 'white',
        textColor: '#333',
        height: 20
      });
    }
  }
*/

  setAnimationValue({ value }) {
    this.icons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  }

  icons = [];

  // ... cycle color between rgb(59,89,152) and rgb(204,204,204) ...
  iconColor(progress) {
    const red = (59 + (204 - 59)) * progress;
    const green = (89 + (204 - 89)) * progress;
    const blue = (152 + (204 - 152)) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  gotoNewPage(tabNum) {
    //console.log('tab number pressed: ', tabNum);
    this.props.goToPage(tabNum);
  }
/*
      const backColor = this.props.activeTab === 0 ? AppColors.mainDarkColor : 'white';
*/

  render() {
    const backColor = this.props.activeTab === 0 ? AppColors.hiliteColor : 'white';
    const hasOptionsMenu = this.props.activeTab === 0 ? this.props.optionMenu() : null;
    return (
      <View>
        <View style={[styles.tabs, this.props.style]}>
          {this.props.tabs.map((tab, i) => {
            return ( 
              <TouchableOpacity 
                key={tab} 
                style={styles.tab}
                onPress={() => this.gotoNewPage(i)}
              >
                <Icon
                  name={`md-${tab}`}
                  size={34}
                  color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
                  ref={(icon) => { this.icons[i] = icon; }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={[styles.titleContainer, { backgroundColor: backColor }]}>
          <View style={styles.titleSection}>
            <Text style={styles.emojiTitle}>{this.props.tabGroupTitle[this.props.activeTab]}</Text>
          </View>
          <View style={styles.menuTriggers}>
            {hasOptionsMenu}
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    padding: 2,
    height: 30,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleSection: {
    flex: 1,
  },
  menuTriggers: {
    padding: 3
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  emojiTitle: {
    color: '#333', 
    textAlign: 'center'
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.25)',
  },
});

export default EmojiTabBar;
