<?php

namespace Upnrunn;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

use WC_AJAX;

/**
 * WooCommerce_GrowCart class.
 * @var [type]
 */
final class WooCommerce_GrowCart {
	/**
	 * The single instance of the class.
	 * @var [type]
	 */
	protected static $_instance = null;

	/**
	 * Main Container instance.
	 * Ensures only one instance of WooCommerce_GrowCart is loaded or can be loaded.
	 *
	 * @return [type] [description]
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * Container constructor.
	 */
	public function __construct() {
		$this->define_constants();
		$this->includes();
		$this->init_classes();
		$this->hooks();
	}

	/**
	 * Define WooCommerce_Grow_Cart constants.
	 */
	private function define_constants() {
		$this->define( 'WOOCOMMERCE_GROWCART_ABSPATH', dirname( WOOCOMMERCE_GROWCART_FILE ) . '/' );
	}

	/**
	 * Include required files used in admin and on the frontend.
	 * @return [type] [description]
	 */
	private function includes() {
		include_once WOOCOMMERCE_GROWCART_ABSPATH . 'includes/functions.php';
		include_once WOOCOMMERCE_GROWCART_ABSPATH . 'includes/class-woocommerce-growcart-ajax.php';
		include_once WOOCOMMERCE_GROWCART_ABSPATH . 'includes/class-woocommerce-growcart-rewards.php';
		include_once WOOCOMMERCE_GROWCART_ABSPATH . 'includes/class-woocommerce-growcart-settings.php';
		include_once WOOCOMMERCE_GROWCART_ABSPATH . 'includes/class-woocommerce-growcart-admin.php';

		// Include Freemius SDK.
		require_once WOOCOMMERCE_GROWCART_ABSPATH . 'includes/freemius/start.php';

		fs_dynamic_init(
			array(
				'id'               => '10785',
				'slug'             => 'growcart-for-woocommerce',
				'type'             => 'plugin',
				'public_key'       => 'pk_c4b629da74b3b4bd0c493a6522522',
				'is_premium'       => false,
				'has_addons'       => false,
				'has_paid_plans'   => false,
				'is_org_compliant' => false,
				'menu'             => array(
					'slug'       => 'growcart',
					'first-path' => 'admin.php?page=growcart',
					'support'    => false,
				),
			)
		);
	}

	/**
	 * Init classes.
	 *
	 * @return void
	 */
	private function init_classes() {
		$this->ajax     = new WooCommerce_GrowCart_Ajax();
		$this->rewards  = new WooCommerce_GrowCart_Rewards();
		$this->settings = new WooCommerce_Growcart_Settings();
		$this->admin    = new WooCommerce_Growcart_Admin();
	}

	/**
	 * Init hooks.
	 * @return [type] [description]
	 */
	private function hooks() {
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		add_action( 'wp_footer', [ $this, 'growcart_root' ] );
	}

	/**
	 * Enqueue scripts.
	 * @return [type] [description]
	 */
	public function enqueue_scripts() {
		if ( is_cart() || is_checkout() || ! $this->display_growcart() ) {
			return;
		}

		$asset_file = include WOOCOMMERCE_GROWCART_ABSPATH . 'build/index.asset.php';

		wp_enqueue_script(
			'woocommerce-growcart',
			plugins_url( 'build/index.js', WOOCOMMERCE_GROWCART_FILE ),
			array_merge( $asset_file['dependencies'], [ 'wc-cart-fragments' ] ),
			$asset_file['version'],
			true
		);

		wp_localize_script(
			'woocommerce-growcart',
			'woocommerce_growcart',
			[
				'ajaxURL'             => admin_url( 'admin-ajax.php' ),
				'wcAjaxURL'           => WC_AJAX::get_endpoint( '%%endpoint%%' ),
				'is_product'          => is_product(),
				'display_mini_cart'   => is_home() || is_front_page() || is_product() ? false : true,
				'apply_coupon_nonce'  => wp_create_nonce( 'apply-coupon' ),
				'remove_coupon_nonce' => wp_create_nonce( 'remove-coupon' ),
			]
		);

		if ( function_exists( 'is_product' ) && is_product() ) {
			wp_enqueue_script(
				'woocommerce-growcart-ajax-add-to-cart',
				plugins_url( 'build/ajax-add-to-cart.js', WOOCOMMERCE_GROWCART_FILE ),
				array_merge( $asset_file['dependencies'], [ 'jquery' ] ),
				$asset_file['version'],
				true
			);
		}

		wp_enqueue_style(
			'woocommerce-growcart',
			plugins_url( 'build/index.css', WOOCOMMERCE_GROWCART_FILE ),
			[],
			$asset_file['version']
		);

		$active_reward = woocommerce_growcart()->rewards->get_active_reward();
		if ( $active_reward ) {
			$styles = [
				'headerTextColor'         => '#ffffff',
				'headerBackground'        => '#343a40',
				'fontSize'                => '14px',
				'spacing'                 => [
					'top'    => '24px',
					'right'  => '24px',
					'bottom' => '24px',
					'left'   => '24px',
				],
				'textcolor'               => '#ffffff',
				'backgroundColor'         => '#000000',
				'progressColor'           => '#198754',
				'progressBackgroundColor' => '#495057',
				'iconColor'               => '#ffffff',
				'iconBackground'          => '#495057',
				'activeIconColor'         => '#ffffff',
				'activeIconBackground'    => '#198754',
			];

			if ( $active_reward['styles'] ) {
				foreach ( array_keys( $styles ) as $key ) {
					if ( isset( $active_reward['styles'][ $key ] ) ) {
						$styles[ $key ] = $active_reward['styles'][ $key ];
					}
				}
			}

			$custom_css = "
				:root {
					--growcart-font-size: {$styles['fontSize']};
					--growcart-header-text-color: {$styles['headerTextColor']};
					--growcart-header-background: {$styles['headerBackground']};
					--growcart-spacing-top: {$styles['spacing']['top']};
					--growcart-spacing-right: {$styles['spacing']['right']};
					--growcart-spacing-bottom: {$styles['spacing']['bottom']};
					--growcart-spacing-left: {$styles['spacing']['left']};
                    --growcart-text-color: {$styles['textcolor']};
                    --growcart-background-color: {$styles['backgroundColor']};
					--growcart-icon-color: {$styles['iconColor']};
                    --growcart-icon-background: {$styles['iconBackground']};
					--growcart-active-icon-color: {$styles['activeIconColor']};
                    --growcart-active-icon-background: {$styles['activeIconBackground']};
                    --growcart-progress-color: {$styles['progressColor']};
                    --growcart-progress-background-color: {$styles['progressBackgroundColor']};
                }
			";
			wp_add_inline_style( 'woocommerce-growcart', $custom_css );
		}
	}

	/**
	 * Output popup root required by ReactJS.
	 * @return [type] [description]
	 */
	public function growcart_root() {
		if ( is_cart() || is_checkout() ) {
			return;
		}

		echo '<div id="woocommerce-growcart-root"></div>';
	}

	/**
	 * Coditionally display growcart.
	 *
	 * @return void
	 */
	public function display_growcart() {
		$active_reward = woocommerce_growcart()->rewards->get_active_reward();
		if ( ! $active_reward ) {
			return false;
		}

		$active_rules = woocommerce_growcart()->rewards->get_active_rules( $active_reward );
		if ( empty( $active_rules ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Define constant if not already set.
	 *
	 * @param string      $name  Constant name.
	 * @param string|bool $value Constant value.
	 */
	private function define( $name, $value ) {
		if ( ! defined( $name ) ) {
			define( $name, $value );
		}
	}
}
