import { ReactComponent as PlusIcon } from "./../svg/plus.svg";
import { ReactComponent as DashIcon } from "./../svg/dash.svg";

export default function QuantityInput({ quantity, min, max, onChange }) {
	return (
		<>
			<button
				className="CartItems__item-quantity-decrease"
				disabled={quantity === min || min === max}
				onClick={() => onChange(quantity - 1)}
			>
				<DashIcon />
			</button>
			<span className="CartItems__item-quantity">{quantity}</span>
			<button
				className="CartItems__item-quantity-increase"
				disabled={quantity === max || min === max}
				onClick={() => onChange(quantity + 1)}
			>
				<PlusIcon />
			</button>
		</>
	);
}
