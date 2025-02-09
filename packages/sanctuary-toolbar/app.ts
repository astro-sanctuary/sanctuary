import { defineToolbarApp } from "astro/toolbar";
import { render } from "preact";
import { html } from "htm/preact";

/**
 * Re-orient controls and highlights
 */
export const resetPosition = () => {
  const content = document.querySelectorAll<HTMLElement>("[data-sanctuary]");
  const highlights = document.querySelectorAll<HTMLElement>(
    ".sanctuary-highlight",
  );
  const buttons = document.querySelectorAll<HTMLElement>(".sanctuary-button");

  content.forEach((element) => {
    const i = element.getAttribute("data-index");
    if (i && highlights[i] && buttons[i]) {
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

/**
 * Re-position controls and highlights on resize.
 */
const resizeObserver = new ResizeObserver(() => {
  resetPosition();
});

/**
 * Send a message to the Drupal parent iframe. This is used to open the edit form.
 * @param e
 */
export const postMessage = (e) => {
  e.preventDefault();
  if (window && window.top !== window.self) {
    window.parent.postMessage(
      {
        type: "SANCTUARY_POST_MESSAGE",
        href: e.target.getAttribute("href"),
      },
      // TODO - TS issue?
      import.meta.env.PUBLIC_DRUPAL_BASE_URL ?? "*",
    );
  }
};

/**
 * In a standalone context, open the edit form in a new tab.
 */
export const openEdit = (e) => {
  if (window) {
    window.open(e.target.getAttribute("href"), "_blank");
  }
};

/**
 * Toggle the highlight for a given element.
 * @param e
 */
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

/* Components */

/**
 * A Drupal element with a button and highlight.
 * @param element
 * @param index
 */
export const DrupalElement = ({ element, index }) => {
  const isIframe = window && window.top !== window.self;
  const props = JSON.parse(element.getAttribute("data-sanctuary") || "");
  const href = isIframe ? props.iframe : props.edit;

  // Place a button and highlight for the element
  element.setAttribute("data-index", index.toString());
  const rect = element.getBoundingClientRect();
  const buttonStyle = `top: ${rect.top + window.scrollY}px;
          left: ${rect.left + window.scrollX}px;
          z-index: 2000000001;
          position: absolute;`;
  const iconStyle = `width: 1rem; height: 1rem; margin-left: 0;`;
  const highlightStyle = `top: ${rect.top + window.scrollY}px;
          left: ${rect.left + window.scrollX}px;
          width: ${rect.width}px;
          height: ${rect.height}px;
          display: none;`;

  return html`<astro-dev-toolbar-button
      class="sanctuary-button"
      href=${href}
      onClick=${isIframe ? postMessage : openEdit}
      onMouseEnter=${toggleHighlight}
      onMouseLeave=${toggleHighlight}
      style=${buttonStyle}
      data-index=${index}
      ><astro-dev-toolbar-icon
        icon="gear"
        style=${iconStyle}
        data-index=${index}
        href=${href}
      ></astro-dev-toolbar-icon
    ></astro-dev-toolbar-button>
    <astro-dev-toolbar-highlight
      class="sanctuary-highlight"
      style=${highlightStyle}
      data-index=${index}
    ></astro-dev-toolbar-highlight>`;
};

/**
 * The main app component.
 * @param content NodeListOf<HTMLElement>
 */
export const App = ({ content }) => {
  return Array.from(content, (element, index) => {
    return html`<${DrupalElement} element=${element} index=${index} />`;
  });
};

/**
 * Render the toolbar app.
 */
const renderApp = () => {
  const content = document.querySelectorAll<HTMLElement>("[data-sanctuary]");
  // Could also render to canvas (canvas: ShadowRoot) if it should be toggleable
  render(html`<${App} content=${content} />`, document.body);
};

/**
 * Re-render app after client-side navigation
 */
export const handleRoutingEvent = (observer = resizeObserver) => {
  observer.unobserve(document.body);
  renderApp();
  observer.observe(document.body);
  resetPosition();
};

export default defineToolbarApp({
  init(canvas, app) {
    // Set up and tear down toolbar app elements when the toolbar is toggled.
    app.onToggled(({ state }) => {
      if (state) {
        renderApp();
        resizeObserver.observe(document.body);
        document.addEventListener(
          "astro:page-load",
          async () => handleRoutingEvent,
        );
      } else {
        resizeObserver.unobserve(document.body);
        document.removeEventListener(
          "astro:page-load",
          async () => handleRoutingEvent,
        );
        // This looks a little horrifying, but  it just unmounts our Preact app.
        // https://stackoverflow.com/a/54853028
        render(null, document.body);
      }
    });
  },
});
