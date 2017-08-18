<?php
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function bsuit_setup() {
  load_theme_textdomain( 'twentyseventeen' );
  add_theme_support( 'automatic-feed-links' );
  add_theme_support( 'title-tag' );

  add_image_size( 'twentyseventeen-featured-image', 2000, 1200, true );
  add_image_size( 'twentyseventeen-thumbnail-avatar', 100, 100, true );

  // Set the default content width.
  $GLOBALS['content_width'] = 525;

	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'top'    => __( 'Top Menu', 'twentyseventeen' ),
		'social' => __( 'Social Links Menu', 'twentyseventeen' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 *
	 * See: https://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'link',
		'quote',
		// 'aside',
		// 'image',
		// 'video',
		// 'gallery',
		// 'audio',
	) );

	// Add theme support for Custom Logo.
	add_theme_support( 'custom-logo', array(
		'width'       => 250,
		'height'      => 250,
		'flex-width'  => true,
	) );

	// Add theme support for selective refresh for widgets.
	// add_theme_support( 'customize-selective-refresh-widgets' );

	/*
	 * This theme styles the visual editor to resemble the theme style,
	 * specifically font, colors, and column width.
 	 */
	// add_editor_style( array( 'assets/css/editor-style.css', twentyseventeen_fonts_url() ) );

	// Define and register starter content to showcase the theme on new sites.
	$starter_content = array(
		'widgets' => array(
			// Place three core-defined widgets in the sidebar area.
			'sidebar-1' => array(
				'text_business_info',
				'search',
				'text_about',
			),

			// Add the core-defined business info widget to the footer 1 area.
			'sidebar-2' => array(
				'text_business_info',
			),

			// Put two core-defined widgets in the footer 2 area.
			'sidebar-3' => array(
				'text_about',
				'search',
			),
		),

		// Specify the core-defined pages to create and add custom thumbnails to some of them.
		'posts' => array(
			'home',
			'about' => array(
				'thumbnail' => '{{image-sandwich}}',
			),
			'contact' => array(
				'thumbnail' => '{{image-espresso}}',
			),
			'blog' => array(
				'thumbnail' => '{{image-coffee}}',
			),
			'homepage-section' => array(
				'thumbnail' => '{{image-espresso}}',
			),
		),

		// Create the custom image attachments used as post thumbnails for pages.
		// 'attachments' => array(
		// 	'image-espresso' => array(
		// 		'post_title' => _x( 'Espresso', 'Theme starter content', 'twentyseventeen' ),
		// 		'file' => 'assets/images/espresso.jpg', // URL relative to the template directory.
		// 	),
		// 	'image-sandwich' => array(
		// 		'post_title' => _x( 'Sandwich', 'Theme starter content', 'twentyseventeen' ),
		// 		'file' => 'assets/images/sandwich.jpg',
		// 	),
		// 	'image-coffee' => array(
		// 		'post_title' => _x( 'Coffee', 'Theme starter content', 'twentyseventeen' ),
		// 		'file' => 'assets/images/coffee.jpg',
		// 	),
		// ),

		// Default to a static front page and assign the front and posts pages.
		'options' => array(
			'show_on_front' => 'page',
			'page_on_front' => '{{home}}',
			'page_for_posts' => '{{blog}}',
		),

		// Set the front page section theme mods to the IDs of the core-registered pages.
		'theme_mods' => array(
			'panel_1' => '{{homepage-section}}',
			'panel_2' => '{{about}}',
			'panel_3' => '{{blog}}',
			'panel_4' => '{{contact}}',
		),

		// Set up nav menus for each of the two areas registered in the theme.
		'nav_menus' => array(
			// Assign a menu to the "top" location.
			'top' => array(
				'name' => __( 'Top Menu', 'twentyseventeen' ),
				'items' => array(
					'link_home', // Note that the core "home" page is actually a link in case a static front page is not used.
					'page_about',
					'page_blog',
					'page_contact',
				),
			),

			// Assign a menu to the "social" location.
			'social' => array(
				'name' => __( 'Social Links Menu', 'twentyseventeen' ),
				'items' => array(
					'link_yelp',
					'link_facebook',
					'link_twitter',
					'link_instagram',
					'link_email',
				),
			),
		),
	);
}
add_action( 'after_setup_theme', 'bsuit_setup' );


function demaree_get_link_url() {
	$has_content_url = get_url_in_content( get_the_content() );
	$has_custom_url = get_post_meta( get_the_ID(), 'link_url', true);

	if($has_custom_url) {
		return $has_custom_url;
	} elseif ($has_content_url) {
		return $has_content_url;
	} else {
		return apply_filters( 'the_permalink', get_permalink() );
	}
}


add_action( 'rest_api_init', 'slug_register_link_url' );
function slug_register_link_url() {
    register_rest_field( 'post',
        'link_url',
        array(
            'get_callback'    => 'slug_get_link_url',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

/**
 * Get the value of the "starship" field
 *
 * @param array $object Details of current post.
 * @param string $field_name Name of field.
 * @param WP_REST_Request $request Current request
 *
 * @return mixed
 */
function slug_get_link_url( $object, $field_name, $request ) {
	return get_post_meta( $object[ 'id' ], $field_name, true );
}


?>
