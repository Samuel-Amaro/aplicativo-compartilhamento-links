import "@testing-library/jest-dom";
import { render, screen} from "@testing-library/react";
import Empty from ".";

it("Renderiza componente Empty sem erros", () => {
  render(<Empty />);
  expect(screen.getByText("Vamos começar")).toBeInTheDocument;
});
