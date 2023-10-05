import Loading from "@/app/loading";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoadingVisualizar from "@/app/visualizar/loading";
import LoadingPerfil from "@/app/(linksProfile)/perfil/loading";

describe("UI Loading", () => {
  test("renderiza UI Loading sem erros segmento /", () => {
    render(<Loading />);
    expect(screen.getByText("Bem Vindo!!!")).toBeInTheDocument();
  });

  test("renderiza UI Loading sem erros segmento /visualizar", () => {
    render(<LoadingVisualizar />);
    expect(
      screen.getByText("Carregando Página Visualizar..."),
    ).toBeInTheDocument();
  });

  test("renderiza UI Loading sem erros segmento /perfil", () => {
    render(<LoadingPerfil />);
    expect(screen.getByText("Carregando Página Perfil...")).toBeInTheDocument();
  });
});
