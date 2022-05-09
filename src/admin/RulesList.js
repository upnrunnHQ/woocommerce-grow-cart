import {
	TextControl,
	ToggleControl,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";

export default function RulesList({ reward, addRule, removeRule, updateRule }) {
	return (
		<div className="RulesList">
			<div className="RulesList__top">
				<h4 className="RulesList__title">Reward Rules</h4>
				<button
					type="button"
					className="RulesList__add"
					onClick={addRule}
				>
					Add rule
				</button>
			</div>
			<div className="RulesList__items">
				{reward.rules && reward.rules.length
					? reward.rules.map((rule) => {
							return (
								<div className="RulesListItem">
									<button
										type="button"
										className="RulesList__remove"
										onClick={() => removeRule(rule.id)}
									>
										Remove
									</button>
									<ToggleControl
										checked={rule.enabled}
										onChange={() => {
											updateRule({
												...rule,
												enabled: !rule.enabled,
											});
										}}
									/>

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

									<TextControl
										label="Minimum cart amount"
										value={rule.value}
										onChange={(value) => {
											updateRule({
												...rule,
												value,
											});
										}}
									/>

									{"minimum_cart_contents" === reward.type ? (
										<NumberControl
											label="Value"
											isShiftStepEnabled={true}
											onChange={(
												minimum_cart_contents
											) => {
												updateRule({
													...rule,
													minimum_cart_contents,
												});
											}}
											shiftStep={10}
											value={rule.minimum_cart_contents}
										/>
									) : (
										<NumberControl
											label="Value"
											isShiftStepEnabled={true}
											onChange={(minimum_cart_amount) => {
												updateRule({
													...rule,
													minimum_cart_amount,
												});
											}}
											shiftStep={10}
											value={rule.minimum_cart_amount}
										/>
									)}
								</div>
							);
					  })
					: null}
			</div>
		</div>
	);
}
