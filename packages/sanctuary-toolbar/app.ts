import { defineToolbarApp } from "astro/toolbar";
import { render } from "preact";
import { html } from "htm/preact";

export default defineToolbarApp({
  init(canvas) {
    const content = document.querySelectorAll<HTMLElement>("[data-sanctuary]");
    const contentList = Array.from(content);
    render(
      html`<astro-dev-toolbar-window>
        ${contentList.map((element) => {
          const props = JSON.parse(
            element.getAttribute("data-sanctuary") || "",
          );
          return html`<p>
            ${props.title}: <a href=${props.edit} target="_blank"> Edit </a>
          </p>`;
        })}
      </astro-dev-toolbar-window>`,
      canvas,
    );
  },
});
