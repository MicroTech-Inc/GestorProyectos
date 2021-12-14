import { GET_AVANCE } from 'graphql/avances/queries';
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { EDITAR_AVANCE } from 'graphql/avances/mutation';
import ButtonLoading from 'components/ButtonLoading';
import PrivateComponent from 'components/PrivateComponent';
import useFormData from 'hooks/useFormData';
import { toast } from "react-toastify";
import Input from "components/Input";
import Index from 'pages/Index';
import { useUser } from "context/userContext";

const AvanceEditar = () => {
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
    const [avance, setAvance] = useState({ codigo: null, fecha: new Date(), descripcion: '', observaciones: [] })
    const [observacion, setObservacion] = useState({ open: false, text: '' })
    const {
        data: queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_AVANCE, {
        variables: { _id },
    });

    console.log(queryData);

    const [
        editarAvance,
        { data: mutationData, loading: mutationLoading, error: mutationError },
    ] = useMutation(EDITAR_AVANCE);

    useEffect(() => {
        if (
            mutationData
        ) {
            toast.success("Avance modificado correctamente");
            window.location.href = "/avances";
        }
    }, [
        mutationData,
    ]);

    useEffect(() => {
        if (
            mutationError
        ) {
            toast.error("Error modificando el avance");
        }
        if (queryError) {
            toast.error("Error consultando el avance");
        }
    }, [
        queryError,
        mutationError
    ]);
    if (queryLoading) return <div>Cargando....</div>;

    const submitForm = (e) => {
        e.preventDefault();
        console.log("fd", formData);
        editarAvance({ variables: { _id, campos: formData, }, });
    };


    const handlerChange = (e) => {
        setAvance({ ...avance, [e.target.name]: e.target.value })
    }

    const handlerObservacion = (e) => {
        setObservacion({ ...observacion, text: e.target.value })
    }

    //************************************************************************************************************************************* */
    return (
        <div className="flex flex-col w-full h-full items-center">
            <Link to="/avances">
                <i className="fas fa-arrow-left mr-96 mt-7 text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
            </Link>
            <h1 className="m-4 text-2xl font-bold text-center">Editar Avance</h1>
            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
                className="flex flex-col items-right justify-center"
            >
                <label htmlFor="nombre" className="flex flex-col my-3">
                    <span className="font-bold">Id Avance</span>
                    <Input
                        type="text"
                        name="id"
                        defaultValue={queryData.detalleAvance._id}
                        disabled={true}
                    />
                </label>
                <PrivateComponent roleList='LIDER'>
                    <Input
                        label="Fecha Avance"
                        type="text"
                        name="fecha"
                        defaultValue={queryData.detalleAvance.fecha.slice(0, -14)}
                        required={true}
                        disabled={true}
                    />
                    <Input
                        label="Descripcion"
                        type="text"
                        name="descripcion"
                        defaultValue={queryData.detalleAvance.descripcion}
                        required={true}
                        disabled={true}
                    />
                </PrivateComponent>
                <PrivateComponent roleList={'ESTUDIANTE'}>
                    <Input
                        label="Fecha Avance"
                        type="text"
                        name="fecha"
                        defaultValue={queryData.detalleAvance.fecha.slice(0, -14)}
                        required={true}
                    />
                    <Input
                        label="Descripcion"
                        type="text"
                        name="descripcion"
                        defaultValue={queryData.detalleAvance.descripcion}
                        required={true}
                    />
                </PrivateComponent>
                <PrivateComponent roleList={'LIDER'}>
                    <div className="flex flex-col pb-5">
                        <div>
                            <span className="font-bold">Observaciones del Avance</span>
                            {!observacion.open && <i onClick={() => setObservacion({ open: true, text: '' })} className="fas fa-plus pl-5 cursor-pointer"></i>}
                        </div>
                        {observacion.open && <div>
                            <input onChange={handlerObservacion} value={observacion.text} className="w-2/5 ml-4 bg-gray-300" type="text" id="descripcion" name="descripcion" />
                            <i onClick={() => { setAvance({ ...avance, observaciones: [...avance.observaciones, observacion.text] }); setObservacion({ open: false, text: '' }) }} className="fas fa-check pl-5"></i>
                            <i onClick={() => { setObservacion({ open: false, text: '' }) }} className="fas fa-ban pl-5"></i>
                        </div>}
                        <ul className="list-disc pl-8">
                            {avance.observaciones.map((obs, index) =>
                                <div className='flex items-center'>
                                    <li>{obs}</li>
                                    <i onClick={() => { setAvance({ ...avance, observaciones: avance.observaciones.filter((item, i) => i !== index) }) }} className="fas fa-trash pl-5"></i>
                                </div>
                            )}
                        </ul>
                    </div>
                </PrivateComponent>
                <div className="flex">
                    <div className="flex">
                        <button disabled={Object.keys(formData).length === 0} onClick={submitForm} className='sidebar-col text-white font-bold text-lg py-1 px-5  rounded-xl hover:bg-indigo-200 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700'>Confirmar</button>
                    </div>
                    <div className='mx-5'>
                        <Link to="/avances">
                            <ButtonLoading
                                disabled={Object.keys(formData).length === 0}
                                loading={mutationLoading}
                                text="Cancelar"
                            />
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default AvanceEditar;


/*
       <div className='flex flex-col justify-center align-middle mt-28 ml-14'>
           <h2 className='text-2xl font-bold mb-6'>Edición del Avance</h2>
           <div className="flex flex-col pb-5">
               <label for="fecha">Fecha del avance</label>
               <input onChange={handlerChange} value={avance.fecha} className="w-2/5 ml-4 bg-gray-300" type="date" id="fecha" name="fecha" />
           </div>
           <div className="flex flex-col pb-5">
               <label for="descripcion">Descripcion del Avance</label>
               <input onChange={handlerChange} value={avance.descripcion} className="w-2/5 ml-4 bg-gray-300" type="text" id="descripcion" name="descripcion" />
           </div>
           <div className="flex flex-col pb-5">
               <div>
                   <label for="observaciones">Observaciones del Avance</label>
                   {!observacion.open && <i onClick={() => setObservacion({ open: true, text: '' })} className="fas fa-plus pl-5"></i>}
               </div>
               {observacion.open && <div>
                   <input onChange={handlerObservacion} value={observacion.text} className="w-2/5 ml-4 bg-gray-300" type="text" id="descripcion" name="descripcion" />
                   <i onClick={() => { setAvance({ ...avance, observaciones: [...avance.observaciones, observacion.text] }); setObservacion({ open: false, text: '' }) }} className="fas fa-check pl-5"></i>
                   <i onClick={() => { setObservacion({ open: false, text: '' }) }} className="fas fa-ban pl-5"></i>
               </div>}
               <ul className="list-disc pl-8">
                   {avance.observaciones.map((obs, index) => <li><div className="flex">{obs.edit ? <input className="w-2/5 ml-4 bg-gray-300" value={obs.text} onChange={(e) => { setAvance({ ...avance, observaciones: avance.observaciones.map((ob, i) => { if (index === i) { return { ...ob, text: e.target.value } }; return ob }) }) }} /> : obs.text}
                       {!obs.edit ? <div  >
                           <i onClick={(e) => { setAvance({ ...avance, observaciones: avance.observaciones.map((ob, i) => { if (index === i) { return { ...ob, edit: true } }; return ob }) }) }} className="fas fa-pen pl-5"></i>
                           <i onClick={() => { }} className="fas fa-trash-alt pl-5"></i>
                       </div> :
                           <div>
                               <i onClick={(e) => { setAvance({ ...avance, observaciones: avance.observaciones.map((ob, i) => { if (index === i) { return { ...ob, edit: false } }; return ob }) }) }} className="fas fa-check pl-5"></i>
                               <i onClick={() => { setAvance({ ...avance, observaciones: avance.observaciones.map((ob, i) => { if (index === i) { return { ...ob, edit: false } }; return ob }) }) }} className="fas fa-ban pl-5"></i>
                           </div>}
                   </div></li>)
                   }
               </ul>

           </div>
           <div className="flex">
               <Link style={{ backgroundColor: "#2C5697" }} className=" w-24 text-center text-white rounded ml-24 p-1" to={'/avances'}>GUARDAR</Link>
               <Link style={{ backgroundColor: "#2C5697" }} className=" w-24 text-center text-white rounded ml-24 p-1" to={'/avances'}>CANCELAR</Link>
           </div>
       </div >*/


/*  const { _id } = useParams();
  const { data, error, loading } = useQuery(GET_AVANCE, {
      variables: { _id },
  });
  const [avance, setAvance] = useState({ codigo: null, fecha: new Date(), descripcion: '', observaciones: [] })
  const [observacion, setObservacion] = useState({ open: false, text: '' })

  useEffect(() => {
      const obj = data1.observaciones.map((obs) => ({ edit: false, text: obs }))
      setAvance({ codigo: data1._id, fecha: new Date(data1.fecha).toISOString().split('T')[0], descripcion: data1.descripcion, observaciones: obj })
  }, [])

  const handlerChange = (e) => {
      setAvance({ ...avance, [e.target.id]: e.target.value })
  }
  const handlerObservacion = (e) => {
      setObservacion({ ...observacion, text: e.target.value })
  }*/



/*  <label htmlFor="presupuesto" className="flex flex-col my-3">
                  <span className="font-bold">Descripcion</span>
                  <input
                      type="text"
                      name="descripcion"
                      defaultValue={queryData.detalleAvance.descripcion}
                      disabled
                  />
              </label>*/


/* <form
  onSubmit={submitForm}
  onChange={updateFormData}
  ref={form}
  className="flex flex-col items-right justify-center"
>*/