import { defineToolbarApp } from "astro/toolbar";
import { render } from "preact";
import { html } from "htm/preact";

const resetPosition = () => {
  const content = document.querySelectorAll<HTMLElement>("[data-sanctuary]");
  const highlights = document.querySelectorAll<HTMLElement>(
    ".sanctuary-highlight",
  );
  const buttons = document.querySelectorAll<HTMLElement>(".sanctuary-button");
  content.forEach((element) => {
    const i = element.getAttribute("data-index");
    if (i) {
      const rect = element.getBoundingClientRect();
      highlights[i].style.width = `${rect.width}px`;
      highlights[i].style.height = `${rect.height}px`;
      highlights[i].style.top = `${rect.top + window.scrollY}px`;
      highlights[i].style.left = `${rect.left + window.scrollX}px`;
      buttons[i].style.top = `${rect.top + window.scrollY}px`;
      buttons[i].style.left = `${rect.left + window.scrollX}px`;
    }
  });
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
    const isIframe = window && window.top !== window.self;

    const postMessage = (e) => {
      // Send a generic post message to the parent window.
      e.preventDefault();
      if (window && window.top !== window.self) {
        // TODO  - update second argument to be target origin.
        window.parent.postMessage(
          {
            type: "SANCTUARY_POST_MESSAGE",
            href: e.target.getAttribute("href"),
          },
          "*",
        );
      }
    };

    resizeObserver.observe(document.body);

    const openEdit = (e) => {
      if (window) {
        window.open(e.target.getAttribute("href"), "_blank");
      }
    };

    const toggleHighlight = (e) => {
      const relatedHighlight = document.querySelector(
        `.sanctuary-highlight[data-index="${e.target.dataset.index}"]`,
      );
      if (relatedHighlight) {
        const display = (relatedHighlight as HTMLElement).style.display;
        display === "block"
          ? ((relatedHighlight as HTMLElement).style.display = "none")
          : ((relatedHighlight as HTMLElement).style.display = "block");
      }
    };

    render(
      html`
        ${Array.from(content, (element, index) => {
          const props = JSON.parse(
            element.getAttribute("data-sanctuary") || "",
          );
          const href = isIframe ? props.iframe : props.edit;
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
                href=${href}
                onClick=${isIframe ? postMessage : openEdit}
                onMouseEnter=${toggleHighlight}
                onMouseLeave=${toggleHighlight}
                style=${buttonStyle}
                data-index=${index}
              >
                <astro-dev-toolbar-icon
                  icon="gear"
                  style=${iconStyle}
                  data-index=${index}
                  href=${href}
                ></astro-dev-toolbar-icon>
              </astro-dev-toolbar-button>
              <astro-dev-toolbar-highlight
                class="sanctuary-highlight"
                style=${highlightStyle}
                onMouseLeave=${(e) => (e.target.style.display = "none")}
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
      // if (state) {
      //   resizeObserver.observe(document.body);
      //   resetPosition();
      // } else {
      //   resizeObserver.unobserve(document.body);
      // }
    });
  },
});
