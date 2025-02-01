#!/bin/bash

# Exit immediately on errors.
set -e

# Copy default .env file (feel free to change values as needed)
cp templates/core-graphql/.env.example templates/core-graphql/.env

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
ddev composer config repositories.preview vcs https://github.com/backlineint/decoupled_preview_iframe.git
ddev composer config repositories.recipe_core path web/recipes/sanctuary_core
ddev composer config repositories.recipe_jsonapi path web/recipes/sanctuary_jsonapi
ddev composer config repositories.recipe_graphql path web/recipes/sanctuary_graphql
ddev composer config repositories.recipe_content path web/recipes/sanctuary_content
ddev composer config repositories.module path web/modules/custom/sanctuary
ddev composer config repositories.provider path web/modules/custom/jsonapi_preview_provider

# Open up CORS for local development
cat ../scripts/config/enable-local-settings.php >> web/sites/default/settings.php
cp web/sites/example.settings.local.php web/sites/default/settings.local.php
mkdir scripts
cp ../scripts/config/consumers.php scripts/consumers.php
cp ../scripts/config/development.services.yml web/sites/development.services.yml
mkdir config

# Add modules
cp -a ../modules/. web/modules/custom

# Add recipies
cp -a ../recipes/. web/recipes

# Add useful composer dependencies
ddev composer require drush/drush drupal/default_content drupal/sanctuary_jsonapi drupal/sanctuary_graphql ewcomposer/unpack:dev-master

# Install Drupal
ddev drush site:install --account-name=admin --account-pass=admin -y
ddev drush cr

# Apply recipe
# ddev drush recipe recipes/sanctuary_jsonapi
# ddev composer unpack drupal/sanctuary_jsonapi
ddev drush recipe recipes/sanctuary_graphql
ddev composer unpack drupal/sanctuary_graphql
ddev drush cr
ddev drush recipe recipes/sanctuary_content

# Create example consumer
ddev drush php:script scripts/consumers

# use the one-time link (CTRL/CMD + Click) from the command below to edit your admin account details.
ddev drush uli | xargs open

# Start Astro dev server
cd ..
# pnpm dev:core-jsonapi
pnpm dev:core-graphql