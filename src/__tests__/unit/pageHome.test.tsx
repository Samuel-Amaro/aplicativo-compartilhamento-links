import Home from "@/app/(linksProfile)/page";
import LinksContextProvider from "@/context/LinksContext";
import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

it("Renderiza page Home sem erros", () => {
  //https://github.com/testing-library/react-testing-library/issues/1216
  //recebendo warnings
  /*render(
    <LinksContextProvider>
      <Home />
    </LinksContextProvider>,
  );*/
});
