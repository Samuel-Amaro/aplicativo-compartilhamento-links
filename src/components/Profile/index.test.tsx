import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Profile from ".";
import ProfileContextProvider from "@/context/ProfileContext";

describe("Componente Profile", () => {
  it("Renderiza o componente Profile sem erros", () => {
    render(
      <ProfileContextProvider>
        <Profile />
      </ProfileContextProvider>,
    );
    expect(screen.getByText("Foto do perfil")).toBeInTheDocument();
    expect(screen.getByText("Primeiro nome*")).toBeInTheDocument();
    expect(screen.getByText("Sobrenome*")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("Preenchendo os campos obrigatorios e salvando", async () => {
    render(
      <ProfileContextProvider>
        <Profile />
      </ProfileContextProvider>,
    );
    fireEvent.change(screen.getByTitle("Primeiro nome"), {
      target: { value: "João" },
    });
    fireEvent.change(screen.getByTitle("Sobrenome"), {
      target: { value: "Almeida Ramos" },
    });
    await fireEvent.click(screen.getByText("Salvar"));
    await waitFor(() => {
      expect(screen.getByText("Suas mudanças foram salvas com sucesso!"));
    });
  });

  it("Salvando formulario com campos obrigatorios vazios", () => {
    render(
      <ProfileContextProvider>
        <Profile />
      </ProfileContextProvider>,
    );
    fireEvent.change(screen.getByTitle("Primeiro nome"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByTitle("Sobrenome"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText("Salvar"));
    const messageValidations = screen.getAllByRole("alert");
    messageValidations.forEach((elem) => {
      expect(elem.textContent).toBe("Não pode estar vazio");
    });
  });

  it("Preenchendo todos campos do formulario e salvando", async () => {
    const file = new File(["profile"], "profile.png", {
      type: "image/png",
    });
    render(
      <ProfileContextProvider>
        <Profile />
      </ProfileContextProvider>,
    );
    const inputNome = screen.getByTitle("Primeiro nome") as HTMLInputElement;
    const inputSobrenome = screen.getByTitle("Sobrenome") as HTMLInputElement;
    const inputEmail = screen.getByTitle(
      "Entre com seu email",
    ) as HTMLInputElement;
    const inputFile = screen.getByTitle(
      "A imagem deve estar abaixo de 1024x1024px. Utilize o formato PNG ou JPG.",
    ) as HTMLInputElement;
    window.URL.createObjectURL = jest.fn();
    fireEvent.change(inputFile, {
      target: {
        files: [file],
      },
    });
    const fileList = inputFile.files as FileList;
    expect(fileList[0]).toStrictEqual(file);
    expect(fileList).toHaveLength(1);
    fireEvent.change(inputNome, {
      target: { value: "João" },
    });
    expect(inputNome.value).toBe("João");
    fireEvent.change(inputSobrenome, {
      target: { value: "Almeida Ramos" },
    });
    expect(inputSobrenome.value).toBe("Almeida Ramos");
    fireEvent.change(inputEmail, {
      target: { value: "joao.almeida@email.com" },
    });
    expect(inputEmail.value).toBe("joao.almeida@email.com");
    await fireEvent.click(screen.getByText("Salvar"));
    await waitFor(() => {
      expect(screen.getByText("Suas mudanças foram salvas com sucesso!"));
    });
  });
});
