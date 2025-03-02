import { render, screen } from "@testing-library/react";
import { Loading } from "./Loading";

describe("Loading component", () => {
  it("renders loading text correctly", () => {
    const loadingText = "this is a test";

    render(<Loading loadingText={loadingText} />);

    const paragraph = screen.getByText(loadingText);

    expect(paragraph).toBeInTheDocument();
  });
});
