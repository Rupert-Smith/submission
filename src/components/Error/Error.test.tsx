import { render, screen } from "@testing-library/react";
import { Error } from "./Error";

describe("Error component", () => {
  it("renders error text correctly", () => {
    const errorText = "this is a test";

    render(<Error errorText={errorText} />);

    const paragraph = screen.getByText(errorText);

    expect(paragraph).toBeInTheDocument();
  });
});
