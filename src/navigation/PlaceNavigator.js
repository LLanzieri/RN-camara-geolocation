import { Platform, Text, TouchableOpacity } from 'react-native'

import { COLORS } from '../constants'
import MapScreen from '../screens/MapScreen'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen'
import PlaceListScreen from '../screens/PlaceListScreen'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// screens

const PlaceStack = createNativeStackNavigator()

const PlaceNavigator = () => (
    <PlaceStack.Navigator
        initialRoute='Place'
        screenOptions={{
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? COLORS.DARK_SIENNA : '',
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.DARK_SIENNA,
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}
    >
        <PlaceStack.Screen
            name="Direcciones"
            component={PlaceListScreen}
            options={({ navigation }) => (
                {
                    title: 'Direcciones',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Nuevo')}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Crear</Text>
                        </TouchableOpacity>
                    )
                }
            )}
        />
        <PlaceStack.Screen
            name="Detalle"
            component={PlaceDetailScreen}
            options={{ title: 'Detalle direccion' }}
        />
        <PlaceStack.Screen
            name="Nuevo"
            component={NewPlaceScreen}
            options={{ title: 'Nueva direccion' }}
        />
        <PlaceStack.Screen
            name="Map"
            component={MapScreen}
            options={{ title: 'Mapa' }}
        />
    </PlaceStack.Navigator>
)


export default PlaceNavigator