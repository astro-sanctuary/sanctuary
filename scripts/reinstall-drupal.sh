#!/bin/bash

# Exit immediately on errors.
set -e

cd drupal
# Install Drupal
ddev drush site:install --account-name=admin --account-pass=admin -y

# Apply recipe
ddev exec -d /var/www/html/web php core/scripts/drupal recipe recipes/sanctuary_core
ddev composer unpack drupal/sanctuary_core
ddev drush cr
ddev exec -d /var/www/html/web php core/scripts/drupal recipe recipes/sanctuary_content

# use the one-time link (CTRL/CMD + Click) from the command below to edit your admin account details.
ddev drush uli | xargs open