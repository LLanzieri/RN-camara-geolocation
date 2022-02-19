import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react'

import { COLORS } from '../constants';
import ImageSelector from '../components/ImageSelector/index'
import LocationSelector from '../components/LocationSelector';
import { addPlace } from '../store/places.actions'
import { useDispatch } from 'react-redux';

const NewPlaceScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [location, setLocation] = useState(null);

    const handleTitleChange = (text) => setTitle(text);

    const handleSave = () => {
        dispatch(addPlace(title, image, location));
        navigation.navigate('Direcciones');
    }

    const handleOnImage = (uri) => {
        setImage(uri);
    }

    const handleOnLocation = (position) => {
        setLocation(position);
    }

    const handleOnMapLocation = () => {
        navigation.navigate('Map', {
            location: location,
        });
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Título</Text>

                <ImageSelector onImage={handleOnImage} />

                <LocationSelector onLocation={handleOnLocation} onMapLocation={handleOnMapLocation} />

                <TextInput
                    style={styles.input}
                    onChangeText={handleTitleChange}
                    value={title}
                />
                <Button title="Grabar dirección" color={COLORS.MAROON} onPress={() => handleSave()} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30,
        marginVertical: 15
    },
    label: {
        fontSize: 18,
        marginVertical: 8,
        color: '#212121',
        fontWeight: 'bold'
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 8,
        padding: 4
    }
})

export default NewPlaceScreen
