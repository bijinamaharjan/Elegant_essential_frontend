import { useNavigate } from "react-router-dom";
import { TheProductType } from "../admin_account/admin_product_item";

const SearchItem: React.FC<{
  product: TheProductType;
  toggleShow: () => void;
  toggleText: () => void;
}> = (props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        console.log("search item");
        props.toggleShow();
        navigate(`/product-details/${props.product.id}`);
        props.toggleText();
      }}
      className="flex flex-row gap-x-5 border border-solid border-gray-700 p-2 rounded-xl cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out"
    >
      <img
        className="h-14 w-1/4 rounded-lg object-cover"
        src={`http://localhost:8080/images/${props.product.images[0]}`}
        alt="product"
      />
      <div className="flex flex-col justify-center w-full">
        <p className="text-sm"> {props.product.name} </p>
        <p className="text-sm font-semibold"> Rs. {props.product.price} </p>
      </div>
    </div>
  );
};

export default SearchItem;
