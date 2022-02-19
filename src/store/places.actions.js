// Utilizo la librería para poder almacenar la foto y que no quede guardada solamente en memoria con la libreria de FileSystem

import { MAPS_KEY } from '../constants/maps';
import RNFS from 'react-native-fs';

export const ADD_PLACE = 'ADD_PLACE'

export const addPlace = (title, image, location) => {
    const { latitude, longitude } = location;

    return async dispatch => {

        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_KEY}`);

        // Si no tengo respuesta, no se pudo obtener la dirección
        if (!response.ok) throw new Error('No se ha podido obtener la dirección');

        // Acá guardo el resultado que me devuelve
        const resData = await response.json();

        // La ubicación puede ser incorrecta o indefinida (ej: la calle no esta mapeada)
        if (!resData.results) throw new Error('No se ha podido obtener la dirección');

        // Formateo la dirección
        const address = resData.results[0].formatted_address;

        console.warn(address);

        const fileName = image.split('/').pop();
        const Path = `file:///${RNFS.DocumentDirectoryPath}/${fileName}`;

        // Hago la consulta que espera que por la respuesta, por eso se hace asíncrono
        try {

            // La imágen en "image" la va a copiar en el directorio que tenga en "Path"
            await RNFS.copyFile(image, Path);

            // Mando a ejecutar la action de "Agregar Lugar" y le paso TITULO, IMÁGEN, DIRECCIÓN Y COORDENADAS
            dispatch({
                type: ADD_PLACE,
                payload: {
                    title,
                    image: Path,
                    address,
                    latitude,
                    longitude
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
}