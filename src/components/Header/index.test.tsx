import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from ".";
import useMatchMedia from "@/hooks/useMatchMedia";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock("../../hooks/useMatchMedia", () => ({
  __esModule: true,
  default: jest.fn(
    ({
      mobileContent,
      desktopContent,
      mediaQuery,
    }: {
      mobileContent: JSX.Element | null;
      desktopContent: JSX.Element | null;
      mediaQuery: string;
    }) => {
      if (global.innerWidth >= 768) {
        return desktopContent;
      }
      return mobileContent;
    },
  ),
}));
const mockedUseMatchMedia = jest.mocked(useMatchMedia);

describe("Componente Header", () => {
  it("Deve renderizar o componente Header corretamente", () => {
    global.innerWidth = 375;
    render(<Header />);
    expect(screen.getByLabelText("Home")).toBeInTheDocument();
    expect(screen.getByLabelText("Ir para página Home")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Ir para página detalhes perfil"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Ir para página visualização"),
    ).toBeInTheDocument();
  });

  it("deve renderizar a versão desktop", () => {
    global.innerWidth = 800;
    render(<Header />);
    expect(screen.getByLabelText("Home")).toBeInTheDocument();
    expect(screen.getByLabelText("Ir para página Links")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Ir para página detalhes perfil"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Ir para página visualização"),
    ).toBeInTheDocument();
  });
});
