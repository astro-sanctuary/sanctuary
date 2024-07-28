import { defineToolbarApp } from "astro/toolbar";
import { render } from "preact";
import { html } from "htm/preact";

export default defineToolbarApp({
  init(canvas) {
    const content =
      document.querySelectorAll<HTMLElement>("[data-drupal-edit]");
    const contentList = Array.from(content);
    render(
      html`<astro-dev-toolbar-window
        >${contentList.map((element) => {
          return html`<a href=${element.getAttribute("data-drupal-edit") || ""} target="_blank">${element.getAttribute("data-drupal-edit")}</p>`;
        })}</astro-dev-toolbar-window
      >`,
      canvas
    );
  },
});
