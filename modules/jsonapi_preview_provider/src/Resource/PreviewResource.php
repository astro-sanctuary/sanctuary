<?php

namespace Drupal\jsonapi_preview_provider\Resource;

use Drupal\jsonapi_resources\Resource\EntityResourceBase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Route;
use Drupal\Core\Cache\CacheableMetadata;

/**
 * Processes a request for a collection containing a resource being edited.
 *
 * @internal
 */
class PreviewResource extends EntityResourceBase {

  /**
   * Process the resource request.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The request.
   *
   * @return \Drupal\jsonapi\ResourceResponse
   *   The response.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function process(Request $request) {
    $tempstore_key = $request->get('id');

    if (isset($tempstore_key)) {
      $form_state = \Drupal::service('tempstore.shared')->get('jsonapi_preview_provider')->get($tempstore_key);
      $entity = $form_state->getFormObject()->getEntity();
    }

    $entity->mergeCacheMaxAge(0);

    $data = $this->createIndividualDataFromEntity($entity);
    $response = $this->createJsonapiResponse($data, $request);

    return $response;
  }

  /**
   * {@inheritdoc}
   */
  public function getRouteResourceTypes(Route $route, string $route_name): array {
    return $this->getResourceTypesByEntityTypeId('node');
  }

}
