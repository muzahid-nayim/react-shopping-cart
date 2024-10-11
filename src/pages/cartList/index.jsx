import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import CartTile from "../../components/cartTile";
import { useNavigate } from "react-router-dom";

function CartListPage() {
	const { cartItems } = useContext(ShoppingCartContext);
	const navigate = useNavigate();

	return (
		<div className="bg-gray-100 h-screen py-8">
			<div className="container mx-auto px-4">
				<h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
				<div className="flex flex-col md:flex-row gap-4">
					<div className="md:w-3/4">
						<div className="bg-white rounded-lg shadow-md p-6 mb-4">
							<table className="w-full">
								<thead>
									<tr>
										<th className="text-left font-semibold">
											Product
										</th>
										<th className="text-left font-semibold">
											Price
										</th>
										<th className="text-left font-semibold">
											Quantity
										</th>
										<th className="text-left font-semibold">
											Total
										</th>
									</tr>
								</thead>
								<tbody>
									{cartItems.length > 0 ? (
										cartItems.map(
											(singleCartItem, index) => (
												<CartTile
													key={index}
													singleCartItem={
														singleCartItem
													}
												/>
											)
										)
									) : (
										<tr>
											<td> No item in the cart</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
					<div className="md:w-1/4">
						<div className="bg-white rounded-lg shadow-md p-6">
							<h2 className="text-lg font-semibold mb-4">
								Summary
							</h2>
							<div className="flex justify-between mb-2">
								<span>Subtotal</span>
								<span>
									$
									{cartItems
										.reduce(
											(acc, curr) =>
												acc + curr.totalPrice,
											0
										)
										.toFixed(2)}
								</span>
							</div>

							<div className="flex justify-between mb-2">
								<span className="font-semibold">Total</span>
								<span className="font-semibold">
									$
									{cartItems
										.reduce(
											(acc, curr) =>
												acc + curr.totalPrice,
											0
										)
										.toFixed(2)}
								</span>
							</div>
							<button
								onClick={() => navigate("/")}
								className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
							>
								Continue Shopping
							</button>
							<button
								disabled={cartItems.length === 0}
								className=" disabled:opacity-45 bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
							>
								Checkout
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartListPage;
