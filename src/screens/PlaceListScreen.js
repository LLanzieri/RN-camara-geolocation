import { FlatList, StyleSheet, Text, View } from 'react-native';

import PlaceItem from '../components/PlaceItem/index'
import React from 'react'
import { useSelector } from 'react-redux'

const PlaceListScreen = ({ navigation }) => {

    // Traigo de la store todos los lugares que tengo guardados
    const places = useSelector(state => state.places.places);
    console.warn(places);

    const onSelectDetail = () => {
        navigation.navigate('Detalle')
    }

    const renderItem = ({ item }) => (
        <PlaceItem
            title={item.title}
            image={item.image}
            address={item.address}
            onSelect={onSelectDetail}
        />
    )

    return (
        <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PlaceListScreen
