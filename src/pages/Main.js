import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main({ navigation }) {

    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
           const { granted } = await requestPermissionsAsync();

           if(granted) {
               const { coords } = await getCurrentPositionAsync({
                   enableHighAccuracy: true,
               });

               const { latitude, longitude } = coords;

               setCurrentRegion({
                   latitude,
                   longitude,
                   latitudeDelta: 0.04,
                   longitudeDelta: 0.04, 
               })

           }
        }
        loadInitialPosition();
    }, [])

    if(!currentRegion) {
        return null;
    }

    return (
    <MapView initialRegion={currentRegion} style={styles.map}>
        <Marker coordinate={{ latitude: -23.2029301, longitude: -46.8126656 }}>
            <Image style={styles.avatar} source={{ uri: 'https://avatars.githubusercontent.com/u/46370687?v=4' }} />
            <Callout onPress={() => {
                navigation.navigate('Profile', { github_username: 'adoniasvitorio' });
            }} >
                <View style={styles.callout}>
                    <Text style={styles.devName} >Adonias Vitorio</Text>
                    <Text style={styles.devBio} >Fullstack Developer, passionate about music and tech.</Text>
                    <Text style={styles.devTechs} >NodeJS, ReactJS, React Native</Text>
                </View>
            </Callout>
        </Marker>
    </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
        borderWidth: 5,
        borderColor: '#fff'
    },

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devtechs: {
        marginTop: 5,
    }
})

export default Main;