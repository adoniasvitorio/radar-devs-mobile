import React from 'react';
import { WebView } from 'react-native-webview';

function Porfile({navigation}) {
    const github_username = navigation.getParam('github_username');
    return <WebView  style={{ flex: 1 }} source={{ uri: `https://github.com/${github_username}` }} />
}

export default Porfile;