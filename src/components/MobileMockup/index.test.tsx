import "@testing-library/jest-dom";
import { render, screen} from "@testing-library/react";
import MobileMockup from ".";
import LinksContextProvider from "@/context/LinksContext";
import ProfileContextProvider from "@/context/ProfileContext";
import useMatchMedia from "@/hooks/useMatchMedia";
import iconProfile from "../../../public/images/icon-profile.png";
import { CustomizeLink } from "@/types/datas";
import { patternsUrlsPlatforms } from "@/utils/utils";

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
      if (global.innerWidth >= 950) {
        return desktopContent;
      }
      return mobileContent;
    },
  ),
}));

const mockedUseMatchMedia = jest.mocked(useMatchMedia);

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

beforeEach(() => {
  Object.defineProperty(window, "localStorage", { value: mockLocalStorage });
});

afterEach(() => {
  mockLocalStorage.clear();
});

describe("Componente MobileMockup", () => {
  it("Renderiza o componente MobileMockup sem erros", () => {
    const mockDataProfile: {
      dataUrlPicture?: string;
      firstName: string;
      lastName: string;
      email?: string;
    } = {
      firstName: "Teste",
      lastName: "Sobre Nome",
      email: "teste@email.com",
      dataUrlPicture: `data:image/png;base64,${toBase64(iconProfile.src)}`,
    };
    mockLocalStorage.setItem("profile", JSON.stringify(mockDataProfile));
    render(
      <LinksContextProvider>
        <ProfileContextProvider>
          <MobileMockup />
        </ProfileContextProvider>
      </LinksContextProvider>,
    );
    expect(screen.getByText("Teste Sobre Nome")).toBeInTheDocument();
    expect(screen.getByText("teste@email.com")).toBeInTheDocument();
    expect(screen.getByAltText("Foto Perfil")).toBeInTheDocument();
  });

  it("Renderiza o componente MobileMockup sem foto de perfil e email somente nome", () => {
    const mockDataProfile: {
      dataUrlPicture?: string;
      firstName: string;
      lastName: string;
      email?: string;
    } = {
      firstName: "Teste",
      lastName: "Sobre Nome",
      email: "",
      dataUrlPicture: "",
    };
    mockLocalStorage.setItem("profile", JSON.stringify(mockDataProfile));
    render(
      <LinksContextProvider>
        <ProfileContextProvider>
          <MobileMockup />
        </ProfileContextProvider>
      </LinksContextProvider>,
    );
    expect(screen.getByText("TS")).toBeInTheDocument();
    expect(screen.getByText("Teste Sobre Nome")).toBeInTheDocument();
    expect(screen.queryByText("teste@email.com")).not.toBeInTheDocument();
    expect(screen.queryByAltText("Foto Perfil")).not.toBeInTheDocument();
  });

  it("Renderiza MobileMockup com dados de perfil e links customizados", () => {
    const mockCustomizeLinks: CustomizeLink[] = [];
    patternsUrlsPlatforms.forEach((value, index) => {
      mockCustomizeLinks.push({
        id: `${index}`,
        plataform: value.platform,
        link: value.urlPattern,
      });
    });
    mockLocalStorage.setItem("links", JSON.stringify(mockCustomizeLinks));
    render(
      <LinksContextProvider>
        <ProfileContextProvider>
          <MobileMockup />
        </ProfileContextProvider>
      </LinksContextProvider>,
    );
    mockCustomizeLinks.forEach((value) => {
      expect(screen.queryByText(value.plataform)).toBeInTheDocument();
    });
  });
});
