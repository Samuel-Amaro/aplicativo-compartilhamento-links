import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Preview from ".";
import ProfileContextProvider from "@/context/ProfileContext";
import LinksContextProvider from "@/context/LinksContext";
import iconProfile from "../../../public/images/icon-profile.png";
import { CustomizeLink } from "@/types/datas";
import { patternsUrlsPlatforms } from "@/utils/utils";
import userEvent from "@testing-library/user-event";

class LocalStorage {
  public localStorage: {
    [index: string]: string;
  };

  constructor() {
    this.localStorage = {};
  }

  getItem(key: string) {
    if (key) return this.localStorage[key];
    return null;
  }

  setItem(key: string, value: any) {
    this.localStorage[key] = value;
  }

  clear() {
    this.localStorage = {};
  }

  removeItem(key: string) {
    delete this.localStorage[key];
  }

  getAll() {
    return this.localStorage;
  }
}

export function toBase64(str: string) {
  return typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
}

const mockLocalStorage = new LocalStorage();

let mockCustomizeLinks: CustomizeLink[] = [];
let mockDataProfile: {
  dataUrlPicture?: string;
  firstName: string;
  lastName: string;
  email?: string;
} = { dataUrlPicture: "", firstName: "", lastName: "", email: "" };

beforeEach(() => {
  Object.defineProperty(window, "localStorage", { value: mockLocalStorage });
  mockDataProfile = {
    firstName: "Teste",
    lastName: "Sobre Nome",
    email: "teste@email.com",
    dataUrlPicture: `data:image/png;base64,${toBase64(iconProfile.src)}`,
  };
  mockLocalStorage.setItem("profile", JSON.stringify(mockDataProfile));
  mockCustomizeLinks = [];
  patternsUrlsPlatforms.forEach((value, index) => {
    mockCustomizeLinks.push({
      id: `${index}`,
      plataform: value.platform,
      link: value.urlPattern,
    });
  });
  mockLocalStorage.setItem("links", JSON.stringify(mockCustomizeLinks));
});

afterEach(() => {
  mockLocalStorage.clear();
  mockCustomizeLinks = [];
  mockDataProfile = {
    dataUrlPicture: "",
    firstName: "",
    lastName: "",
    email: "",
  };
});

describe("Componente Preview", () => {
  it("Renderiza o componente Preview Sem Erros", () => {
    render(
      <ProfileContextProvider>
        <LinksContextProvider>
          <Preview />
        </LinksContextProvider>
      </ProfileContextProvider>,
    );
    expect(screen.getByText("Compartilhar link")).toBeInTheDocument();
    expect(screen.getByText("Voltar ao Editor")).toBeInTheDocument();
  });

  it("Renderiza o componente Preview com dados de perfil e links customizados", () => {
    render(
      <ProfileContextProvider>
        <LinksContextProvider>
          <Preview />
        </LinksContextProvider>
      </ProfileContextProvider>,
    );
    expect(screen.getByAltText("Foto Perfil")).toBeInTheDocument();
    expect(screen.getByText("Teste Sobre Nome")).toBeInTheDocument();
    expect(screen.getByText("teste@email.com")).toBeInTheDocument();
    mockCustomizeLinks.forEach((value) => {
      expect(screen.queryByText(value.plataform)).toBeInTheDocument();
    });
  });

  it("Click é Pressionar Keys btn compartilhar copia url para area de trasferencia", async () => {
    const user = userEvent.setup();
    render(
      <ProfileContextProvider>
        <LinksContextProvider>
          <Preview />
        </LinksContextProvider>
      </ProfileContextProvider>,
    );
    await fireEvent.click(screen.getByText("Compartilhar link"));
    expect(
      screen.getByText("O link foi copiado para sua área de transferência!"),
    ).toBeInTheDocument();
    await fireEvent.keyDown(screen.getByText("Compartilhar link"), {
      key: "Enter",
    });
    expect(
      screen.getByText("O link foi copiado para sua área de transferência!"),
    ).toBeInTheDocument();
    await fireEvent.keyDown(screen.getByText("Compartilhar link"), {
      key: "",
    });
    expect(
      screen.getByText("O link foi copiado para sua área de transferência!"),
    ).toBeInTheDocument();
  });
});
