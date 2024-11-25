'use client';
import React, {  useState } from 'react'
import ProductCard from '../components/productCard/ProductCard';
import { ProductService } from '../services/Products_Service';
import './Products.css'
import CategoryList from '../components/CategoryList/CategoryList';
import { MerchantService } from '../services/Merchant_Service';
export default async function Products() {
  
  const products = await ProductService.getProducts();
    const categories = await MerchantService.getCategory();

    return <ProductPageClient products={products} categories={categories} />;
}
const ProductPageClient: React.FC<{ products: any[]; categories: string[] }> = ({ products, categories }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleCategoryFilter = (category: string | null) => {
      if (category) {
          const filtered = products.filter((product) => product.category_name === category);
          setFilteredProducts(filtered);
      } else {
          setFilteredProducts(products); // Reset to all products
      }
  };

  return (
      <div className="container-fluid">
          <div className="container">
              <CategoryList categories={categories} setCategoryFilter={handleCategoryFilter} />
              <div className="product_List d-flex">
                  {filteredProducts.length > 0 ? (
                      filteredProducts.map((product: any) => (
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
  
