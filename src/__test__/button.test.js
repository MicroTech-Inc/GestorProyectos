import React from "react";
import ButtonLoading from "components/ButtonLoading";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);

it("renderiza bien", () => {
  render(<ButtonLoading text="Boton" loading={false} disabled={false} />);
  expect(screen.getByTestId("Button-Loading")).toBeInTheDocument();
});

it("Mostrar texto cuando cuando no está cargando", () => {
  render(<ButtonLoading text="Boton" loading={false} disabled={false} />);
  expect(screen.getByTestId("Button-Loading")).toHaveTextContent("Boton");
});

it("No mostrar texto cuando cuando está cargando", () => {
  render(<ButtonLoading text="Boton" loading={true} disabled={false} />);
  expect(screen.getByTestId("Button-Loading")).not.toHaveTextContent("Boton");
});

it("Mostrar el componente cargando cuando está cargando", () => {
  render(<ButtonLoading text="Boton" loading={true} disabled={false} />);
  expect(screen.getByTestId("Loading-in-Button")).toBeInTheDocument();
});

it("Esta deshabilitado cuando se pasa como propiedad (prop)", () => {
  render(<ButtonLoading text="Boton" loading={true} disabled={true} />);
  expect(screen.getByTestId("Button-Loading")).toHaveAttribute("disabled");
});

it("Esta habilitado cuando la propiedad deshabilitada se pasa como falsa", () => {
  render(<ButtonLoading text="Boton" loading={true} disabled={false} />);
  expect(screen.getByTestId("Button-Loading")).not.toHaveAttribute("disabled");
});
