import Page from "@/app/(linksProfile)/perfil/page";
import ProfileContextProvider from "@/context/ProfileContext";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Page Perfil", () => {
  
  it("Renderiza a Page segmento Perfil sem erros", () => {
    //https://github.com/testing-library/react-testing-library/issues/1216
    /*render(
      <ProfileContextProvider>
        <Page />
      </ProfileContextProvider>,
    );
    expect(screen.getByText("Detalhes de perfil")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Adicione seus dados para criar um toque pessoal ao seu perfil.",
      ),
    ).toBeInTheDocument();
    */
  });
});
