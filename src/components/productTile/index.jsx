import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

function ProductTile({ singleProduct }) {
	const navigate = useNavigate();
	const { handleAddToCart ,cartItems} = useContext(ShoppingCartContext);

	function handleNavigateToProductDetails(id) {
		navigate(`/product-details/${id}`);
	}

	return (
		<div className="relative w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md">
			<a href="#">
				<img
					className="h-60 rounded-t-lg object-cover transform transition-transform duration-500 ease-in-out hover:scale-125"
					src={singleProduct.thumbnail}
					alt="product image"
				/>
			</a>
			<span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
				Sale
			</span>

			<div className="mt-4 px-5 pb-5">
				<a href="#">
					<h5 className="text-xl font-semibold tracking-tight text-slate-900 truncate w-40">
						{singleProduct.title}
					</h5>
				</a>
				<div className="mt-2.5 mb-5 flex items-center">
					<span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
						{singleProduct.rating}
					</span>
				</div>
				<div className=" items-center justify-between">
					<p>
						<span className="text-3xl font-bold text-slate-900">
							${singleProduct.price}
						</span>
					</p>
					<div className="flex gap-2">
						<button
							onClick={() =>
								handleNavigateToProductDetails(
									singleProduct?.id
								)
							}
							className="flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
						>
							View Details
						</button>
						<button
						disabled={
							cartItems.findIndex(
								(item) => item.id === singleProduct.id
							) > -1
						}
							onClick={() => handleAddToCart(singleProduct)}
							className="flex disabled:opacity-50 items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
						>
							Add to cart.
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductTile;
