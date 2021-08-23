import { ResourcePicker } from "@shopify/app-bridge-react";
import { Page, EmptyState } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import ProductEmptyState from "../components/ProductEmptyState";
import ProductList from "../components/ProductList";
import ProductPage from "../components/ProductPage";
import store from "store-js";

function index({ shopOrigin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsIds, setProductsIds] = useState([]);

  /* This will get the list of products from local storage */
  useEffect(() => {
    const productList = store.get(`${shopOrigin}-products`);
    if (productList) {
      setProducts(productList);
    }
  }, []);

  useEffect(() => {
    const ids = products.map((product) => {
      return {
        id: product.id,
      };
    });
    setProductsIds(ids);
  }, [products]);

  function handleProductSelection(payload) {
    setIsOpen(false);
    setProducts(payload.selection);
    store.set(`${shopOrigin}-products`, payload.selection);
  }
  return (
    <>
      <ResourcePicker
        resourceType="Product"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onSelection={handleProductSelection}
        initialSelectionIds={productsIds}
      />
      {products.length > 0 ? (
        <ProductPage setIsOpen={setIsOpen} products={products}></ProductPage>
      ) : (
        <ProductEmptyState setIsOpen={setIsOpen}></ProductEmptyState>
      )}
    </>
  );
}

export default index;
