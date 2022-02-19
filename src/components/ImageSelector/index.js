import { Alert, Button, Image, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import React, { useState } from 'react';

import { COLORS } from '../../constants';
import { launchCamera } from 'react-native-image-picker';

const ImageSelector = ({ onImage }) => {

    // Variable que guarda información de la foto
    const [pickerResponse, setPickerResponse] = useState();
    const IS_IOS = Platform.OS === 'ios';

    const handleTakePicture = async () => {

        // Seteo las opciones a pasar
        const options = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
        }

        let granted;

        // Pregunta por los permisos según la plataforma del celular
        if (IS_IOS) {
            granted = await request(PERMISSIONS.IOS.CAMERA);
        } else {
            granted = await request(PERMISSIONS.ANDROID.CAMERA);
        }

        // Si tengo acceso
        if (granted === RESULTS.GRANTED) {

            launchCamera(options, (res) => {

                if (!res.didCancel && !res.error) {
                    setPickerResponse(res.assets[0]);
                    onImage && onImage(res.assets[0].uri);
                }
            });

        } else {
            console.warn('Permission denied')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.preview}>

                {/* Si no saque foto, muestra cartel, sino muestra la foto */}
                {!pickerResponse ? (
                    <View style={styles.containerText}>
                        <Text>No hay una imágen seleccionada</Text>
                    </View>) : (
                    <Image style={styles.image} source={{ uri: pickerResponse.uri }} />
                )}
            </View>
            <Button title="tomar foto" color={COLORS.MAROON} onPress={handleTakePicture} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: COLORS.BLUSH,
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    },
    containerText: {
        alignItems: 'center'
    }
});

export default ImageSelector;