import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Notification from ".";
import Save from "../Icons/Save";
import React from "react";
import { act } from "react-dom/test-utils";

const mockSetShowNotification: jest.Mock<(show: string) => void> = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  jest.clearAllTimers();
});

describe("Componente ShowNotification", () => {
  it("renderiza o componente ShowNotification sem erros", () => {
    render(
      <Notification
        message="Mensagem de teste de notificação"
        icon={<Save />}
        showNotification={true}
        setShowNotification={mockSetShowNotification}
      />,
    );
    expect(
      screen.getByText("Mensagem de teste de notificação"),
    ).toBeInTheDocument();
  });

  it("Renderiza a notificação corretamente quando showNotification é true", () => {
    render(
      <Notification
        message="Mensagem de teste de notificação"
        icon={<div>Icone de teste</div>}
        showNotification={true}
        setShowNotification={mockSetShowNotification}
      />,
    );
    expect(
      screen.getByText("Mensagem de teste de notificação"),
    ).toBeInTheDocument();
    expect(screen.getByText("Icone de teste")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("Não renderiza a notificação quando showNotification é false", () => {
    render(
      <Notification
        message="Mensagem de teste de notificação"
        icon={<div>Icone de teste</div>}
        showNotification={false}
        setShowNotification={mockSetShowNotification}
      />,
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("Remove a notificação após 5 segundos", async () => {
    render(
      <Notification
        message="Mensagem de teste de notificação"
        icon={<div>Icone de teste</div>}
        showNotification={true}
        setShowNotification={mockSetShowNotification}
      />,
    );
    jest.advanceTimersByTime(5000);
    //https://github.com/testing-library/react-testing-library/issues/1208
    //!REACT TESTING LIBRARY NÃO FUNCIONA COM FAKE TIMERS DO JEST
    //await waitForElementToBeRemoved(() => screen.queryByRole("alert"));
    //expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(mockSetShowNotification).toHaveBeenCalledWith(false);
  });
});
