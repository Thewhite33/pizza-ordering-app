import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import Button from '@/src/components/Button'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import { Colors } from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router'

const CreateProductScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState('')
    const [image, setImage] = useState<string | null>(null);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const validateInput = () => {
        setErrors('')
        if (!name) {
            setErrors('Name is required')
            return false
        }
        if (!price) {
            setErrors('Price is required')
            return false
        }
        if (isNaN(parseFloat(price))) {
            setErrors('Price is not a number')
            return false
        }
        return true
    }
    const onCreate = () => {
        if (!validateInput()) {
            return
        }
        console.warn('Creating a product: ', name)
        console.warn('Creating a product: ', price)
        setName('')
        setPrice('')
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title:'Create Product'}}/>
            <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput value={name} onChangeText={setName} placeholder='Name' style={styles.input} />
            <Text style={styles.label}>Price</Text>
            <TextInput value={price} onChangeText={setPrice} keyboardType='numeric' placeholder='Price' style={styles.input} />
            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button onPress={onCreate} text='Create' />
        </View>
    )
}

export default CreateProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
        marginBottom: 20
    },
    label: {
        color: 'gray',
        fontSize: 16
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center'
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10
    }
})


//https://www.youtube-nocookie.com/embed/rIYzLhkG9TA?playlist=rIYzLhkG9TA&autoplay=1&iv_load_policy=3&loop=1&start=
//2.39.00