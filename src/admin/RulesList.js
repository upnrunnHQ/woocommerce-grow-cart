import {
	TextControl,
	ToggleControl,
	__experimentalNumberControl as NumberControl,
	SelectControl,
	Tooltip,
} from "@wordpress/components";
import { useContext } from "@wordpress/element";
import { RewardsAdminContext } from "../context";
import { ReactComponent as TrashIcon } from "./../svg/trash.svg";

export default function RulesList({ reward, addRule, removeRule }) {
	const { updateReward } = useContext(RewardsAdminContext);

	function updateRule(rule) {
		const rules = reward.rules.map((_rule) => {
			if (_rule.id === rule.id) {
				return rule;
			}

			return _rule;
		});

		updateReward({
			...reward,
			rules,
		});
	}

	return (
		<div className="RulesList">
			<h4 className="RulesList__title">Reward Rules</h4>

			<Tooltip text="More information">
				<div>Hover for more information</div>
			</Tooltip>

			<div className="RulesList__items">
				{reward.rules && reward.rules.length
					? reward.rules.map((rule) => {
							return (
								<div className="RulesListItem" key={rule.id}>
									<div className="RulesListItem__actions">
										<ToggleControl
											label={
												rule.enabled
													? "Active"
													: "Disabled"
											}
											checked={rule.enabled}
											onChange={() => {
												updateRule({
													...rule,
													enabled: !rule.enabled,
												});
											}}
										/>
										<button
											type="button"
											className="RulesList__remove"
											onClick={() => {
												if (
													confirm(
														"Deleting rule!"
													) === true
												) {
													removeRule(rule.id);
												}
											}}
										>
											<TrashIcon />
										</button>
									</div>

									<TextControl
										label="Name"
										value={rule.name}
										onChange={(name) => {
											updateRule({
												...rule,
												name,
											});
										}}
									/>

									<NumberControl
										label="Value"
										value={rule.value}
										onChange={(value) => {
											updateRule({
												...rule,
												value,
											});
										}}
									/>

									<SelectControl
										label="Type"
										value={rule.type}
										options={
											woocommerce_growcart_rewards.reward_types
										}
										onChange={(type) =>
											updateRule({
												...rule,
												type,
											})
										}
										__nextHasNoMarginBottom
									/>

									{["percent", "fixed_cart"].includes(
										rule.type
									) && (
										<>
											{"minimum_cart_quantity" ===
											rule.type ? (
												<NumberControl
													label="Minimum cart quantity"
													isShiftStepEnabled={true}
													onChange={(
														minimum_cart_quantity
													) => {
														updateRule({
															...rule,
															minimum_cart_quantity,
														});
													}}
													shiftStep={10}
													value={
														rule.minimum_cart_quantity
													}
												/>
											) : (
												<NumberControl
													label="Minimum cart amount"
													isShiftStepEnabled={true}
													onChange={(
														minimum_cart_amount
													) =>
														updateRule({
															...rule,
															minimum_cart_amount,
														})
													}
													shiftStep={10}
													value={
														rule.minimum_cart_amount
													}
												/>
											)}
										</>
									)}
								</div>
							);
					  })
					: null}
			</div>

			<button type="button" className="RulesList__add" onClick={addRule}>
				Add rule
			</button>
		</div>
	);
}
