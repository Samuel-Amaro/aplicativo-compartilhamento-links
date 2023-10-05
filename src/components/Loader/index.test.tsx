import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Loader from ".";

describe("Componente Loader", () => {
  it("Renderiza componente Loader sem erros", () => {
    render(<Loader text="Loading..." />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
