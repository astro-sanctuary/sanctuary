<?php

declare(strict_types=1);

namespace Drupal\sanctuary_graphql\Plugin\GraphQLCompose\FieldType;

use Drupal\graphql_compose\Plugin\GraphQL\DataProducer\FieldProducerTrait;
use Drupal\graphql_compose\Plugin\GraphQLCompose\GraphQLComposeFieldTypeBase;

/**
 * {@inheritdoc}
 *
 * @GraphQLComposeFieldType(
 *   id = "iconify_icon",
 *   type_sdl = "IconifyIcon",
 * )
 */
class IconifyIcon extends GraphQLComposeFieldTypeBase {

  use FieldProducerTrait;

}
