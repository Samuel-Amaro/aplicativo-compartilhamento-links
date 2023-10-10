import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NotFound from "../../app/not-found";

describe("UI not-found", () => {
  test("renderiza UI not-found sem erros", () => {
    render(<NotFound />);
    expect(screen.getByText("Não Encontrado")).toBeInTheDocument();
  });

  test("verifica href do link", () => {
    render(<NotFound />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
