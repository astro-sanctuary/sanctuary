/**
 * @file
 * Sanctuary behaviors.
 */
(function (Drupal) {
  "use strict";
  // Global variables
  let sidebarWidth = 30;
  let sidebarFullWidth = 70;

  // Remove all placeholders.
  const removePlaceholder = function () {
    // Delete all previews placeholders.
    const previewElements = document.querySelectorAll(
      ".frontend-editing--placeholder",
    );
    previewElements.forEach(function (previewElement) {
      previewElement.remove();
    });
    const activeEditingElements = document.querySelectorAll(
      ".frontend-editing--active-editing",
    );
    activeEditingElements.forEach(function (activeEditingElement) {
      activeEditingElement.classList.remove("frontend-editing--active-editing");
      activeEditingElement.classList.remove("frontend-editing--outline");
    });
  };

  // Callback for click function on an editable element.
  const editingClick = function (e) {
    // e.preventDefault();
    // Setup container.
    // Frontend-editing sidebar and full widths.
    const wideClassWidth = `${sidebarFullWidth}%`;
    const sidebarClassWidth = `${sidebarWidth}%`;

    let editContainer = document.getElementById("editing-container");
    if (!editContainer) {
      editContainer = document.createElement("div");
      editContainer.id = "editing-container";
      editContainer.classList.add(
        "editing-container",
        "editing-container--loading",
      );
      document.body.append(editContainer);
      editContainer.style.width = sidebarClassWidth;
    } else {
      editContainer.innerHTML = "";
    }
    // Setup width toggle button.
    const editWideClass = "editing-container--wide";
    const widthToggle = document.createElement("button");
    widthToggle.type = "button";
    widthToggle.className = "editing-container__toggle";
    widthToggle.addEventListener("click", function (e) {
      if (editContainer.classList.contains(editWideClass)) {
        editContainer.classList.remove(editWideClass);
        editContainer.style.width = sidebarClassWidth;
      } else {
        editContainer.classList.add(editWideClass);
        editContainer.style.width = wideClassWidth;
      }
    });
    // Setup close button.
    const editClose = document.createElement("button");
    editClose.className = "editing-container__close";
    editClose.type = "button";
    editClose.addEventListener("click", function (e) {
      editContainer.remove();
      removePlaceholder();
    });

    const actions = document.createElement("div");
    actions.classList.add("editing-container__actions");
    actions.appendChild(widthToggle);
    actions.appendChild(editClose);

    // Populate container.
    editContainer.appendChild(actions);

    // Load editing iFrame and append.
    const iframe = document.createElement("iframe");
    iframe.onload = function () {
      editContainer.classList.remove("editing-container--loading");
    };
    editContainer.appendChild(iframe);
    iframe.src = e.href;

    removePlaceholder();

    // I don't think this applies to us.

    // const entityContainer = e.target.closest(".frontend-editing");
    // if (e.target.classList.contains("frontend-editing__action--edit")) {
    //   entityContainer.classList.add("frontend-editing--active-editing");
    // }
    // // Add placeholder for preview if add actions were triggered.
    // if (
    //   e.target.classList.contains("frontend-editing__action--after") ||
    //   e.target.classList.contains("frontend-editing__action--before")
    // ) {
    //   if (entityContainer.dataset.preview) {
    //     const placeholder = document.createElement(entityContainer.tagName);
    //     placeholder.innerHTML = Drupal.t(
    //       'Here will be your new content. Click "Preview" button in the form to see it.',
    //     );
    //     placeholder.classList.add("frontend-editing");
    //     placeholder.classList.add("frontend-editing--placeholder");
    //     if (e.target.classList.contains("frontend-editing__action--after")) {
    //       placeholder.dataset.preview = `${entityContainer.dataset.preview}-after`;
    //       entityContainer.parentNode.insertBefore(
    //         placeholder,
    //         entityContainer.nextSibling,
    //       );
    //     }
    //     if (e.target.classList.contains("frontend-editing__action--before")) {
    //       placeholder.dataset.preview = `${entityContainer.dataset.preview}-before`;
    //       entityContainer.parentNode.insertBefore(
    //         placeholder,
    //         entityContainer.previousSibling,
    //       );
    //     }
    //   }
    // }
  };

  window.addEventListener(
    "message",
    (event) => {
      // This could come from Sanctuary settings.
      // const { routeSyncType = "DECOUPLED_PREVIEW_IFRAME_ROUTE_SYNC" } =
      //   drupalSettings.decoupled_preview_iframe;
      const messageType = "SANCTUARY_POST_MESSAGE";
      const { data } = event;

      if (data.type !== messageType) {
        return;
      }

      editingClick(data);
    },
    false,
  );

  Drupal.behaviors.sanctuarySanctuary = {
    attach(context, settings) {},
  };
})(Drupal);
