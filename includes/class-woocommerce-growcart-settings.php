<?php
namespace Upnrunn;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

class WooCommerce_Growcart_Settings {
	/**
	 * The single instance of the class.
	 *
	 * @var self
	 * @since  1.26.0
	 */
	private static $instance = null;

	/**
	 * Our Settings.
	 *
	 * @var array Settings.
	 */
	protected $settings = [];

	/**
	 * Allows for accessing single instance of class. Class should only be constructed once per call.
	 *
	 * @static
	 * @return self Main instance.
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Start up.
	 */
	public function __construct() {
		$this->settings_group = 'woocommerce_growcart';
		add_action( 'admin_init', [ $this, 'register_settings' ] );
		add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
		// add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
	}

	protected function init_settings() {
		$this->settings = [
			'general' => [
				__( 'General', 'woocommerce-grow-cart' ),
				[
					[
						'name'       => 'woocommerce_growcart_display_suggested_products',
						'std'        => '1',
						'label'      => __( 'Display suggested products', 'woocommerce-grow-cart' ),
						'desc'       => '',
						'type'       => 'checkbox',
						'attributes' => [],
					],
					[
						'name'       => 'woocommerce_growcart_display_coupon',
						'std'        => '1',
						'label'      => __( 'Display coupon', 'woocommerce-grow-cart' ),
						'desc'       => '',
						'type'       => 'checkbox',
						'attributes' => [],
					],
				],
			],
			'rewards' => [
				__( 'Rewards', 'woocommerce-grow-cart' ),
				[
					[
						'name'       => 'woocommerce_growcart_rewards',
						'std'        => '',
						'label'      => __( 'Rewards', 'woocommerce-grow-cart' ),
						'desc'       => '',
						'type'       => 'rewards',
						'attributes' => [],
					],
				],
			],
		];
	}

	/**
	 * Register and add settings
	 */
	public function register_settings() {
		$this->init_settings();

		foreach ( $this->settings as $section ) {
			foreach ( $section[1] as $option ) {
				if ( isset( $option['std'] ) ) {
					add_option( $option['name'], $option['std'] );
				}
				register_setting( $this->settings_group, $option['name'] );
			}
		}
	}

	/**
	 * Add options page.
	 *
	 * @return void
	 */
	public function add_plugin_page() {
		add_options_page(
			__( 'WooCommerce Growcart Settings', 'woocommerce-grow-cart' ),
			__( 'WooCommerce Growcart', 'woocommerce-grow-cart' ),
			'manage_options',
			'woocommerce-growcart',
			array( $this, 'options_page_html' )
		);
	}

	/**
	 * Options page callback
	 */
	public function options_page_html() {
		$this->init_settings();
		?>
		<div class="wrap woocommerce-growcart-settings-wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<form action="options.php" method="post">
				<h2 class="nav-tab-wrapper">
					<?php
					foreach ( $this->settings as $key => $section ) {
						echo '<a href="#settings-' . esc_attr( sanitize_title( $key ) ) . '" class="nav-tab">' . esc_html( $section[0] ) . '</a>';
					}
					?>
				</h2>

				<?php
				// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Used for basic flow.
				if ( ! empty( $_GET['settings-updated'] ) ) {
					flush_rewrite_rules();
					echo '<div class="updated fade woocommerce-grow-updated"><p>' . esc_html__( 'Settings successfully saved', 'woocommerce-grow-cart' ) . '</p></div>';
				}

				foreach ( $this->settings as $key => $section ) {
					$section_args = isset( $section[2] ) ? (array) $section[2] : [];
					echo '<div id="settings-' . esc_attr( sanitize_title( $key ) ) . '" class="settings_panel">';
					if ( ! empty( $section_args['before'] ) ) {
						echo '<p class="before-settings">' . wp_kses_post( $section_args['before'] ) . '</p>';
					}
					echo '<table class="form-table settings parent-settings">';

					foreach ( $section[1] as $option ) {
						$value = get_option( $option['name'] );
						$this->output_field( $option, $value );
					}

					echo '</table>';
					if ( ! empty( $section_args['after'] ) ) {
						echo '<p class="after-settings">' . wp_kses_post( $section_args['after'] ) . '</p>';
					}
					echo '</div>';
				}
				?>

				<p class="submit">
					<input type="submit" class="button-primary" value="<?php esc_attr_e( 'Save Changes', 'woocommerce-grow-cart' ); ?>" />
				</p>
			</form>
		</div>
		<?php
	}

	/**
	 * Outputs the field row.
	 *
	 * @param array $option
	 * @param mixed $value
	 */
	protected function output_field( $option, $value ) {
		$placeholder    = ( ! empty( $option['placeholder'] ) ) ? 'placeholder="' . esc_attr( $option['placeholder'] ) . '"' : '';
		$class          = ! empty( $option['class'] ) ? $option['class'] : '';
		$option['type'] = ! empty( $option['type'] ) ? $option['type'] : 'text';
		$attributes     = [];
		if ( ! empty( $option['attributes'] ) && is_array( $option['attributes'] ) ) {
			foreach ( $option['attributes'] as $attribute_name => $attribute_value ) {
				$attributes[] = esc_attr( $attribute_name ) . '="' . esc_attr( $attribute_value ) . '"';
			}
		}

		echo '<tr valign="top" class="' . esc_attr( $class ) . '">';

		if ( ! empty( $option['label'] ) ) {
			echo '<th scope="row"><label for="setting-' . esc_attr( $option['name'] ) . '">' . esc_html( $option['label'] ) . '</a></th><td>';
		} else {
			echo '<td colspan="2">';
		}

		$method_name = 'input_' . $option['type'];
		if ( method_exists( $this, $method_name ) ) {
			$this->$method_name( $option, $attributes, $value, $placeholder );
		} else {
			/**
			 * Allows for custom fields in admin setting panes.
			 *
			 * @param string $option     Field name.
			 * @param array  $attributes Array of attributes.
			 * @param mixed  $value      Field value.
			 * @param string $value      Placeholder text.
			 */
			do_action( 'woocommerce_growcart_admin_field_' . $option['type'], $option, $attributes, $value, $placeholder );
		}
		echo '</td></tr>';
	}

	/**
	 * Enqueue scripts.
	 *
	 * @return void
	 */
	public function enqueue_scripts() {
		$asset_file = include WOOCOMMERCE_GROWCART_ABSPATH . 'build/rewards.asset.php';

		wp_enqueue_script(
			'woocommerce-growcart-rewards',
			plugins_url( 'build/rewards.js', WOOCOMMERCE_GROWCART_FILE ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		wp_localize_script(
			'woocommerce-growcart-rewards',
			'woocommerce_growcart_rewards',
			[
				'ajaxURL'              => admin_url( 'admin-ajax.php' ),
				'update_rewards_nonce' => wp_create_nonce( 'update-rewards' ),
			]
		);

		wp_enqueue_style(
			'woocommerce-growcart-rewards',
			plugins_url( 'build/rewards.css', WOOCOMMERCE_GROWCART_FILE ),
			[],
			$asset_file['version']
		);
	}
}
