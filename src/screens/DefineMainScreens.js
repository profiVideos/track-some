import { Navigation } from 'react-native-navigation';
import Login from './Login';
import BuildCard from './BuildCard';
import ShowCard from './ShowCard';
import EditCategories from './EditCategories';
// ... for building emojis DB - import EmojiPicker from './CreateJSONSortedEmojisFile';
import TrackSomeConfig from './drawers/SlideMenu';
import EmojiPicker from './EmojiPicker';

// ... register screens ...
export default (store, Provider) => {
  Navigation.registerComponent('tracksome.Login', () => Login, store, Provider);
  Navigation.registerComponent('tracksome.BuildCard', () => BuildCard, store, Provider);
  Navigation.registerComponent('tracksome.ShowCard', () => ShowCard, store, Provider);
  Navigation.registerComponent('tracksome.EditCategories', () => EditCategories, store, Provider);
  Navigation.registerComponent('tracksome.EmojiPicker', () => EmojiPicker, store, Provider);
  Navigation.registerComponent('tracksome.ConfigMenu', () => TrackSomeConfig, store, Provider);
};

