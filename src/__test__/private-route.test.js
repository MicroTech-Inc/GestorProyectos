import React from "react";
import PrivateRoute from "components/PrivateRoute";
import { render, screen, cleanup } from "@testing-library/react";
import { UserContext } from "context/userContext";

afterEach(cleanup);

it("renderizar no autorizado si los roles no coinciden", () => {
  render(
    <UserContext.Provider value={{ userData: { rol: "LIDER" } }}>
      <PrivateRoute roleList={"ADMINISTRADOR"}>
        <div>Este es el children</div>
      </PrivateRoute>
    </UserContext.Provider>
  );
  expect(screen.getByTestId("No-Autorizado")).toHaveTextContent(
    "No estás autorizado para ver este sitio."
  );
});

it("renderiza los children si el rol del usuario esta en la lista de roles (roleList)", () => {
    render(
      <UserContext.Provider value={{ userData: { rol: "ADMINISTRADOR" } }}>
        <PrivateRoute roleList={"ADMINISTRADOR"}>
          <div data-testid="Children">Este es el children</div>
        </PrivateRoute>
      </UserContext.Provider>
    );
    expect(screen.getByTestId("Children")).toBeInTheDocument();
  });
