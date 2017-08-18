FROM wordpress:latest

RUN apt-get update && apt-get install -y unzip
COPY ./uploads.ini /usr/local/etc/php/conf.d/uploads.ini

ADD https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar /usr/local/bin/wp
RUN chmod +rx /usr/local/bin/wp

WORKDIR /usr/src/wordpress/wp-content

RUN curl -o auth0.zip -SL https://downloads.wordpress.org/plugin/auth0.zip \
      && unzip auth0.zip -d /usr/src/wordpress/wp-content/plugins/ \
      && rm auth0.zip

RUN curl -o gutenberg.zip -SL https://downloads.wordpress.org/plugin/gutenberg.zip \
      && unzip gutenberg.zip -d /usr/src/wordpress/wp-content/plugins/ \
      && rm gutenberg.zip

RUN curl -o wordpress-importer.zip -SL https://downloads.wordpress.org/plugin/wordpress-importer.zip \
      && unzip wordpress-importer.zip -d /usr/src/wordpress/wp-content/plugins/ \
      && rm wordpress-importer.zip

COPY ./themes/birthdaysuit /usr/src/wordpress/wp-content/themes/birthdaysuit
COPY ./wp-config.php /usr/src/wordpress/wp-config.php

WORKDIR /var/www/html
