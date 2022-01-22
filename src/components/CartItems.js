import { useQueryClient, useMutation } from "react-query";
import { useContext } from "@wordpress/element";
import { CartContext } from "../context";
import { updateCartItem } from "../api";
import QuantityInput from "./QuantityInput";

export default function CartItems() {
	const queryClient = useQueryClient();
	const { cartInformation } = useContext(CartContext);
	const mutation = useMutation(updateCartItem, {
		onSuccess: (data) => {
			queryClient.invalidateQueries("cartInformation");
		},
	});

	return (
		<div className="CartItems">
			{cartInformation.data.items.map((item) => (
				<div className="CartItems__item" key={item.key}>
					<a href={item.product_permalink}>{item.product_title}</a>
					<div
						className="CartItems__item-thumbnail"
						dangerouslySetInnerHTML={{
							__html: item.product_thumbnail,
						}}
					/>

					<div
						className="CartItems__item-subtotal"
						dangerouslySetInnerHTML={{
							__html: item.product_subtotal,
						}}
					/>

					<QuantityInput
						{...{
							isLoading: mutation.isLoading,
							quantity: item.quantity,
							min: item.min_purchase_quantity,
							max: item.max_purchase_quantity,
							onChange: (quantity) => {
								mutation.mutate({
									cart_key: item.key,
									quantity,
								});
							},
						}}
					/>
				</div>
			))}
		</div>
	);
}
