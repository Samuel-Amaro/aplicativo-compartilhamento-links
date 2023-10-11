import ProfileContextProvider, {
  useProfileContext,
} from "@/context/ProfileContext";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

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

beforeEach(() => {
  Object.defineProperty(window, "localStorage", { value: mockLocalStorage });
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
});

afterEach(() => {
  mockLocalStorage.clear();
});

// Create a test component that uses useProfileContext
function TestComponent() {
  const profileContext = useProfileContext();
  return (
    <div>
      <span>{profileContext.profileDetails.firstName}</span>
    </div>
  );
}

describe("Profile Context", () => {
  it("renderiza ProfileContextProvider com dados de LocalStorage", () => {
    render(<ProfileContextProvider>Conteudo Teste</ProfileContextProvider>);
    expect(screen.getByText("Conteudo Teste")).toBeInTheDocument();
  });
  it("useProfileContext retorna profile context", () => {
    render(
      <ProfileContextProvider>
        <TestComponent />
      </ProfileContextProvider>,
    );
    expect(screen.getByText("Teste")).toBeInTheDocument();
  });
});
