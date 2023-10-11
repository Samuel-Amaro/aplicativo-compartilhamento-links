import LinksContextProvider, { useLinksContext } from "@/context/LinksContext";
import { CustomizeLink } from "@/types/datas";
import { patternsUrlsPlatforms } from "@/utils/utils";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Link from "next/link";

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

const mockLocalStorage = new LocalStorage();
let mockCustomizeLinks: CustomizeLink[] = [];

beforeEach(() => {
  Object.defineProperty(window, "localStorage", { value: mockLocalStorage });
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
});

function TestComponent() {
  const profileContext = useLinksContext();
  return (
    <ul>
      {profileContext.customizeLinks.map((cl) => (
        <li key={cl.id}>
          <Link
            href={cl.link}
            title={cl.plataform}
            aria-label={cl.plataform}
            target="_blank"
            rel="external"
          >
            {cl.plataform}
          </Link>
        </li>
      ))}
    </ul>
  );
}

describe("Links Context", () => {
  it("Renderiza o Links Context Provider", () => {
    render(<LinksContextProvider>Teste Conteudo</LinksContextProvider>);
    expect(screen.getByText("Teste Conteudo")).toBeInTheDocument();
  });

  it("useLinkContext retorna os links customizados com dados do LocalStorage", () => {
    render(
      <LinksContextProvider>
        <TestComponent />
      </LinksContextProvider>,
    );
    mockCustomizeLinks.forEach((value) => {
      expect(screen.getByText(value.plataform)).toBeInTheDocument();
    });
  });
});
