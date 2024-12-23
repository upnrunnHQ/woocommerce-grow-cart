import $ from "jquery";
import { useQueryClient, useMutation } from "react-query";
import { useContext } from "@wordpress/element";
import { CartContext } from "../context";
import { updateCartItem } from "../api";
import { ReactComponent as LockIcon } from "./../svg/lock-fill.svg";
import QuantityInput from "./QuantityInput";


export default function CartItems() {
	const queryClient = useQueryClient();
	const { cartInformation } = useContext(CartContext);
	const mutation = useMutation(updateCartItem, {
		onSuccess: () => {
			queryClient.invalidateQueries("cartInformation");
			queryClient.invalidateQueries("suggestedProducts");
			queryClient.invalidateQueries("rewards");

			$(document.body).trigger("wc_fragment_refresh");
		},
	});

	return (
		<div className="CartItems">
			{cartInformation.data.gift_items.map((item) => (
				<div className="CartItems__item" key={item.key}>
					<div className="CartItems__item-thumbnail-title-container">
						<div className="CartItems__item-thumbnail-wrap">
							<div
								className="CartItems__item-thumbnail"
								dangerouslySetInnerHTML={{
									__html: item.product_thumbnail,
								}}
							/>

							{item.unlocked ? null : <div className="CartItems__item-locked">
								<LockIcon />
							</div>}
						</div>

						<div className="CartItems__item-title-wrap">
							<div
								className="CartItems__item-title"
							>
								{item.product_title}
							</div>

							<div>
								{item.unlocked ? "You've unlocked your free gift!" : "Add more products to unlock."}
							</div>
						</div>
					</div>
				</div>
			))}
			{cartInformation.data.items.map((item) => (
				<div className="CartItems__item" key={item.key}>
					<div className="CartItems__item-thumbnail-title-container">
						<div
							className="CartItems__item-thumbnail"
							dangerouslySetInnerHTML={{
								__html: item.product_thumbnail,
							}}
						/>

						<div className="CartItems__item-title-wrap">
							<a
								className="CartItems__item-title"
								href={item.product_permalink}
							>
								{item.product_title}
							</a>
							<div
								className="CartItems__item-price"
								dangerouslySetInnerHTML={{
									__html: item.product_price,
								}}
							/>
						</div>
					</div>

					<div className="CartItems__item-subtotal-quantity-container">
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
								onChange: (quantity) =>
									mutation.mutate({
										cart_key: item.key,
										quantity,
									}),
								onRemove: () =>
									mutation.mutate({
										cart_key: item.key,
										quantity: 0,
									}),
							}}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
