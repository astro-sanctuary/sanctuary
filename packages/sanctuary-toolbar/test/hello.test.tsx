import { h } from "preact";
import { render, screen } from "@testing-library/preact";

function HelloWorld() {
  return <div>Hello, World!</div>;
}

describe("HelloWorld component", () => {
  it("renders hello world message", () => {
    render(<HelloWorld />);
    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });
});
