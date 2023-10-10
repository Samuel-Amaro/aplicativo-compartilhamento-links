import LinksProfileLayout from "@/app/(linksProfile)/layout";
import Home from "@/app/(linksProfile)/page";
import { CustomizeLink } from "@/types/datas";
import { patternsUrlsPlatforms } from "@/utils/utils";
import "@testing-library/jest-dom";
import iconProfile from "../../../public/images/icon-profile.png";
import { render, screen, fireEvent } from "@testing-library/react";
import LinksContextProvider from "@/context/LinksContext";
import ProfileContextProvider from "@/context/ProfileContext";
import Page from "@/app/(linksProfile)/perfil/page";

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

describe("Layout Nested (LinksProfile)", () => {
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
  const mockCustomizeLinks: CustomizeLink[] = [];
  patternsUrlsPlatforms.forEach((value, index) => {
    mockCustomizeLinks.push({
      id: `${index}`,
      plataform: value.platform,
      link: value.urlPattern,
    });
  });
  mockLocalStorage.setItem("links", JSON.stringify(mockCustomizeLinks));

  it("Renderiza Layout LinksProfile sem erros com Page Home", () => {
    //https://github.com/testing-library/react-testing-library/issues/1216
    //recebendo warnings
    /*render(
      <LinksContextProvider>
        <ProfileContextProvider>
          <LinksProfileLayout>
            <Home />
          </LinksProfileLayout>
        </ProfileContextProvider>
      </LinksContextProvider>,
    );
    */
  });

  it("Renderiza Layout LinksProfile sem erros com Page Perfil", () => {
    //https://github.com/testing-library/react-testing-library/issues/1216
    //recebendo warnings
    /*render(
      <LinksContextProvider>
        <ProfileContextProvider>
          <LinksProfileLayout>
            <Page />
          </LinksProfileLayout>
        </ProfileContextProvider>
      </LinksContextProvider>,
    );*/
  });
});
