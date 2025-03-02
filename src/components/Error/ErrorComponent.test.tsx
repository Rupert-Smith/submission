import { render, screen } from "@testing-library/react";
import { ErrorComponent } from "./ErrorComponent";

describe("Error component", () => {
  it("renders error text correctly", () => {
    const errorText = "this is a test";

    render(<ErrorComponent errorText={errorText} />);

    const paragraph = screen.getByText(errorText);

    expect(paragraph).toBeInTheDocument();
  });
});
