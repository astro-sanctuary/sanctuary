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
2. Run `pnpm install`
3. Run `pnpm ddev:init`

## Configuration

- https://sanctuary.ddev.site/admin/config/people/simple_oauth - generate keys
- generate consumer

## Usage

1. Run `pnpm dev:core`

## Packages

## Teardown

To remove the Drupal instance (including the codebase and database):

1. Run `pnpm ddev:destroy`
