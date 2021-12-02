import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROYECTO } from "graphql/proyectos/queries";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { toast } from "react-toastify";
import { EDITAR_PROYECTO } from "graphql/proyectos/mutations";

const VerProyecto = () => {
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
    delete formData.rol;
    editarProyecto({
      variables: { _id, ...formData },
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
      <h1 className="m-4 text-2xl font-bold text-center">Detalle del Proyecto</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className="flex flex-col items-right justify-center"
      >
        <label htmlFor="nombre" className="flex flex-col my-3">
          <span className="font-bold">Nombre del proyecto:</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.Proyecto.nombre}
            disabled
          />
        </label>
        <label htmlFor="presupuesto" className="flex flex-col my-3">
          <span className="font-bold">Presupuesto:</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.Proyecto.presupuesto}
            disabled
          />
        </label>
        <label htmlFor="Fecha de inicio" className="flex flex-col my-3">
          <span className="font-bold">Fecha de inicio:</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.Proyecto.fechaInicio}
            disabled
          />
        </label>
        <label htmlFor="Fecha de fin" className="flex flex-col my-3">
          <span className="font-bold">Fecha de finalización:</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.Proyecto.fechaFin}
            disabled
          />
        </label>
        <label htmlFor="Estado" className="flex flex-col my-3">
          <span className="font-bold">Estado del proyecto:</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.Proyecto.estado}
            disabled
          />
        </label>
        <label htmlFor="Fase" className="flex flex-col my-3">
          <span className="font-bold">Fase del proyecto:</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.Proyecto.fase}
            disabled
          />
        </label>
        <div className="flex">
          <Link to="/proyectos">
            <ButtonLoading
              loading={mutationLoading}
              text="Regresar"
            />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default VerProyecto;
