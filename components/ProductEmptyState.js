import { EmptyState } from "@shopify/polaris";
import React from "react";

function ProductEmptyState({ setIsOpen }) {
  return (
    <EmptyState
      heading="Manage the products you want to display"
      action={{
        content: "Select Products",
        onAction: () => setIsOpen(true),
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>Select the products you want to use on your banner</p>
    </EmptyState>
  );
}
export default ProductEmptyState;
