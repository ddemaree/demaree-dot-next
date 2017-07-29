<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">

<link href="https://use.typekit.net/sqm7elp.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="https://cloud.typography.com/68698/7804572/css/fonts.css" /> 
<link href="<?php echo $_ENV['ASSET_HOST'] ?>assets/main.css" rel="stylesheet" type="text/css">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

  <div class="container">
    <header class="site-header">
      <h1><a href="<?php bloginfo( 'wpurl' ) ?>"><?php bloginfo( 'name' ); ?></a></h1>
      <h2><?php bloginfo( 'description' ); ?></h2>
    </header>
    <main class="main-content">