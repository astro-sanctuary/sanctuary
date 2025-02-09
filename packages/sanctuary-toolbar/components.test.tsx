import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, fireEvent } from "@testing-library/preact";
import { html } from "htm/preact";
import { DrupalElement } from "./app";

describe("DrupalElement", () => {
  const mockElement = document.createElement("div");
  const mockRect = {
    width: 100,
    height: 50,
    top: 200,
    left: 150,
  };

  beforeEach(() => {
    mockElement.setAttribute(
      "data-sanctuary",
      JSON.stringify({
        iframe: "/node/1/edit?destination=/iframe",
        edit: "/node/1/edit",
      }),
    );
    mockElement.getBoundingClientRect = () => mockRect;
    window.scrollX = 10;
    window.scrollY = 20;
  });

  it("renders button and highlight with correct positioning", () => {
    const { container } = render(
      html`<${DrupalElement} element=${mockElement} index=${0} />`,
    );

    const button = container.querySelector(".sanctuary-button");
    const highlight = container.querySelector(".sanctuary-highlight");

    expect(button).toBeDefined();
    expect(highlight).toBeDefined();
    expect(button.style.top).toBe("220px"); // 200 + scrollY
    expect(button.style.left).toBe("160px"); // 150 + scrollX
  });

  it("uses iframe URL when in iframe context", () => {
    // Mock iframe environment
    Object.defineProperty(window, "self", { value: {} });
    Object.defineProperty(window, "top", { value: { not: "self" } });

    const { container } = render(
      html`<${DrupalElement} element=${mockElement} index=${0} />`,
    );
    const button = container.querySelector(".sanctuary-button");

    expect(button.getAttribute("href")).toBe(
      "/node/1/edit?destination=/iframe",
    );
  });

  it("uses edit URL when not in iframe context", () => {
    // Mock non-iframe environment
    Object.defineProperty(window, "self", { value: {} });
    Object.defineProperty(window, "top", { value: window.self });

    const { container } = render(
      html`<${DrupalElement} element=${mockElement} index=${0} />`,
    );
    const button = container.querySelector(".sanctuary-button");

    expect(button.getAttribute("href")).toBe("/node/1/edit");
  });

  it("toggles highlight visibility on mouse enter/leave", () => {
    const { container } = render(
      html`<${DrupalElement} element=${mockElement} index=${0} />`,
    );
    const button = container.querySelector(".sanctuary-button");
    const highlight = container.querySelector(".sanctuary-highlight");

    expect(highlight.style.display).toBe("none");

    fireEvent.mouseEnter(button);
    expect(highlight.style.display).toBe("block");

    fireEvent.mouseLeave(button);
    expect(highlight.style.display).toBe("none");
  });
});
