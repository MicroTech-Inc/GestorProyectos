import { GET_AVANCE } from 'graphql/avances/queries';
import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

export default function AvancesDetalles() {
    const { _id } = useParams();
    const { data, error, loading } = useQuery(GET_AVANCE, {
        variables: { _id },
    });
    const [avance, setAvance] = useState({ codigo: null, fecha: new Date(), descripcion: '', observaciones: [] })
    const [observacion, setObservacion] = useState({ open: false, text: '' })

    const handlerChange = (e) => {
        setAvance({ ...avance, [e.target.id]: e.target.value })
    }
    const handlerObservacion = (e) => {
        setObservacion({ ...observacion, text: e.target.value })
    }
    return (
        <div className='flex flex-col justify-center align-middle mt-28 ml-14'>
            <h2 className='text-2xl font-bold mb-6'>Registro Del Avance</h2>

            <div className="flex flex-col pb-5">
                <label for="projectId">Código del proyecto</label>
                <input onChange={handlerChange} value={avance.codigo} className="w-2/5 ml-4 bg-gray-300" type="text" id="codigo" name="projectId" />
            </div>
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
                    {avance.observaciones.map((obs) => <li>{obs}</li>)}
                </ul>

            </div>
            <div className="flex">
                <Link style={{ backgroundColor: "#2C5697" }} className=" w-24 text-center text-white rounded ml-24 p-1" to={'/avances'}>GUARDAR</Link>
                <Link style={{ backgroundColor: "#2C5697" }} className=" w-24 text-center text-white rounded ml-24 p-1" to={'/avances'}>CANCELAR</Link>
            </div>
        </div >
    )
}