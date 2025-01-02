<?php

declare(strict_types=1);

namespace Drupal\sanctuary_graphql\Plugin\GraphQLCompose\FieldType;

use Drupal\graphql_compose\Plugin\GraphQL\DataProducer\FieldProducerTrait;
use Drupal\graphql_compose\Plugin\GraphQLCompose\GraphQLComposeFieldTypeBase;

/**
 * {@inheritDoc}
 *
 * @GraphQLComposeFieldType(
 *   id = "iconify_icon",
 *   type_sdl = "String",
 * )
 */
class IconifyIcon extends GraphQLComposeFieldTypeBase {

  use FieldProducerTrait;

  /**
   * Value to return to getProducerProperty in FieldProducerTrait.
   *
   * This could be value, entity, something_id, whatever.
   * It's equivalent to $entity->field_abc->value
   *
   * @var string
   */
  public $producerProperty = 'icon';
}
