import { defineToolbarApp } from "astro/toolbar";
import { render } from "preact";
import { html } from "htm/preact";

// Re-calculate highlights on resize.
// Should we do something similar for mutationObserver?
const resizeObserver = new ResizeObserver(() => {
  const content = document.querySelectorAll<HTMLElement>("[data-sanctuary]");
  const highlights = document.querySelectorAll<HTMLElement>(
    ".sanctuary-highlight",
  );
  for (let i = 0; i < content.length; i++) {
    const rect = content[i].getBoundingClientRect();
    highlights[i].style.width = `${rect.width}px`;
    highlights[i].style.height = `${rect.height}px`;
    highlights[i].style.top = `${rect.top}px`;
    highlights[i].style.left = `${rect.left}px`;
  }
});

export default defineToolbarApp({
  init(canvas, app) {
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
          // highlight the element
          const rect = element.getBoundingClientRect();
          const style = `top: ${rect.top}px;
            left: ${rect.left}px;
            width: ${rect.width}px;
            height: ${rect.height}px;
            display: none;`;

          render(
            html`<astro-dev-toolbar-highlight
              class="sanctuary-highlight"
              style=${style}
            />`,
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

    // Set up and tear down highlighted elements when the toolbar is toggled.
    app.onToggled(({ state }) => {
      const highlights = document.querySelectorAll<HTMLElement>(
        ".sanctuary-highlight",
      );
      highlights.forEach((highlight) => {
        highlight.style.display = state ? "block" : "none";
      });
      if (state) {
        resizeObserver.observe(document.body);
      } else {
        resizeObserver.unobserve(document.body);
      }
    });
  },
});
