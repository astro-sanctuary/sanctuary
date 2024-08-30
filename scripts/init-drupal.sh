#!/bin/bash

# Exit immediately on errors.
set -e

# Create DDEV project
mkdir drupal
cd drupal
ddev config --project-name=sanctuary --project-type=drupal --docroot=web --php-version=8.3 --create-docroot
ddev start
# Remove version constraint to use Drupal 11 once menu item extras upgrades
ddev composer create drupal/recommended-project:^10

# Prevent composer scaffolding from overwriting development.services.yml
ddev composer config --json extra.drupal-scaffold.file-mapping '{"[web-root]/sites/development.services.yml": false}'
# ddev composer config --json --merge extra.installer-paths '{"web/recipes/contrib/{$name}": ["type:drupal-recipe"]}'
ddev composer config minimum-stability dev
ddev composer config allow-plugins.ewcomposer/unpack true -n
# Add repositories
ddev composer config repositories.unpack vcs https://gitlab.ewdev.ca/yonas.legesse/drupal-recipe-unpack.git
ddev composer config repositories.recipe path web/recipes/sanctuary_core
ddev composer config repositories.module path web/modules/custom/sanctuary

# Open up CORS for local development
cat ../scripts/config/enable-local-settings.php >> web/sites/default/settings.php
cp web/sites/example.settings.local.php web/sites/default/settings.local.php
cp ../scripts/config/development.services.yml web/sites/development.services.yml
mkdir config

# Add modules
cp -a ../modules/. web/modules/custom

# Add recipies
cp -a ../recipes/. web/recipes

# Add useful composer dependencies
ddev composer require drush/drush drupal/default_content drupal/sanctuary_core ewcomposer/unpack:dev-master

# Install Drupal
ddev drush site:install --account-name=admin --account-pass=admin -y

# Apply recipe
ddev exec -d /var/www/html/web php core/scripts/drupal recipe recipes/sanctuary_core
ddev composer unpack drupal/sanctuary_core
ddev drush cr
ddev exec -d /var/www/html/web php core/scripts/drupal recipe recipes/sanctuary_content

# use the one-time link (CTRL/CMD + Click) from the command below to edit your admin account details.
ddev drush uli | xargs open