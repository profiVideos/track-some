import { Navigation } from "react-native-navigation";

import Login from "./src/screens/Login";

// ... register screens ...
Navigation.registerComponent("tracksome.Login", () => Login)

// ... start a Navigation App ...
Navigation.startSingleScreenApp({
  screen: {
    screen: "tracksome.Login",
    title: "track!some",
    navigatorStyle: {
      navBarHidden: true,
      statusBarHidden: true,
      screenBackgroundColor: '#222222'
    }
  },
  animationType: 'fade'
});