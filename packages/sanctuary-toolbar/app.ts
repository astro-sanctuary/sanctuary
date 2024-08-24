import { defineToolbarApp } from "astro/toolbar";
import { render } from "preact";
import { html } from "htm/preact";

const resetPosition = () => {
  const content = document.querySelectorAll<HTMLElement>("[data-sanctuary]");
  const highlights = document.querySelectorAll<HTMLElement>(
    ".sanctuary-highlight",
  );
  for (let i = 0; i < content.length; i++) {
    const rect = content[i].getBoundingClientRect();
    highlights[i].style.width = `${rect.width}px`;
    highlights[i].style.height = `${rect.height}px`;
    highlights[i].style.top = `${rect.top + window.scrollY}px`;
    highlights[i].style.left = `${rect.left + window.scrollX}px`;
  }
};

// Re-calculate highlights on resize.
// TODO - need to do more work here for routing.
// Should we do something similar for mutationObserver?
const resizeObserver = new ResizeObserver(() => {
  resetPosition();
});

export default defineToolbarApp({
  init(canvas, app) {
    const content = document.querySelectorAll<HTMLElement>("[data-sanctuary]");

    const postMessage = (e) => {
      // Send a generic post message to the parent window.
      e.preventDefault();
      if (window && window.top !== window.self) {
        // TODO  - update second argument to be target origin.
        window.parent.postMessage({ type: "SANCTUARY_POST_MESSAGE" }, "*");
      }
    };

    render(
      html`
        ${Array.from(content, (element, index) => {
          // Place a button and highlight for the element
          element.setAttribute("data-index", index.toString());
          element.addEventListener("mouseover", () => {
            const relatedHighlight = document.querySelector(
              `.sanctuary-highlight[data-index="${index}"]`,
            );
            if (relatedHighlight) {
              (relatedHighlight as HTMLElement).style.display = "block";
            }
          });
          const rect = element.getBoundingClientRect();
          const buttonStyle = `top: ${rect.top + window.scrollY}px;
            left: ${rect.left + window.scrollX}px;
            z-index: 2000000001;
            position: absolute;`;
          const iconStyle = `width: 1.5rem; height: 1.5rem; margin-left: 0;`;
          const highlightStyle = `top: ${rect.top + window.scrollY}px;
            left: ${rect.left + window.scrollX}px;
            width: ${rect.width}px;
            height: ${rect.height}px;
            display: none;`;

          render(
            html`
              <astro-dev-toolbar-button
                class="sanctuary-button"
                href="https://sanctuary.ddev.site/node/2/edit"
                onClick=${postMessage}
                style=${buttonStyle}
              >
                <astro-dev-toolbar-icon
                  icon="gear"
                  style=${iconStyle}
                  data-index=${index}
                ></astro-dev-toolbar-icon>
              </astro-dev-toolbar-button>
              <astro-dev-toolbar-highlight
                class="sanctuary-highlight"
                style=${highlightStyle}
                onMouseOut=${(e) => (e.target.style.display = "none")}
                data-index=${index}
              ></astro-dev-toolbar-highlight>
            `,
            document.body,
          );
        })}
      `,
      canvas,
    );

    // Set up and tear down highlighted elements when the toolbar is toggled.
    app.onToggled(({ state }) => {
      if (state) {
        resizeObserver.observe(document.body);
        resetPosition();
      } else {
        resizeObserver.unobserve(document.body);
      }
    });
  },
});
