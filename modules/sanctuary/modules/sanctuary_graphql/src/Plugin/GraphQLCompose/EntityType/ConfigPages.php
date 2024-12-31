<?php

/**
 * See https://www.drupal.org/project/graphql_compose/issues/3448998
 */

declare(strict_types=1);

namespace Drupal\sanctuary_graphql\Plugin\GraphQLCompose\EntityType;

use Drupal\graphql_compose\Plugin\GraphQLCompose\GraphQLComposeEntityTypeBase;

/**
 * {@inheritdoc}
 *
 * @GraphQLComposeEntityType(
 *   id = "config_pages",
 *   base_fields = {
 *     "langcode" = {},
 *     "path" = {
 *       "required" = FALSE,
 *     },
 *     "created" = {},
 *     "changed" = {},
 *     "published_at" = {},
 *     "status" = {},
 *     "promote" = {},
 *     "sticky" = {},
 *     "title" = {
 *       "field_type" = "entity_label",
 *     },
 *   },
 * )
 */
class ConfigPages extends GraphQLComposeEntityTypeBase {

}
