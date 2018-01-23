// ... import libraries for making a component ...
import React from 'react';
import { 
  Text,
  View,
  //Platform,
  StyleSheet, 
  //TouchableHighlight, 
  TouchableNativeFeedback 
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 11, 
    color: 'white' 
  }
});

// ... make a component ...
const MDButton = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={{ alignItems: 'center' }}>
        <MaterialIcon
          size={props.iconSize}
          style={{ color: props.iconColor, padding: 0 }} 
          backgroundColor='transparent'
          name={props.iconName} 
        />
      </View>
    </TouchableNativeFeedback> 
  );
};

/*

        <Text style={styles.buttonText}>{props.textLabel}</Text>

    (Platform.OS === 'android' ? 
    <TouchableNativeFeedback onPress={whenPressed} style={containerStyle}>

          {(40,'add-to-photos','Hello') => this.showButton}

            <View style={{ alignItems: 'center' }}>
              <MaterialIcon
                size={40}
                style={{ color: 'white', padding: 0 }} 
                backgroundColor='transparent'
                name='mood' 
                onPress={this.addThisItem} 
              />
              <Text style={styles.buttonText}>props.textLabel</Text>
            </View>
      <Text style={buttonStyle}>{textLabel}</Text>

    </TouchableNativeFeedback> : 
    <TouchableHighlight onPress={whenPressed} style={containerStyle}>
    </TouchableHighlight>
*/

// ... make the component available to other parts of the app ...
export default MDButton;
