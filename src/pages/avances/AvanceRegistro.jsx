import { CREAR_AVANCE } from 'graphql/avances/mutation';
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import useFormData from 'hooks/useFormData';
import { useUser } from 'context/userContext';
import { toast } from 'react-toastify';
import ButtonLoading from 'components/ButtonLoading';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import Index from 'pages/Index';
import Input from 'components/Input';

const CrearAvance = () => {
    const { form, formData, updateFormData } = useFormData(null);
    const { userData } = useUser();
    const _id = userData._id;
    const [avance, setAvance] = useState({ codigo: null, fecha: new Date(), descripcion: '', observaciones: [] })
    const [observacion, setObservacion] = useState({ open: false, text: '' })
    const [
        crearAvance,
        { data: mutationData, loading: mutationLoading, error: mutationError },
    ] = useMutation(CREAR_AVANCE);
    const { data, error, loading } = useQuery(GET_INSCRIPCIONES);
    useEffect(() => {
        console.log("Data Mutation", mutationData);
    });

    const submitForm = (e) => {
        e.preventDefault();
        crearAvance({
            variables: {
                fecha: avance.fecha,
                descripcion: avance.descripcion,
                proyecto: "61b7d45d63dcb1521c660011",
                creadoPor: _id,
                observaciones: avance.observaciones
            },
        });
    };
    useEffect(() => {
        console.log("DATA DE PROYECTOS: ", data);
    }, [data]);

    useEffect(() => {
        if (mutationData) {
            toast.success("Avance registrado con exito");
            window.location.href = "/avances";
        }
    }, [mutationData]);
    useEffect(() => {
        if (mutationError) {
            toast.error("Error registrando el avance");
        }
    }, [mutationError]);
    if (mutationLoading) {
        return <div>Cargando...</div>
    }
    const handlerChange = (e) => {
        setAvance({ ...avance, [e.target.name]: e.target.value })
    }
    const handlerObservacion = (e) => {
        setObservacion({ ...observacion, text: e.target.value })
    }
    return (
        <div className='flex flex-col justify-center align-middle mt-28 ml-14'>
            <h2 className='text-2xl font-bold mb-6'>Registro Del Avance</h2>
            <div className="flex flex-col pb-5">
                <label for="projectId" className='font-bold'>Nombre del Proyecto</label>
                <select className="w-2/5 ml-4 bg-gray-300">
                    {data &&
                        data.InscripcionesVerProyectos.map(pr => {
                            return <>
                                <option selected="true" disabled="true">Seleccione un proyecto</option>
                                <option>{pr.proyecto.nombre}</option>
                            </>
                        })
                    }
                </select>
            </div>
            <div className="flex flex-col pb-5">
                <label for="fecha" className='font-bold'>Fecha del avance</label>
                <input onChange={handlerChange}
                    label="Fecha Avance"
                    type="text"
                    name="fecha"
                    required={true}
                    className="w-2/5 ml-4 bg-gray-300" type="date" id="fecha" name="fecha" />
            </div>
            <div className="flex flex-col pb-5">
                <label for="descripcion" className='font-bold'>Descripcion del Avance</label>
                <input onChange={handlerChange}
                    label="Descripcion"
                    type="text"
                    name="descripcion"
                    className="w-2/5 ml-4 bg-gray-300" type="text" id="descripcion" name="descripcion" />
            </div>
            <div className='flex'>
                <div className='mx-4'>
                    <button onClick={submitForm} className='sidebar-col text-white font-bold text-lg py-1 px-5  rounded-xl hover:bg-indigo-200 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700'>Confirmar</button>
                </div>
                <div className='mx-5'>
                    <Link to={'/avances'}>
                        <button
                            disabled={false}
                            type="button"
                            className='sidebar-col text-white font-bold text-lg py-1 px-5  rounded-xl hover:bg-indigo-200 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700'
                        >Cancelar</button>
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default CrearAvance;

/*   <ButtonLoading
                        loading={false}
                        text="Crear"
                        disabled={false}
                    />*/