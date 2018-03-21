import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  View, 
  Text,
  Image,
  //Alert,
  Switch,
  //Button,
  NetInfo,
  ScrollView,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  ImageBackground,
  ActivityIndicator,
  TouchableNativeFeedback
} from 'react-native';

//import Icon from 'react-native-vector-icons/FontAwesome';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import profiGraphicsLogo from '../../images/profiGraphics-logo-257w.png';
import photoDropsLogo from '../../images/photoDrops.png';
import menuBackgroundImage from '../../images/menu-Background-1000w.jpg';
import loginBackgroundImage from '../../images/login-Background.jpg';
import AppColors from '../../templates/appColors';
import Loader from '../../components/common/Loader';
import Login from '../../components/Login';
import { SyncFilesWithCloud } from '../../components/SyncDataFiles';
import {
  loginUser,
  logoutUser,
  emailChanged,
  subscribeUser,
  usernameChanged,
  passwordChanged,
  startBackupSync,
  connectionState,
  //finishBackupSync,
  loginErrorMessage
} from '../../store/actions';

const whatDoYouNeed = state => {
  return {
    login: state.login,     // ... the whole login state - see comment following ...
    myEmojis: state.emojis.myEmojis
  };
};

/*
state.login = { 
  email: 'markus@profiphotos.com',
  password: '',
  errorMsg: '',
  errorCode: 0,
  user: null,           // ... this is where the firebase user info is kept ...
  loading: true,        // ... awaiting login state from firebase ...
  saveMode: 'local',    // ... none, local, cloud, liveSync ...
  didLogin: false
};
*/

class TrackSomeConfig extends Component {
  constructor(props) {
    super(props);
    this.onPressLogin = this.onPressLogin.bind(this);
    this.onPressSwitch = this.onPressSwitch.bind(this);
    this.onPressLogout = this.onPressLogout.bind(this);
    this.onPressBackup = this.onPressBackup.bind(this);
    this.state = {
      verify: '',
      toggled: false,
      doLogin: false,
      subscribe: false,
      scrWidth: Dimensions.get('window').width,
      scrHeight: Dimensions.get('window').height,
      viewMode: this.scrHeight > this.scrWidth ? 'portrait' : 'landscape'
    };
  }
  
  componentWillMount() {
    this.props.dispatch(connectionState(NetInfo.isConnected));
  }

  componentDidMount() {
    console.log('Slide Menu Props: ', this.props);
    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);    
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
  }

  onPressBackup() {
    if (this.props.login.connected) {
      // ... 21.03.2018 - MG - now backup will first do a restore / sync (if required) ...
      this.props.dispatch(startBackupSync());
      SyncFilesWithCloud(this.props.login.user.uid, this.props.dispatch);
    } else {
      ToastAndroid.show('No Internet Connection!', ToastAndroid.SHORT);
    }
  }

  onPressLogin() {
    //ToastAndroid.show(`Login: ${this.props.login.email}`, ToastAndroid.SHORT);
    //ToastAndroid.show('Login / Logout the user ...', ToastAndroid.SHORT);
    const notValid = 'The email address entered is not valid!';
    if (!this.isValidEmail(this.props.login.email)) {
      this.props.dispatch(loginErrorMessage(notValid));
      return;
    }
    const tooShort = 'The password must be at least 10 alphanumeric characters!';
    if (this.props.login.password === '' || this.props.login.password.length < 10) {
      this.props.dispatch(loginErrorMessage(tooShort));
      return;
    }
    if (this.state.subscribe) {
      this.props.dispatch(subscribeUser(
        this.props.login.email, 
        this.props.login.password,
        this.props.login.username
      ));
    } else {
      this.props.dispatch(loginUser(this.props.login.email, this.props.login.password));
    }
  }

  onPressLogout() {
    this.props.dispatch(logoutUser());
  }

  onPressSwitch(register) {
    this.setState({ doLogin: !register, subscribe: !register });
  }

  emailChanged(text) {
    this.props.dispatch(emailChanged(text));
  }

  passwordChanged(text) {
    this.props.dispatch(passwordChanged(text));
  }

  usernameChanged(text) {
    this.props.dispatch(usernameChanged(text));
  }

/*
// ... how to check if a document exists ...
// ... used as part of a deletion check which is a problem for firestore ...
// ... perhaps I need to keep a local copy of stuff that we need to delete from ...
// ... the server and then when we have an internet connectionm delete the backlog ...
// ... of stuff that's been deleted on the device but not yet in the cloud ...
var cityRef = db.collection('cities').doc('SF');

var getDoc = cityRef.get()
    .then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            console.log('Document data:', doc.data());
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
*/

  handleConnectionChange = (isConnected) => {
    this.props.dispatch(connectionState(isConnected));
  };

  handleSaveMode(newMode) {
    console.log(newMode);
    //this.props.setNewSaveMode((newMode ? 'local' : 'none'));
  }

  doLogin(register) {
    this.setState({ doLogin: true, subscribe: register });
  }

  isValidEmail(email) {
    return email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
  }

  showSpinner() {
    return <Loader size='large' />;
  }

  showSyncState() {
    return (
      <View style={styles.syncActivity}>
        <ActivityIndicator size={'small'} />
        <View style={styles.syncText}>
          <Text style={{ fontSize: 11 }}>Syncing your files ...</Text>
        </View>
      </View>
    );
  }

  renderLogin() {
    if (this.props.login.user !== null) return;   // ... exit if we are already logged in ...
    const imgHeight = this.state.scrHeight / 1.5;
    const btnText = this.state.subscribe ? 'Register' : 'Login';
    const otherOptions = this.state.subscribe ? 
      'Show All Signup Options' : 'Switch to Create Account';
    return (
      <ImageBackground 
        source={loginBackgroundImage} 
        style={[styles.loginImage, { height: imgHeight }]}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View style={styles.clearBackground}>
          <Login 
            verify={this.state.subscribe}
            email={this.props.login.email}
            username={this.props.login.username}
            password={this.props.login.password}
            errorMsg={this.props.login.errorMsg}
            onEmailChange={text => this.emailChanged(text)}
            onUsernameChange={text => this.usernameChanged(text)}
            onPasswordChange={text => this.passwordChanged(text)}
          />
          { this.props.login.loading ? this.showSpinner() : null }
          <View style={styles.buttonContainer}>
            <View style={styles.loginButtons}>
              <TouchableNativeFeedback onPress={this.onPressLogin}>
                <View style={styles.warmButton}>
                  <Text style={styles.warmText}>{btnText}</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => this.onPressSwitch(this.state.subscribe)}>
                <View style={styles.whiteButton}>
                  <Text style={styles.commandText}>{otherOptions}</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={styles.logoSignup}>
            <Image 
              source={photoDropsLogo} 
              style={styles.logoContainer} 
              imageStyle={styles.logoStyle} 
            />
          </View>
        </View>
      </ImageBackground>
    );
  }

  renderChooseLogin() {
    if (this.props.login.user !== null) return;   // ... exit if we we are already logged in ...
    const imgHeight = this.state.scrHeight / 1.5;
    return (
      <ImageBackground 
        source={loginBackgroundImage} 
        style={[styles.loginImage, { height: imgHeight }]}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View style={styles.backgroundCover}>

          <View style={{ alignItems: 'center' }}>
            <Image 
              source={photoDropsLogo} 
              style={{ height: 130, width: 130 }} 
              imageStyle={styles.logoStyle} 
            />
          </View>

          <View style={styles.explainContainer}>
            <Text style={styles.signupText}>
              Create an account and login to enable additional features within this app.
            </Text>
            <Text style={styles.linkText}>
              Further details can be found here.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableNativeFeedback onPress={() => this.doLogin(true)}>
              <View style={styles.warmButton}>
                <Text style={styles.warmText}>Create Account with Email</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this.doLogin(false)}>
              <View style={styles.warmButton}>
                <Text style={styles.warmText}>Login with Email</Text>
              </View>
            </TouchableNativeFeedback>
          </View>

        </View>
      </ImageBackground>
    );
  }

/*
*/

  renderTopBanner() {
    if (this.props.login.user === null) return;   // ... exit if NOT logged in ...
    const imgHeight = this.state.scrHeight / 3;
    return (
      <ImageBackground 
        source={menuBackgroundImage} 
        style={[styles.backgroundImage, { height: imgHeight }]}
        imageStyle={{ resizeMode: 'cover' }}
      >
        { this.props.login.syncing ? this.showSyncState() : null }
        <View style={styles.mainContainer}>
          <View style={styles.identityContainer}>
            <Image 
              source={photoDropsLogo} 
              style={styles.logoContainer} 
              imageStyle={styles.logoStyle} 
            />
          </View>
          <TouchableNativeFeedback onPress={this.onPressBackup}>
            <View style={styles.warmButton}>
              <Text style={styles.warmText}>Sync / Backup</Text>
            </View>
          </TouchableNativeFeedback> 
          <TouchableNativeFeedback onPress={this.onPressLogout}>
            <View style={styles.warmButton}>
              <Text style={styles.warmText}>Logout</Text>
            </View>
          </TouchableNativeFeedback>
        </View> 
      </ImageBackground>
    );
  }

/*
*/

  render() {
    //ToastAndroid.show(`Logged in User: ${this.props.login.user}`, ToastAndroid.SHORT);
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={styles.container}>

            { this.state.doLogin ? this.renderLogin() : this.renderChooseLogin() }
            { this.renderTopBanner() }
            <View style={[styles.lineStyle, { width: '75%' }]} />

            <View style={styles.configContainer}>

              <Text style={styles.title}>Configuration Settings</Text>
              <View style={styles.optionRow}>
                <Text style={styles.optionText}>User successfully logged in</Text>
                <Switch 
                  //onValueChange={(value) => this.setState({ loggedIn: value })}
                  value={this.props.login.user !== null}   // ... we are logged in ...
                /> 
              </View>
              <View style={styles.optionRow}>
                <Text style={styles.optionText}>Save information locally</Text>
                <Switch 
                  onValueChange={(value) => this.handleSaveMode(value)} 
                  value={(this.props.login.saveMode === 'local' || 
                          this.props.login.saveMode === 'cloud')} 
                /> 
              </View>
              <View style={styles.optionRow}>
                <View style={styles.infoColumns}>
                  <Text style={styles.optionText}>Save information in Cloud</Text>
                  <Text style={styles.explainText}>
                    An active internet connection is required for this functionality.
                    (also a paid customer)
                  </Text>
                </View>
                <Switch 
                  onValueChange={(value) => this.setState({ toggled: value })} 
                  value={this.state.toggled} 
                  //value={(this.props.saveMode === 'none')} 
                /> 
              </View>
              <View style={styles.optionRow}>
                <Text>More config options here!</Text>
              </View>

            </View>

          </View>
        </ScrollView>
    );
  }

}

export default connect(whatDoYouNeed)(TrackSomeConfig);

/*

ACTION IS;
export const getSaveMode = () => {
  return {
    type: GET_SAVE_MODE
  };
};

<imagebackground source="{require" ('..="" images="" images.jpg')}="" 
  style="{styles.backgroundImage}">
<keyboardavoidingview behavior="padding" 
  style="{styles.container}" contentcontainerstyle="{styles.content}">
......
</keyboardavoidingview>
</imagebackground>

const AppColors = {
  paperColor: '#e2e2e2',      // ... off white ...
  hiliteColor: '#fff8b2',     // ... light yellow ...
  accentColor: '#dea140',     // ... medium orange ...
  mainLiteColor: '#a32b26',   // ... medium red ...
  mainDarkColor: '#590d0b',   // ... dark red (burgundy) ...
  darkerColor: '#325a66'      // ... dark cyan ....

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const styles = StyleSheet.create({

  backgroundImage: {
   flex: 1,
   position: 'absolute',
   resizeMode: 'cover',
   width: viewportWidth,
   height: viewportHeight,
   backgroundColor: 'transparent',
   justifyContent: 'center',
   alignItems: 'center'
  },

*/

const styles = StyleSheet.create({
  syncActivity: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 5,
    paddingTop: 6,
    elevation: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncText: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    //backgroundColor: AppColors.paperColor
  },
  commandText: {
    fontSize: 11,
    fontWeight: '500',
    margin: 5,
    textAlign: 'center',
    //borderBottomWidth: 1.25,
    color: '#333',
    //borderBottomColor: AppColors.darkerColor,
  },
  linkText: {
    fontSize: 13,
    fontWeight: '500',
    margin: 5,
    textAlign: 'center',
    borderBottomWidth: 1.25,
    color: AppColors.accentColor,
    borderBottomColor: AppColors.accentColor,
  },
  signupText: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: AppColors.paperColor
  },
  explainContainer: {
    width: '90%',
    marginTop: 18,
    marginBottom: 6,
    alignItems: 'center'
  },
  clearBackground: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundCover: {
    flex: 1,
    width: '100%',
    //marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)'
  },
  loginImage: {
    flex: 1,
    //opacity: 0.5,
    //position: 'absolute',
    width: '100%',
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginButtons: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
    //backgroundColor: 'red'
    //alignSelf: 'center',
  },
  logoContainer: {
    width: 75,
    height: 75,
    //backgroundColor: 'blue'
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'italic',
    color: AppColors.darkerColor
  },
  logoStyle: {
    elevation: 5,
    resizeMode: 'contain' 
  },
  lineStyle: {
    margin: 12,
    borderWidth: 0.55,
    alignSelf: 'center',
    borderColor: '#aaa'
  },
  logoSignup: {
    left: 10,
    bottom: 10,
    position: 'absolute',
  },
  identityContainer: {
    //flexDirection: 'row',
    //alignItems: 'stretch',
    paddingRight: 10,
    //justifyContent: 'flex-end'
  },
  warmText: {
    fontSize: 14,
    fontWeight: '500',
    color: AppColors.hiliteColor
  },
  whiteButton: {
    elevation: 2,
    paddingVertical: 0,
    paddingBottom: 1,       // ... just looks better ...
    paddingHorizontal: 5,
    borderRadius: 3,
    margin: 3,              // ... so we can see shadow ...
    backgroundColor: 'rgba(255,255,255,.70)'
  },
  warmButton: {
    elevation: 2,
    paddingVertical: 5,
    paddingBottom: 6,       // ... just looks better ...
    paddingHorizontal: 15,
    borderRadius: 5,
    margin: 5,              // ... so we can see shadow ...
    //marginHorizontal: 7,
    backgroundColor: AppColors.mainDarkColor
  },
  configContainer: {
    paddingHorizontal: 15,
  },
  mainContainer: {
    width: '100%',
    //paddingVertical: 15,
    //paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buttonContainer: {
    width: '100%',
    //paddingVertical: 15,
    //paddingHorizontal: 10,
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backgroundImage: {
    flex: 1,
    //position: 'absolute',
    width: '100%',
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,
    //marginTop: '70%',
    marginBottom: 25,
    //padding: 12,
  },
  title: {
    color: AppColors.darkerColor,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: '700',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 2,
  },
  optionRow: {
    flex: 1,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'   // ... top to bottom ...
  },
  infoColumns: {
    width: '80%',
    flexDirection: 'column'
  },
  explainText: {
    fontStyle: 'italic',
    marginTop: -3
  },
  optionText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  portrait: {
    width: 180,
    height: 38
  },
  landscape: {
    width: 180,
    height: 38
  }
});

/*
  deleteCloudFiles() {
    // ... deletes the whole userid collection ...
    const userId = this.props.login.user.uid;
    ToastAndroid.show(`UserId: ${userId}`, ToastAndroid.SHORT);
    const userData = firebase.firestore().collection('photoDrops').doc(userId);
    //const emojiData = userData.collections('Emojis');
    userData.collection('Emojis').doc('21e2-53dd-3a38').delete();
    //emojiData.delete();
    //userData.delete();  // ... finally delete the main collection ...
  }

$scope.deleteClip = function(docId) {
if (docId === undefined) {
docId = $scope.movieOrTvShow + '_' + $scope.clipInMovieModel;
}
$scope.languageVideos = longLanguageFactory.toController($scope.language) + 'Videos';
var promises = [];
firebase.firestore().collection($scope.languageVideos).doc($scope.movieOrTvShow)
  .collection('Video Clips').doc(docId).collection('SentenceTranslations').get()
.then(function(translations) {
  translations.forEach(function(doc) {
    console.log(doc.id);
    promises.push(firebase.firestore().collection($scope.languageVideos)
      .doc($scope.movieOrTvShow).collection('Video Clips').doc(docId)
      .collection('SentenceTranslations').doc(doc.id).delete());
  });
});
firebase.firestore().collection($scope.languageVideos).doc($scope.movieOrTvShow)
  .collection('Video Clips').doc(docId).collection('SentenceExplanations').get()
.then(function(explanations) {
  explanations.forEach(function(doc) {
    console.log(doc.id);
    promises.push(firebase.firestore().collection($scope.languageVideos)
    .doc($scope.movieOrTvShow).collection('Video Clips').doc(docId)
    .collection('SentenceExplanations').doc(doc.id).delete());
  });
});
Promise.all(promises).then(function() {
  console.log("All subcollections deleted.");
  firebase.firestore().collection($scope.languageVideos).doc($scope.movieOrTvShow)
  .collection('Video Clips').doc(docId).delete()
  .then(function() {
    console.log("Collection deleted.");
    $scope.clipInMovieModel = null;
    $scope.$apply();
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message);
  });
})
.catch(function(error){
  console.log("Error deleting subcollections: " + error);
});
};
*/
