import React, { useState } from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet, Dimensions } from 'react-native';

const ProductDetailScreen = () => {
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: 'Ürün Adı',
    description: 'Ürün Açıklaması. Bu alanda ürünle ilgili detaylı bilgiler bulunabilir.',
    stock: 10,
    price: 49.99,
    images: [
      'https://as2.ftcdn.net/v2/jpg/03/15/18/09/1000_F_315180932_rhiXFrJN27zXCCdrgx8V5GWbLd9zTHHA.jpg',
      'https://as2.ftcdn.net/v2/jpg/03/15/18/09/1000_F_315180932_rhiXFrJN27zXCCdrgx8V5GWbLd9zTHHA.jpg',
      'https://as2.ftcdn.net/v2/jpg/03/15/18/09/1000_F_315180932_rhiXFrJN27zXCCdrgx8V5GWbLd9zTHHA.jpg',
    ],
  };

  const addToCart = () => {
    console.log(`Sepete eklendi: ${quantity} adet ${product.name}`);
  };

  const addToWishlist = () => {
    console.log(`İstek listesine eklendi: ${product.name}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ScrollView horizontal pagingEnabled>
          {product.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.carouselImage} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.stock}>Stok: {product.stock}</Text>
        <Text style={styles.price}>Fiyat: ${product.price}</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityText}>Miktar:</Text>
          <Button title="-" onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} />
          <Text style={styles.quantity}>{quantity}</Text>
          <Button title="+" onPress={() => setQuantity(quantity + 1)} />
        </View>
        <Button style={styles.addToCartButton} title="Sepete Ekle" onPress={addToCart} />
        <Button style={styles.addToWishlistButton} title="İstek Listesine Ekle" onPress={addToWishlist} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: Dimensions.get('window').width * 0.75, 
  },
  carouselImage: {
    width: Dimensions.get('window').width,
    height: '100%',
    resizeMode: 'stretch',
    borderWidth:1
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  stock: {
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityText: {
    fontSize: 16,
    marginRight: 8,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  addToCartButton: {
    marginTop: 16,
    backgroundColor: 'green',
  },
  addToWishlistButton: {
    marginTop: 8,
    backgroundColor: 'blue',
  },
});

export default ProductDetailScreen;