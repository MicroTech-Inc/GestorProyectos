import React from "react";
import PrivateComponent from "components/PrivateComponent";
import { render, screen, cleanup } from "@testing-library/react";
import { UserContext } from "context/userContext";

afterEach(cleanup);

it("renderiza los children del componente privado si el rol del usuario esta en la lista de roles (roleList)", () => {
  render(
    <UserContext.Provider value={{ userData: { rol: "ADMINISTRADOR" } }}>
      <PrivateComponent roleList={"ADMINISTRADOR"}>
        <div data-testid="Children-Component">Este es el children</div>
      </PrivateComponent>
    </UserContext.Provider>
  );
  expect(screen.getByTestId("Children-Component")).toBeInTheDocument();
});
