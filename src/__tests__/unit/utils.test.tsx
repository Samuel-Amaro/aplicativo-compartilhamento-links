import {
  isValidDimensionsImage,
  patternsUrlsPlatforms,
  validFileType,
} from "@/utils/utils";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import iconProfile from "../../../public/images/icon-profile.png";
import { CustomizeLink } from "@/types/datas";

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

/*afterEach(() => {
  mockLocalStorage.clear();
  mockCustomizeLinks = [];
  mockDataProfile = {
    dataUrlPicture: "",
    firstName: "",
    lastName: "",
    email: "",
  };
});
*/

describe("Utilitarios", () => {
  it("Testa se as dimensões de um arquivo são validas", async () => {
    window.URL.createObjectURL = jest.fn();
    const file = new File(["profile"], "profile.png", {
      type: "image/png",
    });
    Object.defineProperty(file, "width", { value: 1024 });
    Object.defineProperty(file, "height", { value: 1024 });
    expect(isValidDimensionsImage(file)).resolves.toBe(true);
  });

  it("Testa dimensões invalidas de um arquivo", async () => {
    window.URL.createObjectURL = jest.fn();
    const file = new File(["profile"], "profile.png", {
      type: "image/png",
    });
    Object.defineProperty(file, "width", { value: 2048 });
    Object.defineProperty(file, "height", { value: 1536 });
    expect(isValidDimensionsImage(file)).resolves.toBe(true);
  });

  it("Testa se um arquivo tem um tipo valido", () => {
    const file = new File(["profile"], "profile.png", {
      type: "image/png",
    });
    expect(validFileType(file)).toBe(true);
  });

  it("Testa se um arquivo tem um tipo invalido", () => {
    const file = new File(["profile"], "profile.png", {
      type: "image/xsj",
    });
    expect(validFileType(file)).toBe(false);
  });

  it("Test LocalStorage setItem", () => {
    mockDataProfile = {
      firstName: "Teste",
      lastName: "Sobre Nome",
      email: "teste@email.com",
      dataUrlPicture: `data:image/png;base64,${toBase64(iconProfile.src)}`,
    };
    mockLocalStorage.setItem("profile", JSON.stringify(mockDataProfile));
    expect(
      JSON.parse(mockLocalStorage.localStorage.profile) as {
        dataUrlPicture?: string;
        firstName: string;
        lastName: string;
        email?: string;
      },
    ).toStrictEqual(mockDataProfile);
  });

  it("Test LocalStorage getItem", () => {
    expect(
      JSON.parse(mockLocalStorage.getItem("profile") as string) as {
        dataUrlPicture?: string;
        firstName: string;
        lastName: string;
        email?: string;
      },
    ).toStrictEqual(mockDataProfile);
  });
});
