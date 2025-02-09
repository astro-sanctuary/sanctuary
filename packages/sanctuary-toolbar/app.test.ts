import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  resetPosition,
  handleRoutingEvent,
  postMessage as postMessageToParent,
  openEdit,
} from "./app";

// ...existing code...

describe("handleRoutingEvent", () => {
  const mockResizeObserver = {
    observe: vi.fn(),
    unobserve: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("properly handles routing events", () => {
    handleRoutingEvent(mockResizeObserver);
    expect(mockResizeObserver.unobserve).toHaveBeenCalledWith(document.body);
    expect(mockResizeObserver.observe).toHaveBeenCalledWith(document.body);
  });
});

describe("postMessageToParent", () => {
  it("sends message to parent window when in iframe", () => {
    const mockEvent = {
      preventDefault: vi.fn(),
      target: {
        getAttribute: vi.fn().mockReturnValue("/edit/1"),
      },
    };

    // Mock window.parent.postMessage
    const postMessageSpy = vi.fn();
    const originalWindow = { ...window };
    vi.stubGlobal("window", {
      ...originalWindow,
      top: { not: "self" },
      self: {},
      parent: {
        postMessage: postMessageSpy,
      },
    });

    postMessageToParent(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(postMessageSpy).toHaveBeenCalledWith(
      {
        type: "SANCTUARY_POST_MESSAGE",
        href: "/edit/1",
      },
      "*",
    );

    vi.stubGlobal("window", originalWindow);
  });
});

describe("openEdit", () => {
  it("opens edit link in new tab", () => {
    const mockEvent = {
      target: {
        getAttribute: vi.fn().mockReturnValue("/edit/1"),
      },
    };

    const windowOpenSpy = vi.fn();
    const originalWindow = { ...window };
    vi.stubGlobal("window", {
      ...originalWindow,
      open: windowOpenSpy,
    });

    openEdit(mockEvent);

    expect(windowOpenSpy).toHaveBeenCalledWith("/edit/1", "_blank");

    vi.stubGlobal("window", originalWindow);
  });
});
