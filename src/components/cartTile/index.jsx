import { useContext } from "react";
import { ShoppingCartContext } from "../../context";

function CartTile({ singleCartItem }) {
	const { handleRemoveFromCart, handleAddToCart } =
		useContext(ShoppingCartContext);
	return (
		<>
			<tr className="border-b">
				<td className="py-4">
					<div className="flex items-center">
						<img
							className="h-16 w-16 mr-4"
							src={singleCartItem.thumbnail}
							alt={singleCartItem.title}
						/>
						<span className="font-semibold">
							{singleCartItem.name}
						</span>
					</div>
				</td>
				<td className="py-4">${singleCartItem.price.toFixed(2)}</td>
				<td className="py-4">
					<div className="flex items-center">
						<button
							onClick={() =>
								handleRemoveFromCart(singleCartItem, false)
							}
							disabled={singleCartItem.quantity === 1}
							className="border disabled:opacity-50 bg-blue-500 text-white rounded-md py-2 px-4 mr-2"
						>
							-
						</button>
						<span className="text-center w-8">
							{singleCartItem.quantity}
						</span>
						<button
							onClick={() => handleAddToCart(singleCartItem)}
							className="border bg-blue-500 text-white rounded-md py-2 px-4 ml-2"
						>
							+
						</button>
						<button
							className="bg-blue-500 mx-1"
							onClick={() =>
								handleRemoveFromCart(singleCartItem, true)
							}
						>
							<i className="bx bxs-trash  mx-4 text-red-700"></i>
						</button>
					</div>
				</td>
				<td className="py-4">${singleCartItem.totalPrice.toFixed(2)}</td>
			</tr>
		</>
	);
}

export default CartTile;
