import React from "react";
import { GET_PROYECTOS } from "graphql/proyectos/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Enum_EstadoProyecto, Enum_FaseProyecto } from "utils/enums";
import { Link } from "react-router-dom";
import PrivateComponent from "components/PrivateComponent";

const IndexProyectos = () => {
  const { data, error, loading } = useQuery(GET_PROYECTOS);

  useEffect(() => {
    console.log("data servidor", data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error consultando los proyectos");
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <div className="mt-28 ml-14 mr-14">
      <h2 className="text-2xl font-bold">Listado de Proyectos</h2>
      <div className="mb-6">
        <div className="flex flex-row justify-end space-x-2">
          <input
            placeholder="Buscar"
            className="border-2 border-gray-700 px-3 py-1 mr-2 rounded-md focus:outline-none focus:border-indigo-200"
          />
          <PrivateComponent roleList={"LIDER"}>
            <div className="sidebar-col text-white border-gray-700 px-2 py-1 rounded-md">
              <Link to={"/proyectos/crear"}>
                <i class="fas fa-folder-plus text-white hover:text-blue-400 cursor-pointer"></i>
              </Link>
            </div>
          </PrivateComponent>
        </div>
      </div>
      <table className="tabla">
        <thead>
          <tr>
            <th className="rounded-tl-xl">Nombre</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Presupuesto</th>
            <th>Estado</th>
            <th>Fase</th>
            <th class="rounded-tr-xl"></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Proyectos.map((u) => {
              return (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.fechaInicio!=null? u.fechaInicio.slice(0,-14): u.fechaInicio}</td>
                  <td>{u.fechaFin!=null? u.fechaFin.slice(0,-14): u.fechaFin}</td>
                  <td>{u.presupuesto}</td>
                  <td>{Enum_EstadoProyecto[u.estado]}</td>
                  <td>{Enum_FaseProyecto[u.fase]}</td>
                  <td>
                    <Link to={`/proyectos/ver/${u._id}`}>
                      <i class="far fa-eye text-blue-900 hover:text-blue-400 cursor-pointer"></i>
                    </Link>
                    <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
                      <Link to={`/proyectos/editar/${u._id}`}>
                        <i className="fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer pl-4" />
                      </Link>
                    </PrivateComponent>
                    <PrivateComponent roleList={"ESTUDIANTE"}>
                      <Link to={u._id}>
                        <i className="fas fa-user-plus text-blue-900 hover:text-blue-400 cursor-pointer pl-4"></i>
                      </Link>
                    </PrivateComponent>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default IndexProyectos;
