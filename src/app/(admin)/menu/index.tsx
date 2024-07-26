import { FlatList, View } from 'react-native';
import ProductListItem from '@/src/components/ProductListItem';
import products from '@/src/assets/data/products';


export default function HomeScreen() {
  return (
    <View>
      <FlatList
      data={products}
      renderItem={({item}) => <ProductListItem product={item}/>}
      numColumns={2}
      contentContainerStyle={{gap:10,padding:10}}
      columnWrapperStyle={{gap:10}}
      />
    </View>
  );
}

