import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomizeLinks from ".";
import LinksContextProvider from "@/context/LinksContext";
import { patternsUrlsPlatforms } from "@/utils/utils";

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

describe("Componente CustomizeLinks", () => {
  it("Renderiza componente CustomizeLinks sem erros", () => {
    render(
      <LinksContextProvider>
        <CustomizeLinks />
      </LinksContextProvider>,
    );
    expect(screen.queryByText("Personalize seus links")).toBeInTheDocument();
  });

  it("Add Novo Link com plataforma e url valido, é salva e remove", () => {
    render(
      <LinksContextProvider>
        <CustomizeLinks />
      </LinksContextProvider>,
    );

    const buttonAddLink = screen.getByText("+ Adicionar novo link");

    fireEvent.click(buttonAddLink);

    //verifica se menudropdown esta fechado
    dropdownMenuClose();

    //abre menu dropdow
    fireEvent.click(screen.getByTitle("Abrir opções de escolha de plataforma"));

    //escolhe uma option
    const optionPlatformSelected = screen.getByText("Frontend Mentor");

    fireEvent.click(optionPlatformSelected);

    const inputUrl = screen.getByPlaceholderText(
      "https://www.frontendmentor.io/profile/:username",
    );

    fireEvent.change(inputUrl, {
      target: { value: "https://www.frontendmentor.io/profile/test-user" },
    });

    fireEvent.click(screen.getByText("Salvar"));

    expect(
      screen.getByText("Suas mudanças foram salvas com sucesso!"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Remover"));

    expect(
      screen.queryByTitle("Abrir opções de escolha de plataforma"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByPlaceholderText(
        "https://www.frontendmentor.io/profile/:username",
      ),
    ).not.toBeInTheDocument();
  });

  it("Add novo link com plataforma valida é url invalido é salva e remove", () => {
    render(
      <LinksContextProvider>
        <CustomizeLinks />
      </LinksContextProvider>,
    );

    const buttonAddLink = screen.getByText("+ Adicionar novo link");

    fireEvent.click(buttonAddLink);

    //verifica se menudropdown esta fechado
    dropdownMenuClose();

    //abre menu dropdow
    fireEvent.click(screen.getByTitle("Abrir opções de escolha de plataforma"));

    //escolhe uma option
    const optionPlatformSelected = screen.getByText("Frontend Mentor");

    fireEvent.click(optionPlatformSelected);

    const inputUrl = screen.getByPlaceholderText(
      "https://www.frontendmentor.io/profile/:username",
    );

    //add url invalida
    fireEvent.change(inputUrl, {
      target: { value: "hTp:/frontendmentor/Profile/" },
    });

    fireEvent.click(screen.getByText("Salvar"));

    expect(screen.getByText("Verifique o URL")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Remover"));

    expect(
      screen.queryByTitle("Abrir opções de escolha de plataforma"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByPlaceholderText(
        "https://www.frontendmentor.io/profile/:username",
      ),
    ).not.toBeInTheDocument();
  });

  it("Add novo link sem escolher plataforma e url e remove", () => {
    render(
      <LinksContextProvider>
        <CustomizeLinks />
      </LinksContextProvider>,
    );

    const buttonAddLink = screen.getByText("+ Adicionar novo link");

    fireEvent.click(buttonAddLink);

    //verifica se menudropdown esta fechado
    dropdownMenuClose();

    fireEvent.click(screen.getByText("Salvar"));

    expect(screen.getByText("Não pode estar vazio")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Remover"));

    expect(
      screen.queryByTitle("Abrir opções de escolha de plataforma"),
    ).not.toBeInTheDocument();
  });

  it("Add novo link sem escolher plataforma e inseri um url de teste e remove novo link add", () => {
    render(
      <LinksContextProvider>
        <CustomizeLinks />
      </LinksContextProvider>,
    );

    const buttonAddLink = screen.getByText("+ Adicionar novo link");

    fireEvent.click(buttonAddLink);

    //verifica se menudropdown esta fechado
    dropdownMenuClose();

    fireEvent.change(
      screen.getByTitle(
        "Insira link no seguinte formato https://www.teste.com",
      ),
      { target: { value: "https://www.teste.com" } },
    );

    fireEvent.click(screen.getByText("Salvar"));

    expect(screen.getByText("escolha plataforma")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Remover"));

    expect(
      screen.queryByTitle("Abrir opções de escolha de plataforma"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByTitle(
        "Insira link no seguinte formato https://www.teste.com",
      ),
    ).not.toBeInTheDocument();
  });

  it("Add varios novos links com plataforma e url valido e salva e remove", async () => {
    render(
      <LinksContextProvider>
        <CustomizeLinks />
      </LinksContextProvider>,
    );

    const buttonAddLink = screen.getByText("+ Adicionar novo link");

    patternsUrlsPlatforms.forEach((pup, index) => {
      fireEvent.click(buttonAddLink);
      //verifica se menudropdown esta fechado
      expect(
        screen
          .getAllByTitle("Abrir opções de escolha de plataforma")
          [index].getAttribute("aria-expanded"),
      ).toBe("false");
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
      //abre o menu dropdown
      fireEvent.click(
        screen.getAllByTitle("Abrir opções de escolha de plataforma")[index],
      );
      //escolhe a plataforma option do dropdown menu
      const optionPlatformSelected = screen.getByText(pup.platform);
      fireEvent.click(optionPlatformSelected);
      //add uma url valida baseada na plataforma
      const inputUrl = screen.getByPlaceholderText(pup.urlPlaceholder);
      let valueLink = pup.urlPlaceholder;
      if (pup.platform === "Stack Overflow") {
        valueLink = "https://stackoverflow.com/users/0/:username";
      }
      //add url invalida
      fireEvent.change(inputUrl, {
        target: { value: valueLink },
      });
      expect(screen.queryByText("Verifique o URL")).not.toBeInTheDocument();
    });
    //salva
    fireEvent.click(screen.getByText("Salvar"));
    expect(
      await screen.queryByText("Suas mudanças foram salvas com sucesso!"),
    ).toBeInTheDocument();
    //remove
    patternsUrlsPlatforms.forEach((pup, index) => {
      expect(screen.getByText("Link #1")).toBeInTheDocument();
      fireEvent.click(screen.getAllByText("Remover")[0]);
      expect(
        screen.queryByTitle(
          `Insira link no seguinte formato ${pup.urlPlaceholder}`,
        ),
      ).not.toBeInTheDocument();
    });
  });
});
