import React from "react";
import "../../styles/end_of_year_section.css";
import ProductItem from "./product_item";
import useFutureBuilder from "../../hooks/future_builder_hook";
import ThePulseLoader from "../../components/pulse-loader";
import LoadError from "./load-error";
import ProductItemShimmer from "../../utilities/shimmers/product-item-shimmer";

const EndOfYearSection: React.FC = () => {
  const { isLoading, error, data } = useFutureBuilder(
    `http://localhost:8080/products/all-products?filterBy=asc&limit=${5}`
  );

  let dummyProducts = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-1 flex-col w-full py-10">
      <p className="font-bold tracking-wider text-3xl mb-8">
        {" "}
        End of the Year Sale{" "}
      </p>
      {isLoading && (
        <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-5 justify-center">
          {dummyProducts.map((product: any) => (
            <ProductItemShimmer></ProductItemShimmer>
          ))}
        </div>
      )}
      {error && <LoadError message={error.message}></LoadError>}
      {data && !error && (
        <div className="w-full  flex flex-row flex-wrap justify-center gap-y-4">
          {data.products.map((product: any, index: number) => (
            <div className="w-1/2 md:w-1/3 lg:w-1/5">
              <ProductItem
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EndOfYearSection;
