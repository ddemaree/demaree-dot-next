<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
define('DB_NAME', 'wordpress');
define('DB_USER', $_ENV['WORDPRESS_DB_USER']);
define('DB_PASSWORD',  $_ENV['WORDPRESS_DB_PASSWORD']);
define('DB_HOST', 'mysql');
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');

// ** Authentication Unique Keys and Salts. */
define('AUTH_KEY',         'bdac1997b75a37efc43bd366441bd999cb0880aa');
define('SECURE_AUTH_KEY',  '602529d16ffa7b5e2b2aaadd40dfb49e606ed2e2');
define('LOGGED_IN_KEY',    '25e1e04570137c1b630e4e33189e0e15cb95b43b');
define('NONCE_KEY',        'f4c5c7e9d69a8ffcf60a79316bf03d9f4de984e3');
define('AUTH_SALT',        'cc73a47beb63208f8e420f5bd4884ce4fa16640d');
define('SECURE_AUTH_SALT', '09c146b61e30c0ad5e214ca735bcffa0e7fe7bf4');
define('LOGGED_IN_SALT',   '8abcddbb1b8439fbd9bf16ad63145a41af5a9f3a');
define('NONCE_SALT',       'f761f9c0f59f15ce5a62c861c2e353f8554f5062');

$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

define( 'WP_ALLOW_MULTISITE', true );

// Disable automatic updates
define( 'DISALLOW_FILE_EDIT', true );
define( 'DISALLOW_FILE_MODS', true );
define( 'AUTOMATIC_UPDATER_DISABLED', true );
define( 'WP_AUTO_UPDATE_CORE', false );

if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
	$_SERVER['HTTPS'] = 'on';
}

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
