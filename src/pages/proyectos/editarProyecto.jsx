import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROYECTO } from "graphql/proyectos/queries";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { toast } from "react-toastify";
import { EDITAR_PROYECTO } from "graphql/proyectos/mutations";
import DropDown from "components/Dropdown";
import { Enum_EstadoProyecto, Enum_FaseProyecto } from "utils/enums";
import PrivateComponent from "components/PrivateComponent";
import Input from "components/Input";

const EditarProyecto = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { _id },
  });

  console.log(queryData);

  const [
    editarProyecto,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("fd", formData);
    formData.presupuesto = parseFloat(formData.presupuesto);
    editarProyecto({
      variables: {
        _id,
        campos: formData,
      },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Proyecto modificado correctamente");
      window.location.href = "/proyectos";
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error modificando el proyecto");
    }

    if (queryError) {
      toast.error("Error consultando el proyecto");
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className="flex flex-col w-full h-full items-center">
      <Link to="/proyectos">
        <i className="fas fa-arrow-left mr-96 mt-7 text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
      </Link>
      <h1 className="m-4 text-2xl font-bold text-center">Editar Proyecto</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className="flex flex-col items-right justify-center"
      >
        <PrivateComponent roleList={"ADMINISTRADOR"}>
          <label htmlFor="nombre" className="flex flex-col my-3">
            <span className="font-bold">Nombre del proyecto:</span>
            <input
              type="text"
              name="nombre"
              defaultValue={queryData.Proyecto.nombre}
              disabled
            />
          </label>
        </PrivateComponent>
        <PrivateComponent roleList={"LIDER"}>
          <Input
            label="Nombre del proyecto:"
            type="text"
            name="nombre"
            defaultValue={queryData.Proyecto.nombre}
            required={true}
          />
        </PrivateComponent>
        <PrivateComponent roleList={"ADMINISTRADOR"}>
          <label htmlFor="presupuesto" className="flex flex-col my-3">
            <span className="font-bold">Presupuesto:</span>
            <input
              type="text"
              name="presupuesto"
              defaultValue={queryData.Proyecto.presupuesto}
              disabled
            />
          </label>
        </PrivateComponent>
        <PrivateComponent roleList={"LIDER"}>
          <Input
            label="Presupuesto del proyecto:"
            type="text"
            name="presupuesto"
            defaultValue={queryData.Proyecto.presupuesto}
            required={true}
          />
        </PrivateComponent>
        <label htmlFor="Fecha de inicio" className="flex flex-col my-3">
          <span className="font-bold">Fecha de inicio:</span>
          <input
            type="text"
            name="fechaInicio"
            defaultValue={queryData.Proyecto.fechaInicio.slice(0,-14)}
            disabled
          />
        </label>
        <label htmlFor="Fecha de fin" className="flex flex-col my-3">
          <span className="font-bold">Fecha de finalización:</span>
          <input
            type="text"
            name="fechaFin"
            defaultValue={queryData.Proyecto.fechaFin.slice(0,-14)}
            disabled
          />
        </label>
        <PrivateComponent roleList={"ADMINISTRADOR"}>
          <DropDown
            label="Estado del proyecto:"
            name="estado"
            defaultValue={queryData.Proyecto.estado}
            required={true}
            options={Enum_EstadoProyecto}
          />
          <DropDown
            label="Fase del proyecto:"
            name="fase"
            defaultValue={queryData.Proyecto.fase}
            required={true}
            options={Enum_FaseProyecto}
          />
        </PrivateComponent>
        <PrivateComponent roleList={"LIDER"}>
          <label htmlFor="Estado" className="flex flex-col my-3">
            <span className="font-bold">Estado del proyecto:</span>
            <input
              type="text"
              name="estado"
              defaultValue={queryData.Proyecto.estado}
              disabled
            />
          </label>
          <label htmlFor="Fase" className="flex flex-col my-3">
            <span className="font-bold">Fase del proyecto:</span>
            <input
              type="text"
              name="fase"
              defaultValue={queryData.Proyecto.fase}
              disabled
            />
          </label>
        </PrivateComponent>
        <div className="flex">
          <div className="mr-10">
            <ButtonLoading
              disabled={Object.keys(formData).length === 0}
              loading={mutationLoading}
              text="Confirmar"
            />
          </div>
          <Link to="/proyectos">
            <ButtonLoading
              disabled={Object.keys(formData).length === 0}
              loading={mutationLoading}
              text="Cancelar"
            />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditarProyecto;
