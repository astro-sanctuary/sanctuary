# Sanctuary

An enjoyable project scaffolder for decoupled Drupal explorers. Powered by Astro
and Drupal API Client.

This project is currently in a pre-release state, but can be run locally via this
monorepo.

## Pre-requisites

- DDEV (https://ddev.readthedocs.io/en/stable/)
- pnpm (https://pnpm.io/)

## Installation

1. Clone this repository
2. Run `pnpm i && pnpm ddev:init`

This will install dependencies, and set up a Drupal instance using DDEV, and run
the Astro project in development mode. When viewing content as an admin on
https://sanctuary.ddev.site, you will see the Astro project embedded in an iFrame.

## Usage

1. Start ddev with `ddev start` to start Drupal
2. Run `pnpm dev:core` to start Astro in dev mode.

## Monorepo Overview

- /drupal: Contains the Drupal codebase and configuration. Excluded from version
  control.
- /modules: pre-release Drupal modules
  - jsonapi_preview_provider - draft preview integration for decoupled_preview_iframe
  - sanctuary - handles post message events from the decoupled iFrame to trigger
    front end editing forms, and handle route syncing. js/sanctuary.js also ports
    some js from frontend editing module (that hopefully can be removed in the future)
- /packages: Astro dev toolbar package. Can be toggled on at the bottom of the page.
  this communication to Drupal parent window to trigger front end editing forms.
- /recipes and /scripts: recipes and scripts for setting up the Drupal instance.
- /templates - the actual Astro starter kit.

## Teardown

To remove the Drupal instance (including the codebase and database):

1. Run `pnpm ddev:destroy`
