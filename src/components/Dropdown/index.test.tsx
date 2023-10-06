import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from ".";

const mockOnChange: jest.Mock<(value: string) => void> = jest.fn();
const mockCurrentValue = "Escolha Plataforma";

function dropdownMenuClose() {
  expect(
    screen
      .getByTitle("Abrir opções de escolha de plataforma")
      .getAttribute("aria-expanded"),
  ).toBe("false");
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
}

function dropdownMenuOpen() {
  expect(
    screen
      .getByTitle("Fechar opções de escolha da plataforma")
      .getAttribute("aria-expanded"),
  ).toBe("true");
  expect(screen.queryByRole("list")).toBeInTheDocument();
}

describe("Componente Dropdown", () => {
  test("Renderiza o componente Dropdown sem erros", () => {
    render(
      <Dropdown onChange={mockOnChange} currentValue={mockCurrentValue} />,
    );
    expect(screen.getByText("Escolha Plataforma")).toBeInTheDocument();
  });

  test("Expande/Recolhe o menu dropdown com click", () => {
    render(
      <Dropdown onChange={mockOnChange} currentValue={mockCurrentValue} />,
    );

    //dropdown menu fechado
    dropdownMenuClose();

    fireEvent.click(screen.getByTitle("Abrir opções de escolha de plataforma"));

    //dropdown menu aberto
    dropdownMenuOpen();

    fireEvent.click(
      screen.getByTitle("Fechar opções de escolha da plataforma"),
    );

    //dropdown menu fechado
    dropdownMenuClose();
  });

  test("Expande/Recolhe menu dropdown ao pressionar keys", () => {
    render(
      <Dropdown onChange={mockOnChange} currentValue={mockCurrentValue} />,
    );

    //dropdown menu fechado
    dropdownMenuClose();

    fireEvent.keyDown(
      screen.getByTitle("Abrir opções de escolha de plataforma"),
      { key: "Enter" },
    );

    //dropdown menu aberto
    dropdownMenuOpen();

    fireEvent.keyDown(
      screen.getByTitle("Fechar opções de escolha da plataforma"),
      { key: "Esc" },
    );

    //dropdown menu fechado
    dropdownMenuClose();

    fireEvent.keyDown(
      screen.getByTitle("Abrir opções de escolha de plataforma"),
      { key: "ArrowDown" },
    );

    //aberto
    dropdownMenuOpen();

    fireEvent.keyDown(
      screen.getByTitle("Fechar opções de escolha da plataforma"),
      { key: "Esc" },
    );

    //dropdown menu fechado
    dropdownMenuClose();

    fireEvent.keyDown(
      screen.getByTitle("Abrir opções de escolha de plataforma"),
      { key: " " },
    );

    //aberto
    dropdownMenuOpen();

    fireEvent.keyDown(
      screen.getByTitle("Fechar opções de escolha da plataforma"),
      { key: "Esc" },
    );

    //dropdown menu fechado
    dropdownMenuClose();

    fireEvent.keyDown(
      screen.getByTitle("Abrir opções de escolha de plataforma"),
      { key: "ArrowUp" },
    );

    //aberto
    dropdownMenuOpen();

    fireEvent.keyDown(
      screen.getByTitle("Fechar opções de escolha da plataforma"),
      { key: "Esc" },
    );

    //dropdown menu fechado
    dropdownMenuClose();
  });

  it("seleciona uma opção do dropdown menu com click e fecha o menu automaticamente", () => {
    render(
      <Dropdown onChange={mockOnChange} currentValue={mockCurrentValue} />,
    );

    expect(
      screen
        .getByTitle("Abrir opções de escolha de plataforma")
        .getAttribute("aria-expanded"),
    ).toBe("false");

    expect(screen.queryByRole("list")).not.toBeInTheDocument();

    //abre menu com click
    fireEvent.click(screen.getByTitle("Abrir opções de escolha de plataforma"));

    expect(screen.queryByRole("list")).toBeInTheDocument();

    const optionMenuDropdown = screen.getByText("Twitch");

    //apos escolher option via click o menu dropdown e fechado automaticamente
    fireEvent.click(optionMenuDropdown);

    expect(mockOnChange).toHaveBeenCalledWith("Twitch");

    dropdownMenuClose();

    expect(
      screen
        .getByTitle("Abrir opções de escolha de plataforma")
        .textContent?.trim(),
    ).toBe("Twitch");
  });

  it("seleciona uma opção do dropdown menu ao pressionar keys fecha menu automaticamente", () => {
    render(
      <Dropdown onChange={mockOnChange} currentValue={mockCurrentValue} />,
    );

    expect(
      screen
        .getByTitle("Abrir opções de escolha de plataforma")
        .getAttribute("aria-expanded"),
    ).toBe("false");

    expect(screen.queryByRole("list")).not.toBeInTheDocument();

    //abre menu ao pressionar chave ArrowDown
    fireEvent.keyDown(
      screen.getByTitle("Abrir opções de escolha de plataforma"),
      { key: "ArrowDown" },
    );

    expect(screen.queryByRole("list")).toBeInTheDocument();

    const optionMenuDropdown = screen.getByText("Twitch");

    fireEvent.keyDown(optionMenuDropdown, { key: "Enter" });

    expect(mockOnChange).toHaveBeenCalledWith("Twitch");

    dropdownMenuClose();

    expect(screen.queryByRole("list")).not.toBeInTheDocument();

    expect(
      screen
        .getByTitle("Abrir opções de escolha de plataforma")
        .textContent?.trim(),
    ).toBe("Twitch");
  });

  it("fechar o menu dropdown via key quando estiver em uma option do menu", () => {
    render(
      <Dropdown onChange={mockOnChange} currentValue={mockCurrentValue} />,
    );

    expect(
      screen
        .getByTitle("Abrir opções de escolha de plataforma")
        .getAttribute("aria-expanded"),
    ).toBe("false");

    expect(screen.queryByRole("list")).not.toBeInTheDocument();

    //abre menu ao pressionar chave ArrowUp
    fireEvent.keyDown(
      screen.getByTitle("Abrir opções de escolha de plataforma"),
      { key: "ArrowUp" },
    );

    expect(screen.queryByRole("list")).toBeInTheDocument();

    const optionMenuDropdown = screen.getByText("Twitch");

    fireEvent.keyDown(optionMenuDropdown, { key: "Esc" });

    dropdownMenuClose();

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("fechar o dropdown menu via click quando clicar fora do menu", () => {
    render(
      <Dropdown onChange={mockOnChange} currentValue={mockCurrentValue} />,
    );

    const dropdownContainer = screen.getByTestId("container-dropdown");

    expect(
      screen
        .getByTitle("Abrir opções de escolha de plataforma")
        .getAttribute("aria-expanded"),
    ).toBe("false");

    expect(screen.queryByRole("list")).not.toBeInTheDocument();

    //abre menu com click
    fireEvent.click(screen.getByTitle("Abrir opções de escolha de plataforma"));

    expect(screen.queryByRole("list")).toBeInTheDocument();

    //fechar menu clicando fora
    fireEvent.click(dropdownContainer);

    dropdownMenuClose();

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
