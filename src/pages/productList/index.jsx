import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import ProductTile from "../../components/productTile";
import LoadingAnimation from "../../components/loading";

function ProductListPage() {
	const { listOfProduct, loading } = useContext(ShoppingCartContext);

	if (loading) return <LoadingAnimation />;

	return (
		<div className="py-12 bg-white sm:py-16 lg:py-20">
			<div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
				<div className="max-w-md mx-auto text-center">
					<h2 className="text-3xl font-extrabold text-gray-950 sm:text-4xl">
						Our feature products
					</h2>
				</div>
				<div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 gap-5 mt-10 lg:grid-cols-4">
					{listOfProduct?.length > 0 ? (
						listOfProduct.map((singleProduct) => (
							<ProductTile key={singleProduct.id} singleProduct={singleProduct} />
						))
					) : (
						<h3>No product found</h3>
					)}
				</div>
			</div>
		</div>
	);
}

export default ProductListPage;
