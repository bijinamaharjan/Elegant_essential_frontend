import React, { useState } from "react";
import AdminProductItem from "./admin_product_item";
import useFutureBuilder from "../../hooks/future_builder_hook";
import ThePulseLoader from "../../components/pulse-loader";
import LoadError from "../home/load-error";
import { useAppSelector } from "../../hooks/hooks";
import { useLocation, useNavigate } from "react-router-dom";

const AdminProductsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  const [searchQuery, setSearchQuery] = useState(keyword || "");
  const { isLoading, error, data } = useFutureBuilder(
    `http://localhost:8080/products/admin/all-products/${keyword}`
  );

  const themeState = useAppSelector((state) => {
    return state.theme;
  });
  const darkMode = themeState.darkMode;

  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col">
      <input
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (searchQuery.trim().length === 0) {
              return;
            } else {
              navigate(`/accounts/admin/products?keyword=${searchQuery}`);
            }
          }
        }}
        placeholder="Start searching ..."
        className={`px-3 py-2 rounded-sm border border-solid mb-4 ${
          darkMode ? "bg-zinc-800" : "bg-white"
        } border-zinc-600 w-full mr-2`}
      />
      {isLoading && (
        <div className="h-44 flex flex-row justify-center items-center">
          <ThePulseLoader color="purple"></ThePulseLoader>
        </div>
      )}
      {error && <LoadError message={error.message}></LoadError>}
      {data && !error && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.products.map((product: any) => (
            <AdminProductItem
              key={product.id}
              product={{
                id: product._id,
                brand: product.brand,
                category: product.category,
                name: product.name,
                images: product.images,
                price: product.price,
                description: product.description,
                availableQuantity: product.quantityAvailable,
                rating: product.rating,
                totalReviews: product.totalReviews,
                skinType: product.skinType,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
