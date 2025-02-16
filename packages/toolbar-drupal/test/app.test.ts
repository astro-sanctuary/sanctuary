import { describe, it, expect, beforeEach } from "vitest";
import { resetPosition } from "../app";

describe("resetPosition", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-sanctuary data-index="0"></div>
      <div class="sanctuary-highlight"></div>
      <div class="sanctuary-button"></div>
    `;
  });

  it("updates position of highlights and buttons based on content elements", () => {
    const content = document.querySelector("[data-sanctuary]");
    const highlight = document.querySelector(".sanctuary-highlight");
    const button = document.querySelector(".sanctuary-button");

    // Mock getBoundingClientRect
    const mockRect = {
      width: 100,
      height: 50,
      top: 200,
      left: 150,
    };
    content.getBoundingClientRect = () => mockRect;

    // Mock window.scrollX/Y
    window.scrollX = 10;
    window.scrollY = 20;

    resetPosition();

    expect(highlight.style.width).toBe("100px");
    expect(highlight.style.height).toBe("50px");
    expect(highlight.style.top).toBe("220px"); // 200 + scrollY
    expect(highlight.style.left).toBe("160px"); // 150 + scrollX

    expect(button.style.top).toBe("220px");
    expect(button.style.left).toBe("160px");
  });
});
