add_action( 'wp_enqueue_scripts', 'wp12311_enqueue_scripts' );

function wp12311_enqueue_scripts() {
  wp_enqueue_script( 'wp12311-scripts', '/wp-includes/js/calculadora/auth.js', array( 'jquery' ), false, true );
  wp_localize_script(
	  'wp12311-scripts', 
	  'user', 
	  array(
     	'user_email' => wp_get_current_user()->user_email,
	 	'display_name' => wp_get_current_user()->display_name,
	  	'first_name' => wp_get_current_user()->first_name,
		'last_name' => wp_get_current_user()->last_name,
  	) 
  );
}