import ErrorView from "@/app/error";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

const error = new Error("oops um error!");
const reset = jest.fn();

describe("UI de tratamento de error amigavel para o user", () => {
  test("renderiza a UI manipulação de error sem erros", () => {
    render(<ErrorView error={error} reset={reset} />);
    expect(screen.getByText("Algo deu errado!")).toBeInTheDocument();
  });

  test("Click botão Tentar Novamente chama reset", () => {
    render(<ErrorView error={error} reset={reset} />);
    const button = screen.getByText("Tentar Novamente!");
    fireEvent.click(button);
    expect(reset).toHaveBeenCalled();
  });

  test("Pressionar chaves botão tentar novamente chama reset", () => {
    render(<ErrorView error={error} reset={reset} />);
    const button = screen.getByText("Tentar Novamente!");
    fireEvent.keyDown(button, { key: "Enter" });
    expect(reset).toHaveBeenCalled();
  });

  test("Check href link", () => {
    render(<ErrorView error={error} reset={reset} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
