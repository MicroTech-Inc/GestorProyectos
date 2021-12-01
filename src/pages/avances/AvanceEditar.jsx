import { GET_AVANCE } from 'graphql/avances/queries';
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

const data1 = {
    "_id": "619ce9abb2211d9ebd2339de",
    "fecha": "2021-11-22T00:00:00.000Z",
    "descripcion": "Este es el avance del proyecto",
    "project": {
        "id": "45454"
    },
    "observaciones": [
        "Esta es la observación 1 del avance",
        "Esta es la observación 2 del avance",
        "Esta es la observación 3 del avance",
        "Esta es la observación 4 del avance"
    ],
    "__typename": "Avance"
}

export default function AvancesDetalles() {
    const { _id } = useParams();
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
    }
    return (
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
        </div >
    )
}