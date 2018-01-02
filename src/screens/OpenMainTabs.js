import { Navigation } from 'react-native-navigation';
import { getImageSource } from 'react-native-vector-icons/Ionicons';

const OpenMainTabs = () => {
    Promise.all([
        getImageSource('md-map', 30),
        getImageSource('ios-share-alt', 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: 'tracksome.BuildThumbnails',
                    label: 'Build Thumbnails',
                    title: 'Build Thumbnails',
                    icon: sources[0]
                },
                {
                    screen: 'tracksome.ShowThumbnails',
                    label: 'Show Thumbnails',
                    title: 'Show Thumbnails',
                    icon: sources[1]
                }
            ]
        });
    });
};

export default OpenMainTabs;
