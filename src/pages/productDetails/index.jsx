import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";
import LoadingAnimation from "../../components/loading";

function ProductDetailsPage() {
	const { id } = useParams();
	const {
		productDetails,
		setProductDetails,
		loading,
		setLoading,
		handleAddToCart,
		cartItems,
	} = useContext(ShoppingCartContext);

	const fetchProductDetails = async () => {
		setLoading(true);
		const response = await fetch(`https://dummyjson.com/products/${id}`);
		const result = await response.json();

		setProductDetails(result);
		setLoading(false);
	};

	useEffect(() => {
		fetchProductDetails();

		return () => {
			setProductDetails(null);
		};
	}, [id]);

	if (loading) return <LoadingAnimation />;

	if (!productDetails) {
		return <p>No product details available.</p>;
	}

	return (
		<section className="py-8 bg-white md:py-16 antialiased">
			<div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
				<div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
					<div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
						<img
							className="w-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
							src={productDetails.thumbnail} // Ensure this is defined
							alt={productDetails.title}
						/>

						<div className="flex mt-4 space-x-4">
							{productDetails.images?.map((image, index) => (
								<img
									key={index}
									className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-75 border shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] transition-shadow duration-200 ease-in-out"
									src={image}
								/>
							))}
						</div>
					</div>

					<div className="mt-6 sm:mt-8 lg:mt-0">
						<h1 className="text-xl font-semibold text-gray-900 sm:text-2xl ">
							{productDetails.title}
						</h1>
						<div className="mt-4 sm:items-center sm:gap-4 sm:flex">
							<p className="text-2xl font-extrabold text-gray-900 sm:text-3xl ">
								{productDetails.price} $
							</p>

							<div className="flex items-center gap-2 mt-2 sm:mt-0">
								<p className="text-sm font-medium leading-none text-gray-500 ">
									({productDetails.rating})
								</p>
								<p className="text-sm font-medium leading-none text-gray-500 font-bolder">
									{productDetails.reviews.length} Reviews
								</p>
							</div>
						</div>

						<div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
							<button
								disabled={
									productDetails
										? cartItems.findIndex(
												(item) =>
													item.id ===
													productDetails.id
										  ) > -1
										: false
								}
								onClick={() => handleAddToCart(productDetails)}
								title=""
								className="text-white my-4  sm:mt-0 disabled:opacity-50 bg-primary-700 hover:bg-gray-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none flex items-center justify-center"
								role="button"
							>
								Add to cart
							</button>
						</div>

						<p className="mb-6 text-gray-500">
							{productDetails.description}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ProductDetailsPage;
