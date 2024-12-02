'use client'; // Mark this component as a Client Component

import React, { useEffect, useState } from 'react';
import ProductCard from '../components/productCard/ProductCard';
import CategoryList from '../components/CategoryList/CategoryList';
import { ProductService } from '../services/Products_Service';
import { MerchantService } from '../services/Merchant_Service';
import './Products.css';
import { Category } from '../model/category';
interface Product {
      documentId: string;
      id: string;
      title: string;
      price: number;
      description: string;
      category_name: string;
      image: string;
      quantity?: number;
    }
    
const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  //const [categoryNames, setCategoryNames] = useState<string[]>
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await ProductService.getProducts();
      const categoriesData = await MerchantService.getCategory();
      setProducts(productsData);
      setCategories(categoriesData);
      
     // setCategoryNames(categoriesData.map(cat => cat.image));
      setFilteredProducts(productsData);
    };

    fetchData();
  }, []);

  const handleCategoryFilter = (category: string | null) => {
    if (category) {
      const filtered = products.filter((product) => product.category_name === category);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); 
    }
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <CategoryList categories={categories.map(cat => cat.image)} setCategoryFilter={handleCategoryFilter} />
        <div className="product_List d-flex">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.documentId} product={product} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;





