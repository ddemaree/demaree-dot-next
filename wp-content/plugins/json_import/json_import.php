<?php
/*
Plugin Name: JSON Importer
Plugin URI: http://wordpress.org/extend/plugins/wordpress-importer/
Description: Import posts, pages, comments, custom fields, categories, tags and more from a JSON file.
Author: ddemaree
Author URI: http://demar.ee/
Version: 1.0.0
Text Domain: dd-json-import
License: MIT
*/

if ( ! defined( 'WP_LOAD_IMPORTERS' ) )
	return;

/** Display verbose errors */
define( 'IMPORT_DEBUG', false );

// Load Importer API
require_once ABSPATH . 'wp-admin/includes/import.php';

if ( ! class_exists( 'WP_Importer' ) ) {
	$class_wp_importer = ABSPATH . 'wp-admin/includes/class-wp-importer.php';
	if ( file_exists( $class_wp_importer ) )
		require $class_wp_importer;
}

if ( class_exists( 'WP_Importer' ) ) {
class JSON_Import extends WP_Importer {

  var $id; // JSON attachment ID

  function dispatch(){
    // Render common header markup
    $this->header();

    // I'd call this ghetto routing but that's an insult to the ghetto
    $step = empty( $_GET['step'] ) ? 0 : (int) $_GET['step'];
		switch ( $step ) {
			case 0:
        // Render greeting & initial form field
				// $this->greet();
        echo "TBD - ADD GREETING";
				break;

      case 1:
        // FIXME: What does this function do?
				check_admin_referer( 'import-upload' );

        // Handle the upload from page 0
        // If the file could be uploaded, display a form to set options for this import
        if ( $this->handle_upload() )
					$this->import_options(); // NOT IMPLEMENTED
        break;
      case 2:
        // FIXME: What does this function do?
        check_admin_referer( 'import-wordpress' );

        // HANDLE IMPORT HERE
        // Having uploaded the data and gotten any user input for how to handle it, parse and import data
        break;
    }

    // Render common footer markup (this is just a closing <div> tag)
    $this->footer();
  }


  function handle_upload(){
    // FIXME: What does this function do?
    // (I think this is a WP-provided function to take the uploaded data file and return it as a file object)
    $file = wp_import_handle_upload();

    $errstring = '<p><strong>Sorry, there has been an error.</strong><br />';

    // File exists but has an error
    if ( isset( $file['error'] ) ) {
			echo $errstring;
			echo esc_html( $file['error'] ) . '</p>';
			return false;
		}
    // File does not exist or could not be read by PHP
    else if ( ! file_exists( $file['file'] ) ) {
			echo $errstring;
			printf( 'The export file could not be found at <code>%s</code>. It is likely that this was caused by a permissions problem.', esc_html( $file['file'] ) );
			echo '</p>';
			return false;
		}

    // Set the ID of the file upload in WP's database,
    // for further work
    $this->id = (int) $file['id'];


    $import_data = $this->parse( $file['file'] );
    // If returned object is an instance of `WP_Error`, display the error message and bail out
		if ( is_wp_error( $import_data ) ) {
      // TODO: DRY up this error rendering code, dude
			echo '<p><strong>' . __( 'Sorry, there has been an error.', 'wordpress-importer' ) . '</strong><br />';
			echo esc_html( $import_data->get_error_message() ) . '</p>';
			return false;
		}

    // TODO: Add version check?
    // At this point in the WXR importer, it validates the input data version. This JSON importer's format is JSON Feed 1.0 with some custom WP extensions; a version check is probably a good idea but ¯\_(ツ)_/¯


    // TODO: Implement `get_authors_from_import`
    // Here we get authors from the imported file (one of the few bits of data we will use on the import_options screen) so we can render that screen.
    $this->get_authors_from_import( $import_data );

    return true;
  }


  function parse( $file ) {
    $jsonstring = file_get_contents($file);
    return json_decode($jsonstring);
  }

  // PRESENTATION FUNCTIONS BECAUSE OF COURSE

  function import_options(){
    $j = 0; // This is used as an array index for authors
?>
<form action="<?php echo admin_url( 'admin.php?import=dd-json&amp;step=2' ); ?>" method="post">
	<?php wp_nonce_field( 'import-dd-json' ); ?>
	<input type="hidden" name="import_id" value="<?php echo $this->id; ?>" />
<?php

    // At this stage, the WXR importer offers the following options:
    // - Re-map authors from the imported data to existing system authors
    // - Download and import attachments
    // - Create new users for imported authors


    echo '</form>';
  }

  function header(){
    echo '<div class="wrap">';
		screen_icon(); // WTF IS THIS EVEN
		echo '<h2>IMPORT SOME JSON</h2>';
    echo '<h3>Because RSS is sad.</h3>';
  }

  function footer(){
    echo '</div>';
  }
}
}

function json_importer_init() {
	// load_plugin_textdomain( 'json-import', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

	/**
	 * WordPress Importer object for registering the import callback
	 * @global WP_Import $wp_import
	 */
	$GLOBALS['json_import'] = new JSON_Import();
	register_importer( 'json', 'JSON', __('Import <strong>posts, pages, comments, custom fields, categories, and tags</strong> from a JSON export file.', 'json-import'), array( $GLOBALS['json_import'], 'dispatch' ) );
}
add_action( 'admin_init', 'json_importer_init' );


?>