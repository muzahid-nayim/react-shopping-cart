import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// create the context
export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
	const [loading, setLoading] = useState(true);
	const [listOfProduct, setListOfProduct] = useState([]);
	const [productDetails, setProductDetails] = useState(null);
	const [cartItems, setCartItems] = useState([]);
	const navigate = useNavigate();

	async function fetchListOfProduct() {
		const response = await fetch("https://dummyjson.com/products");
		const result = await response.json();

		if (result?.products) {
			setListOfProduct(result?.products);
			setLoading(false);
		}
	}

	function handleAddToCart(getProductDetails) {
		const existenceCartItem = [...cartItems];
		const getCurrentItemIndex = existenceCartItem.findIndex(
			(cartItem) => cartItem.id === getProductDetails.id
		);

		// console.log(existenceCartItem)

		if (getCurrentItemIndex === -1) {
			existenceCartItem.push({
				...getProductDetails,
				quantity: 1,
				totalPrice: getProductDetails?.price,
			});
		} else {
			// console.log("item already exist");

			existenceCartItem[getCurrentItemIndex] = {
				...existenceCartItem[getCurrentItemIndex],
				quantity: existenceCartItem[getCurrentItemIndex].quantity + 1,
				totalPrice:
					(existenceCartItem[getCurrentItemIndex].quantity + 1) *
					existenceCartItem[getCurrentItemIndex].price,
			};
		}

		setCartItems(existenceCartItem);
		localStorage.setItem("cartItems", JSON.stringify(existenceCartItem));
		navigate("/cart");
	}

	function handleRemoveFromCart(getProductDetails, isFullyRemoveFromCart) {
		const existenceCartItem = [...cartItems];
		const findIndexOfCurrentCartItem = existenceCartItem.findIndex(
			(item) => item.id === getProductDetails.id
		);

		if (isFullyRemoveFromCart) {
			existenceCartItem.splice(findIndexOfCurrentCartItem, 1);
		} else {
			existenceCartItem[findIndexOfCurrentCartItem] = {
				...existenceCartItem[findIndexOfCurrentCartItem],
				quantity:
					existenceCartItem[findIndexOfCurrentCartItem].quantity - 1,
				totalPrice:
					(existenceCartItem[findIndexOfCurrentCartItem].quantity -
						1) *
					existenceCartItem[findIndexOfCurrentCartItem].price,
			};
		}

		localStorage.setItem("cartItems", JSON.stringify(existenceCartItem));
		setCartItems(existenceCartItem);
	}

	useEffect(() => {
		const storedCartItems = localStorage.getItem("cartItems");
		if (storedCartItems) {
			setCartItems(JSON.parse(storedCartItems));
		}

		fetchListOfProduct();
	}, []);

	return (
		<ShoppingCartContext.Provider
			value={{
				listOfProduct,
				loading,
				setLoading,
				productDetails,
				setProductDetails,
				handleAddToCart,
				cartItems,
				handleRemoveFromCart,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
}

export default ShoppingCartProvider;
