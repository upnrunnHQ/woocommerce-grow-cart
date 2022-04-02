import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "@wordpress/element";
import {
	TextControl,
	SelectControl,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";

export default function RewardsAdminScreen() {
	const [rewards, setRewards] = useState([
		{
			id: uuidv4(),
			name: "FREE SHIPPING",
			type: "free_shipping",
			value: 0,
			minimum_cart_contents: 3,
		},
	]);
	const [activeReward, setActiveReward] = useState(null);

	function updateReward(reward) {
		setRewards(
			rewards.map((_reward) => {
				if (_reward.id === reward.id) {
					return reward;
				}

				return _reward;
			})
		);
	}

	useEffect(() => {
		const rewards = JSON.parse(
			document.getElementById("setting-woocommerce_growcart_rewards")
				.value
		);
		setRewards(rewards);
	}, []);

	useEffect(() => {
		document.getElementById(
			"setting-woocommerce_growcart_rewards"
		).value = JSON.stringify(rewards);
	}, [rewards]);

	return (
		<div className="RewardsAdminScreen">
			{rewards && rewards.length ? (
				<table className="growcart-rewards widefat">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Type</th>
							<th scope="col">Value</th>
							<th scope="col">Minimum cart contents</th>
						</tr>
					</thead>
					<tbody>
						{rewards.map((reward) => (
							<tr>
								<td>
									{activeReward &&
									activeReward.id === reward.id ? (
										<TextControl
											label="Name"
											value={reward.name}
											onChange={(name) => {
												updateReward({
													...reward,
													name,
												});
											}}
										/>
									) : (
										reward.name
									)}

									<div class="row-actions">
										{activeReward &&
										activeReward.id === reward.id ? (
											<a
												className="growcart-reward-cancel-edit"
												href="#"
												onClick={(name) => {
													setActiveReward(null);
												}}
											>
												Cancel changes
											</a>
										) : (
											<>
												<a
													className="growcart-reward-edit"
													href="#"
													onClick={() => {
														setActiveReward(
															rewards.find(
																(_reward) =>
																	_reward.id ===
																	reward.id
															)
														);
													}}
												>
													Edit
												</a>
												{" | "}
												<a
													href="#"
													className="growcart-reward-delete"
													onClick={() =>
														setRewards(
															rewards.filter(
																(_reward) =>
																	_reward.id !==
																	reward.id
															)
														)
													}
												>
													Remove
												</a>
											</>
										)}
									</div>
								</td>
								<td>
									{activeReward &&
									activeReward.id === reward.id ? (
										<SelectControl
											label="Type"
											value={reward.type}
											options={[
												{
													label: "FREE SHIPPING",
													value: "free_shipping",
												},
												{
													label: "PERCENTAGE",
													value: "percent",
												},
												{
													label: "FIXED",
													value: "fixed_cart",
												},
												{
													label: "GIFTCARD",
													value: "giftcard",
												},
											]}
											onChange={(type) => {
												setActiveReward({
													...activeReward,
													type,
												});
											}}
										/>
									) : (
										reward.type
									)}
								</td>
								<td>
									{activeReward &&
									activeReward.id === reward.id ? (
										<TextControl
											label="Value"
											value={reward.value}
											onChange={(value) => {
												setActiveReward({
													...activeReward,
													value,
												});
											}}
										/>
									) : (
										reward.value
									)}
								</td>
								<td>
									{activeReward &&
									activeReward.id === reward.id ? (
										<NumberControl
											label="Minimum cart contents"
											isShiftStepEnabled={true}
											onChange={(
												minimum_cart_contents
											) => {
												setActiveReward({
													...activeReward,
													minimum_cart_contents,
												});
											}}
											shiftStep={10}
											value={
												activeReward.minimum_cart_contents
											}
										/>
									) : (
										reward.minimum_cart_contents
									)}
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td colspan="4">
								<button
									type="button"
									className="button button-primary"
									onClick={() =>
										setRewards([
											...rewards,
											{
												id: uuidv4(),
												name: "FREE SHIPPING",
												type: "free_shipping",
												value: 0,
												minimum_cart_contents: 3,
											},
										])
									}
								>
									Add reward
								</button>
							</td>
						</tr>
					</tfoot>
				</table>
			) : null}
		</div>
	);
}
