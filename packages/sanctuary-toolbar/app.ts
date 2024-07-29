import { defineToolbarApp } from "astro/toolbar";
import { render } from "preact";
import { html } from "htm/preact";

export default defineToolbarApp({
  init(canvas) {
    const windowStyle = `left: initial;
      top: 8px;
      right: 8px;
      transform: none;
      width: 350px;
      min-height: 350px;
      max-height: 420px;
      overflow: hidden;`;

    const content = document.querySelectorAll<HTMLElement>("[data-sanctuary]");

    render(
      html`<astro-dev-toolbar-window style=${windowStyle}>
        <h2>Sanctuary Toolbar</h2>
        ${Array.from(content, (element) => {
          // highlight them element
          const rect = element.getBoundingClientRect();
          const style = `top: ${rect.top}px;
            left: ${rect.left}px;
            width: ${rect.width}px;
            height: ${rect.height}px;`;
          render(
            html`<astro-dev-toolbar-highlight style=${style} />`,
            document.body,
          );
          // List an entry for the element in the toolbar window.
          const props = JSON.parse(
            element.getAttribute("data-sanctuary") || "",
          );
          return html`<p>
            ${props.title}: <a href=${props.edit} target="_blank">Edit</a>
          </p>`;
        })}
      </astro-dev-toolbar-window>`,
      canvas,
    );
  },
});
