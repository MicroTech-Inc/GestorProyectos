import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Input from "components/Input";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { toast } from "react-toastify";
import { EDITAR_USUARIO } from "graphql/usuarios/mutations";
import DropDown from "components/Dropdown";
import { Enum_TipoObjetivo } from "utils/enums";
import { nanoid } from "nanoid";
import { ObjContext } from "context/objContext";
import { useObj } from "context/objContext";

const CrearProyecto = () => {
  const { form, formData, updateFormData } = useFormData(null);

  // const [
  //   editarUsuario,
  //   { data: mutationData, loading: mutationLoading, error: mutationError },
  // ] = useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();

    formData.objetivos = Object.values(formData.objetivos);
    formData.presupuesto = parseFloat(formData.presupuesto);
    
    console.log("fd", formData);

  };

  // useEffect(() => {
  //   if (mutationData) {
  //     toast.success("Usuario modificado correctamente");
  //     window.location.href = "/proyectos";
  //   }
  // }, [mutationData]);

  // useEffect(() => {
  //   if (mutationError) {
  //     toast.error("Error creando el proyecto");
  //   }

  // }, [mutationError]);

  // if (mutationLoading) return <div>Cargando....</div>;

  return (
    <div className="flex flex-col w-full h-full items-center">
      <Link to="/proyectos">
        <i className="fas fa-arrow-left mr-96 mt-7 text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
      </Link>
      <h1 className="m-4 text-2xl font-bold text-center">Crear Proyecto</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className="flex flex-col items-right justify-center"
      >
        <Input
          label="Nombre del proyecto:"
          type="text"
          name="nombre"
          required={true}
        />
        <Input
          label="Presupuesto:"
          type="text"
          name="Presupuesto"
          required={true}
        />
        <Objetivos />
        <div className="flex">
          <div className="mr-10">
            <ButtonLoading
              // disabled={Object.keys(formData).length === 0}
              loading={false}
              text="Crear"
              disabled={false}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const Objetivos = () => {
  const [listaObjetivos, setListaObjetivos] = useState([]);

  const eliminarObjetivo = (id) => {
    setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
  };

  const componenteObjetivoAgregado = () => {
    const id = nanoid();
    return <FormObjetivo key={id} id={id} />;
  };

  return (
    <ObjContext.Provider value={{eliminarObjetivo}}>
      <div>
        <span>Objetivos del proyecto</span>
        <i
          onClick={() =>
            setListaObjetivos([...listaObjetivos, componenteObjetivoAgregado()])
          }
          className="fas fa-plus rounded-full bg-indigo-500 hover:bg-indigo-400 text-white p-2 mx-2 cursor-pointer"
        />
        {listaObjetivos.map((objetivo) => {
          return objetivo;
        })}
      </div>
    </ObjContext.Provider>
  );
};

const FormObjetivo = ({ id }) => {
  const { eliminarObjetivo } = useObj();

  return (
    <div className="flex items-center">
      <Input
        name={`nested||objetivo||${id}||descripcion`}
        label="Descripción"
        type="text"
        required={true}
      />
      <DropDown
        name={`nested||objetivo||${id}||tipo`}
        options={Enum_TipoObjetivo}
        label="Tipo de objetivo"
        required={true}
      />
      <i
        onClick={() => eliminarObjetivo(id)}
        className="fas fa-minus mt-6 bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-400"
      />
    </div>
  );
};

export default CrearProyecto;
