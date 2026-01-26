---
sidebar_position: 3
title: Product List Example
description: Product list with search and filters
---

# Product List Example

A complete product list with search, filters, and pull-to-refresh.

## Complete Code

```tsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  Content,
  List,
  Input,
  CommonItem,
  Button,
  Modal,
  Label,
  EmptyState,
  Skeleton,
} from '@tansuk/rott-ui';

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts(searchQuery);
  }, [searchQuery, products]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      Notification.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const filterProducts = (query) => {
    if (!query) {
      setFilteredProducts(products);
      return;
    }
    
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const showFilters = () => {
    Modal.showModal({
      id: 'filters',
      height: 70,
      slideToClose: true,
      header: { title: 'Filters' },
      children: (
        <Content paddingHorizontal={24}>
          <Input 
            name="minPrice" 
            type="amount" 
            label="Min Price" 
            marginBottom={16}
          />
          <Input 
            name="maxPrice" 
            type="amount" 
            label="Max Price" 
            marginBottom={16}
          />
          <Input 
            name="category" 
            type="select" 
            label="Category"
            options={[
              { label: 'All', value: 'all' },
              { label: 'Electronics', value: 'electronics' },
              { label: 'Clothing', value: 'clothing' },
            ]}
            marginBottom={24}
          />
          <Button 
            variant="primary" 
            size="full"
            onPress={() => {
              applyFilters();
              Modal.hideModal('filters');
            }}
          >
            Apply Filters
          </Button>
        </Content>
      ),
    });
  };

  return (
    <Container noPadding>
      <Header
        title="Products"
        leftIcon={[{ name: 'MENU', onPress: () => navigation.openDrawer() }]}
        rightIcon={[{ name: 'CART', onPress: () => navigation.navigate('Cart') }]}
      />
      
      <Content flex={1} noPadding>
        <Item paddingHorizontal={16} paddingVertical={12}>
          <Item row>
            <Input
              name="search"
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              flex={1}
              marginRight={8}
            />
            <Button
              variant="primary-outline"
              leftIcon={{ name: 'FILTER', width: 20, height: 20 }}
              onPress={showFilters}
            >
              Filters
            </Button>
          </Item>
        </Item>
        
        <List
          data={filteredProducts}
          renderItem={({ item }) => (
            <CommonItem
              title={item.name}
              subTitle={`$${item.price}`}
              description={item.description}
              leftIcon="PRODUCT"
              rightIcon="CHEVRON_RIGHT"
              onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
            />
          )}
          isLoading={isLoading}
          listSkeletonItem={
            <Item padding={16}>
              <Skeleton show width="80%" height={20} marginBottom={8} />
              <Skeleton show width="40%" height={16} marginBottom={8} />
              <Skeleton show width="60%" height={14} />
            </Item>
          }
          itemsToShow={5}
          emptyState={{
            icon: { name: 'SEARCH', width: 64, height: 64 },
            title: 'No Products Found',
            description: 'Try adjusting your search or filters',
          }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          estimatedItemSize={80}
        />
      </Content>
    </Container>
  );
}
```

## Features Demonstrated

- ✅ Search functionality
- ✅ Filter modal
- ✅ Pull-to-refresh
- ✅ Loading states with skeleton
- ✅ Empty state
- ✅ List with FlashList
- ✅ Navigation integration

## Try It Out

You can run this example in your project or try it in Expo Snack.
