<?php
namespace Upnrunn;

use WP_Query;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * WooCommerce_GrowCart_Rewards class.
 * @var [type]
 */
class WooCommerce_GrowCart_Rewards {
	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function get_default_rewards() {
		return [];
	}

	public function __construct() {
		add_filter( 'woocommerce_get_shop_coupon_data', [ $this, 'filter_shop_coupon_data' ], 10, 2 );
		add_filter( 'woocommerce_package_rates', [ $this, 'filter_package_rates' ], 10, 2 );
		// add_action( 'woocommerce_before_calculate_totals', [ $this, 'auto_add_coupons' ] );
		add_action( 'growcart_before_cart_information', [ $this, 'auto_add_coupons' ] );
		add_action( 'woocommerce_before_cart_totals', [ $this, 'conditionally_hide_rewards' ] );
		add_action( 'woocommerce_review_order_before_cart_contents', [ $this, 'conditionally_hide_rewards' ] );
	}

	/**
	 * Filter shop coupon data.
	 *
	 * @param [type] $coupon
	 * @param [type] $code
	 * @return void
	 */
	public function filter_shop_coupon_data( $coupon, $code ) {
		if ( is_admin() && ! wp_doing_ajax() ) {
			return $coupon;
		}

		$active_reward = $this->get_active_reward();
		if ( ! $active_reward ) {
			return $coupon;
		}

		$active_rules = $this->get_active_rules( $active_reward );
		if ( empty( $active_rules ) ) {
			return $coupon;
		}

		if ( 'minimum_cart_quantity' === $active_reward['type'] ) {
			$cart_contents_count = WC()->cart->get_cart_contents_count();
			$filtered_rewards    = $this->filter_rewards_by_cart_contents_count( $active_rules, $cart_contents_count );
		} else {
			$cart_subtotal    = WC()->cart->subtotal;
			$filtered_rewards = $this->filter_rewards_by_cart_subtotal( $active_rules, $cart_subtotal );
		}

		if ( isset( $filtered_rewards['current_rewards'] ) && count( $filtered_rewards['current_rewards'] ) ) {
			$current_rewards = wp_list_filter( $filtered_rewards['current_rewards'], [ 'id' => $code ] );
			$reward          = current( $current_rewards );

			if ( in_array( $reward['type'], [ 'percent', 'fixed_cart' ], true ) ) {
				$coupon = [
					'code'          => $reward['id'],
					'amount'        => floatval( $reward['value'] ),
					'discount_type' => $reward['type'],
				];
			}
		}

		return $coupon;
	}

	/**
	 * Automatically add coupons.
	 *
	 * @return void
	 */
	public function auto_add_coupons() {
		$filtered_rewards = $this->get_filtered_rules();

		if ( isset( $filtered_rewards['current_rewards'] ) && count( $filtered_rewards['current_rewards'] ) ) {
			$rewards_by_type = [
				'percent'    => [],
				'fixed_cart' => [],
			];

			foreach ( $filtered_rewards['current_rewards'] as $key => $value ) {
				$rewards_by_type[ $value['type'] ][] = $value['value'];
			}

			foreach ( $filtered_rewards['current_rewards'] as $key => $value ) {
				$coupon_code = $value['id'];

				if ( WC()->cart->has_discount( $coupon_code ) ) {
					continue;
				}

				if ( in_array( $value['type'], [ 'percent', 'fixed_cart' ], true ) ) {
					if ( max( $rewards_by_type[ $value['type'] ] ) === $value['value'] ) {
						$applied_coupons   = WC()->cart->get_applied_coupons();
						$applied_coupons[] = $coupon_code;

						WC()->cart->set_applied_coupons( $applied_coupons );

						do_action( 'woocommerce_applied_coupon', $coupon_code );
					} else {
						WC()->cart->remove_coupon( $coupon_code );
					}
				}
			}
		}

		if ( isset( $filtered_rewards['next_rewards'] ) && count( $filtered_rewards['next_rewards'] ) ) {
			foreach ( $filtered_rewards['next_rewards'] as $key => $value ) {
				if ( WC()->cart->has_discount( $value['id'] ) ) {
					WC()->cart->remove_coupon( $value['id'] );
				}
			}
		}
	}

	/**
	 * Conditionally hide rewards.
	 *
	 * @return void
	 */
	public function conditionally_hide_rewards() {
		$filtered_rewards = $this->get_filtered_rules();

		if ( isset( $filtered_rewards['current_rewards'] ) && count( $filtered_rewards['current_rewards'] ) ) {
			$coupons         = wp_list_pluck( $filtered_rewards['current_rewards'], 'id' );
			$applied_coupons = WC()->cart->get_applied_coupons();
			WC()->cart->set_applied_coupons( array_diff( $applied_coupons, $coupons ) );
		}
	}

	/**
	 * Filter package rates.
	 *
	 * @param [type] $rates
	 * @param [type] $package
	 * @return void
	 */
	public function filter_package_rates( $rates, $package ) {
		$filtered_rewards = $this->get_filtered_rules();

		if ( isset( $filtered_rewards['current_rewards'] ) && count( $filtered_rewards['current_rewards'] ) ) {
			foreach ( $filtered_rewards['current_rewards'] as $key => $value ) {
				if ( WC()->cart->has_discount( $value['id'] ) ) {
					continue;
				}

				if ( 'free_shipping' === $value['type'] ) {
					return [
						'free_shipping:1' => new \WC_Shipping_Rate(
							'free_shipping:1',
							'Free!',
							0,
							[],
							'free_shipping'
						),
					];
				}
			}
		}

		return $rates;
	}

	/**
	 * Get available rewards.
	 *
	 * @return void
	 */
	public function get_available_rewards() {
		$rewards = get_option( 'woocommerce_growcart_rewards' );
		$rewards = $rewards ? json_decode( $rewards, true ) : $this->get_default_rewards();

		return $rewards;
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function get_filtered_rewards() {
		$filtered_rewards = [
			'type'                       => 'minimum_cart_quantity',
			'display_suggested_products' => true,
			'display_coupon'             => true,
		];

		$active_reward = $this->get_active_reward();
		if ( ! $active_reward ) {
			return $filtered_rewards;
		}

		$active_rules = $this->get_active_rules( $active_reward );
		if ( empty( $active_rules ) ) {
			return $filtered_rewards;
		}

		if ( 'minimum_cart_quantity' === $active_reward['type'] ) {
			$cart_contents_count = WC()->cart->get_cart_contents_count();
			$filtered_rewards    = $this->filter_rewards_by_cart_contents_count( $active_rules, $cart_contents_count );
		} else {
			$cart_subtotal    = WC()->cart->subtotal;
			$filtered_rewards = $this->filter_rewards_by_cart_subtotal( $active_rules, $cart_subtotal );
		}

		$filtered_rewards['type']                       = $active_reward['type'];
		$filtered_rewards['display_suggested_products'] = $active_reward['display_suggested_products'];
		$filtered_rewards['display_coupon']             = $active_reward['display_coupon'];

		return $filtered_rewards;
	}

	/**
	 * Get rewards.
	 *
	 * @return void
	 */
	public function get_rewards() {
		$hint             = '';
		$filtered_rewards = $this->get_filtered_rewards();
		$most_rewards     = array_values( $filtered_rewards['rewards'] ) === $filtered_rewards['current_rewards'];

		if ( $most_rewards ) {
			$hint = 'You\'re getting the most rewards!';
		} else {
			$hint = $this->get_next_reward_hint( $filtered_rewards['next_rewards'], $filtered_rewards['type'] );
		}

		return [
			'hint'                  => $hint,
			'featured_rewards'      => $this->get_featured_rewards(),
			'count_rewards'         => count( $rewards ),
			'count_current_rewards' => count( $filtered_rewards['current_rewards'] ),
			'cart_contents_count'   => WC()->cart->get_cart_contents_count(),
			'rewards_progress'      => $most_rewards ? 100 : $this->get_rewards_progress( $filtered_rewards['rewards'], $filtered_rewards['type'] ),
			'rewards'               => $filtered_rewards,
		];
	}

	/**
	 * Filter rewards by cart contents count.
	 *
	 * @param array $rewards
	 * @param [type] $cart_contents_count
	 * @return void
	 */
	public function filter_rewards_by_cart_contents_count( $rewards = [], $cart_contents_count ) {
		$filtered_rewards = [
			'rewards'         => [],
			'current_rewards' => [],
			'next_rewards'    => [],
		];

		if ( empty( $rewards ) ) {
			return $filtered_rewards;
		}

		uasort( $rewards, [ $this, 'sort_by_minimum_cart_quantity' ] );

		$rewards = array_values( $rewards );

		$filtered_rewards['rewards'] = $rewards;

		foreach ( $rewards as $key => $value ) {
			if ( intval( $value['minimum_cart_quantity'] ) <= $cart_contents_count ) {
				$filtered_rewards['current_rewards'][] = $value;
			} else {
				$filtered_rewards['next_rewards'][] = $value;
			}
		}

		return $filtered_rewards;
	}

	/**
	 * Undocumented function
	 *
	 * @param array $rewards
	 * @param [type] $cart_subtotal
	 * @return void
	 */
	public function filter_rewards_by_cart_subtotal( $rewards = [], $cart_subtotal ) {
		$filtered_rewards = [
			'rewards'         => [],
			'current_rewards' => [],
			'next_rewards'    => [],
		];

		if ( empty( $rewards ) ) {
			return $filtered_rewards;
		}

		uasort( $rewards, [ $this, 'sort_by_minimum_cart_amount' ] );

		$rewards                     = array_values( $rewards );
		$filtered_rewards['rewards'] = $rewards;

		foreach ( $rewards as $key => $value ) {
			if ( intval( $value['minimum_cart_amount'] ) <= $cart_subtotal ) {
				$filtered_rewards['current_rewards'][] = $value;
			} else {
				$filtered_rewards['next_rewards'][] = $value;
			}
		}

		return $filtered_rewards;
	}

	/**
	 * Get next reward hint.
	 *
	 * @param array $next_rewards
	 * @return void
	 */
	public function get_next_reward_hint( $next_rewards = [], $type = 'minimum_cart_quantity' ) {
		$reward_hint_string = '';
		$next_reward        = current( $next_rewards );
		$currency_symbol    = get_woocommerce_currency_symbol();

		if ( 'minimum_cart_quantity' === $type ) {
			$reward_hint_string     = '' === $next_reward['hint'] ? __( '**Add** {{quantity}} more products to get {{name}}', 'woocommerce-grow-cart' ) : $next_reward['hint'];
			$cart_contents_count    = WC()->cart->get_cart_contents_count();
			$required_cart_quantity = intval( $next_reward['minimum_cart_quantity'] ) - $cart_contents_count;
		} else {
			$reward_hint_string   = '' === $next_reward['hint'] ? __( '**Spend** {{amount}} more to get {{name}}', 'woocommerce-grow-cart' ) : $next_reward['hint'];
			$cart_subtotal        = WC()->cart->subtotal;
			$required_cart_amount = intval( $next_reward['minimum_cart_amount'] ) - $cart_subtotal;
		}

		$allowed_tags   = 'minimum_cart_quantity' === $type ? [ '{{quantity}}', '{{name}}', '{{currency}}' ] : [ '{{amount}}', '{{name}}', '{{currency}}' ];
		$allowed_values = 'minimum_cart_quantity' === $type ? [ $required_cart_quantity, $next_reward['name'], $currency_symbol ] : [ $required_cart_amount, $next_reward['name'], $currency_symbol ];

		$reward_hint_string = str_replace( $allowed_tags, $allowed_values, $reward_hint_string );
		$reward_hint_string = preg_replace( '#\*{2}(.*?)\*{2}#', '<b>$1</b>', $reward_hint_string );

		return wp_kses(
			$reward_hint_string,
			[
				'b'      => [],
				'strong' => [],
			]
		);
	}

	/**
	 * Get featured rewards.
	 *
	 * @return void
	 */
	public function get_featured_rewards() {
		$cart_contents_count = WC()->cart->get_cart_contents_count();
		$rewards             = $this->get_available_rewards();
		$filtered_rewards    = wp_list_filter( $rewards, [ 'featured' => true ] );

		$featured_rewards = [];
		foreach ( $filtered_rewards as $key => $value ) {
			$required_cart_contents = intval( $value['minimum_cart_quantity'] ) - $cart_contents_count;
			$reward_hint_string     = intval( $value['minimum_cart_quantity'] ) <= $cart_contents_count ? sprintf(
				__( 'You\'ve unlocked your %s!', 'woocommerce-grow-cart' ),
				$value['name']
			) : sprintf(
				__( 'Add %d more products to unlock', 'woocommerce-grow-cart' ),
				$required_cart_contents
			);

			$featured_rewards[] = [
				'name' => $value['name'],
				'hint' => $reward_hint_string,
			];
		}

		return $featured_rewards;
	}

	/**
	 * Get rewards progress.
	 *
	 * @param array $rewards
	 * @return void
	 */
	public function get_rewards_progress( $rewards = [], $rewards_rule = 'minimum_cart_quantity' ) {
		$items = wp_list_pluck( $rewards, $rewards_rule );
		$max   = max( wp_parse_id_list( $items ) );

		if ( 'minimum_cart_quantity' === $rewards_rule ) {
			$current = WC()->cart->get_cart_contents_count();
		} else {
			$current = WC()->cart->subtotal;
		}

		if ( ! $current || ! $max ) {
			return 0;
		}

		return ( $current / $max ) * 100;
	}

	/**
	 * Get reward string.
	 *
	 * @param array $current_rewards
	 * @return void
	 */
	public function get_reward_string( $current_rewards = [] ) {
		$cart_subtotal  = WC()->cart->subtotal;
		$reward_total   = 0;
		$reward_strings = [];

		$rewards_by_type = [
			'percent'    => [],
			'fixed_cart' => [],
		];

		foreach ( $current_rewards as $key => $value ) {
			$rewards_by_type[ $value['type'] ][] = $value['value'];
		}

		foreach ( $current_rewards as $key => $value ) {
			if ( 'free_shipping' === $value['type'] ) {
				$reward_strings[] = '<span class="CartTotals__free-shipping">' . get_icon( 'truck' ) . '<span> ' . __( 'Free Shipping', 'woocommerce-grow-cart' ) . '</span>' . '</span>';
			} elseif ( max( $rewards_by_type[ $value['type'] ] ) === $value['value'] ) {
				switch ( $value['type'] ) {
					case 'percent':
						$reward_total += ( $cart_subtotal * $value['value'] ) / 100;
						break;
					case 'fixed_cart':
						$reward_total += $value['value'];
						break;
					default:
						break;
				}
			}
		}

		if ( $reward_total ) {
			$reward_strings[] = sprintf( __( '<span>You are saving %s</span>', 'woocommerce-grow-cart' ), wc_price( $reward_total ) );
		}

		if ( empty( $reward_strings ) ) {
			return '';
		}

		return implode( '<span> + </span>', $reward_strings );
	}

	/**
	 * Get suggested products.
	 *
	 * @return void
	 */
	public function get_suggested_products() {
		global $post;

		$suggested_products = [];
		$max_items          = 5;
		$cart               = WC()->cart->get_cart();
		$cart_is_empty      = WC()->cart->is_empty();
		$exclude_ids        = wp_list_pluck( $cart, 'product_id' );

		if ( count( WC()->cart->removed_cart_contents ) ) {
			$title = __( 'Frequently bought together', 'woocommerce-grow-cart' );

			foreach ( WC()->cart->removed_cart_contents as $key => $cart_item ) {
				$product_id = $cart_item['variation_id'] ? $cart_item['variation_id'] : $cart_item['product_id'];

				if ( ! in_array( $product_id, $exclude_ids, true ) ) {
					$suggested_products[] = $product_id;
				}
			}
		} elseif ( $cart_is_empty ) {
			$title = __( 'Popular products', 'woocommerce-grow-cart' );

			$args = array(
				'post_type'           => 'product',
				'post_status'         => 'publish',
				'ignore_sticky_posts' => true,
				'meta_key'            => 'total_sales',
				'order'               => 'DESC',
				'orderby'             => 'meta_value_num',
				'fields'              => 'ids',
			);

			$query = new WP_Query( $args );

			$suggested_products = array_merge( $suggested_products, wp_parse_id_list( $query->posts ) );
		} else {
			$title = __( 'Products you may like', 'woocommerce-grow-cart' );

			foreach ( $cart as $cart_item ) {
				if ( count( $suggested_products ) >= $max_items ) {
					continue;
				}

				$product_id         = $cart_item['variation_id'] ? $cart_item['variation_id'] : $cart_item['product_id'];
				$related_products   = wc_get_related_products( $product_id, $max_items, $exclude_ids );
				$suggested_products = array_merge( $suggested_products, wp_parse_id_list( $related_products ) );
				$suggested_products = array_unique( $suggested_products );
			}
		}

		$products = [];

		foreach ( $suggested_products as $product_id ) {
			$_product = wc_get_product( $product_id );
			if ( ( count( $products ) >= $max_items ) || ! ( 'simple' === $_product->get_type() ) ) {
				continue;
			}

			$products[] = [
				'product_id'                => $product_id,
				'product_title'             => $_product->get_title(),
				'product_short_description' => $_product->get_short_description(),
				'product_permalink'         => $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '',
				'product_thumbnail'         => $_product->get_image(),
				'product_price'             => WC()->cart->get_product_price( $_product ),
			];
		}

		return [
			'title'    => $title,
			'products' => $products,
		];
	}

	/**
	 * Undocumented function
	 *
	 * @param [type] $a
	 * @param [type] $b
	 * @return void
	 */
	protected function sort_by_minimum_cart_quantity( $a, $b ) {
		if ( floatval( $a['minimum_cart_quantity'] ) === floatval( $b['minimum_cart_quantity'] ) ) {
			return 0;
		}

		return ( floatval( $a['minimum_cart_quantity'] ) < floatval( $b['minimum_cart_quantity'] ) ) ? -1 : 1;
	}

	/**
	 * Undocumented function
	 *
	 * @param [type] $a
	 * @param [type] $b
	 * @return void
	 */
	protected function sort_by_minimum_cart_amount( $a, $b ) {
		if ( floatval( $a['minimum_cart_amount'] ) === floatval( $b['minimum_cart_amount'] ) ) {
			return 0;
		}

		return ( floatval( $a['minimum_cart_amount'] ) < floatval( $b['minimum_cart_amount'] ) ) ? -1 : 1;
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function get_filtered_rules() {
		$filtered_rules = [];

		$active_reward = $this->get_active_reward();
		if ( ! $active_reward ) {
			return $filtered_rules;
		}

		$active_rules = $this->get_active_rules( $active_reward );
		if ( empty( $active_rules ) ) {
			return $filtered_rules;
		}

		if ( 'minimum_cart_quantity' === $active_reward['type'] ) {
			$cart_contents_count = WC()->cart->get_cart_contents_count();
			$filtered_rules      = $this->filter_rewards_by_cart_contents_count( $active_rules, $cart_contents_count );
		} else {
			$cart_subtotal  = WC()->cart->subtotal;
			$filtered_rules = $this->filter_rewards_by_cart_subtotal( $active_rules, $cart_subtotal );
		}

		return $filtered_rules;
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function get_active_reward() {
		$available_rewards = $this->get_available_rewards();
		if ( empty( $available_rewards ) ) {
			return null;
		}

		$available_rewards_enabled = wp_list_filter( $available_rewards, [ 'enabled' => true ] );
		if ( empty( $available_rewards_enabled ) ) {
			return null;
		}

		$rewards = array_values( $available_rewards_enabled );

		return $rewards[0];
	}

	/**
	 * Undocumented function
	 *
	 * @param array $rules
	 * @return void
	 */
	public function get_active_rules( $active_reward ) {
		if ( empty( $active_reward['rules'] ) ) {
			return [];
		}

		$_active_rules = wp_list_filter( $active_reward['rules'], [ 'enabled' => 1 ] );
		if ( empty( $_active_rules ) ) {
			return [];
		}

		$active_rules = [];
		foreach ( $_active_rules as $active_rule ) {
			$active_rules[] = $active_rule;
		}

		return $active_rules;
	}
}
