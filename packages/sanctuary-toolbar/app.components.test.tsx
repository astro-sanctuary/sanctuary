import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/preact";
import { html } from "htm/preact";
import { App } from "./app";

// Manually import the default export for mocking
import appInit from "./app";

describe("App", () => {
  it("renders DrupalElements for each content element", () => {
    const mockContent = [
      document.createElement("div"),
      document.createElement("div"),
    ];
    mockContent.forEach((el) => el.setAttribute("data-sanctuary", "{}"));

    const { container } = render(html`<${App} content=${mockContent} />`);

    expect(container.querySelectorAll(".sanctuary-button")).toHaveLength(2);
    expect(container.querySelectorAll(".sanctuary-highlight")).toHaveLength(2);
  });
});

describe("Toolbar initialization", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("handles toolbar toggle correctly", () => {
    const mockCanvas = document.createElement("div");
    const mockApp = {
      onToggled: vi.fn().mockImplementation((callback) => {
        // Test enabling toolbar
        callback({ state: true });

        // Verify elements are added
        expect(document.querySelectorAll("[data-sanctuary]")).toBeDefined();

        // Test disabling toolbar
        callback({ state: false });

        // Verify cleanup
        expect(document.body.children.length).toBe(0);
      }),
    };

    appInit.init(mockCanvas, mockApp);
    expect(mockApp.onToggled).toHaveBeenCalled();
  });
});
