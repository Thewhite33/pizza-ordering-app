import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/src/assets/data/products'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CartProvider'
import { PizzaSize } from '@/src/types'

const sizes:PizzaSize[] = ['S','M','L','XL']

const ProductDetailScreen = () => {
    const [select,setSelect] = useState<PizzaSize>('M')
    const router = useRouter()
    const {id} = useLocalSearchParams()
    const {addItem} = useCart()
    const product = products.find((p) => p.id.toString() === id)
    const addToCart = () => {
        if(!product) return
        addItem(product,select)
        router.push('/cart')
    }
    if(!product){
        return <Text>Product not Found</Text>
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title:product?.name}}/>
            <Image style={styles.image} source={{uri:product.image || defaultPizzaImage}}/>
            <Text>Select Size</Text>
            <View style={styles.sizes}>
                {sizes.map(size => (
                <Pressable
                onPress={()=>setSelect(size)}
                style={[styles.size,{backgroundColor:select === size ? 'gainsboro':'white'}]} key={size}>
                    <Text style={[styles.sizetext,{color:select === size ? 'black':'gray'}]}>{size}</Text>
                </Pressable>
                ))}
            </View>
            <Text style={styles.price}>${product.price}</Text>
            <Button onPress={addToCart} text='Add to cart'/>
        </View>
    )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    image:{
        width:'100%',
        aspectRatio:1
    },
    price:{
        fontSize:20,
        fontWeight:'bold',
        marginTop:'auto'
    },
    container:{
        backgroundColor:'white',
        flex:1,
        padding:10
    },
    sizes:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginVertical:10
    },
    size:{
        backgroundColor:'gainsboro',
        width:50,
        aspectRatio:1,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center'

    },
    sizetext:{
        fontSize:20,
        fontWeight:'600'
    }
})