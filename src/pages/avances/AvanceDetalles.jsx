import { GET_AVANCE } from 'graphql/avances/queries';
import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

export default function AvancesDetalles() {
    const { _id } = useParams();
    const { data, error, loading } = useQuery(GET_AVANCE, {
        variables: { _id },
    });
    const data1 = [{
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
    }]

    return (
        <div className='flex flex-col justify-center align-middle mt-28 ml-14'>
            <h2 className='text-2xl font-bold mb-6'>Detalle del Avance</h2>

            <div className="flex flex-col pb-5">
                <label for="id">Código del avance</label>
                <input value={data1[0]._id} className="w-2/5 ml-4 bg-gray-300" type="text" id="id" name="id" />
            </div>
            <div className="flex flex-col pb-5">
                <label for="projectId">Código del proyecto</label>
                <input value={data1[0].project.id} className="w-2/5 ml-4 bg-gray-300" type="text" id="projectId" name="projectId" />
            </div>
            <div className="flex flex-col pb-5">
                <label for="fecha">Fecha del avance</label>
                <input value={new Date(data1[0].fecha).toISOString().split('T')[0]} className="w-2/5 ml-4 bg-gray-300" type="date" id="fecha" name="fecha" />
            </div>
            <div className="flex flex-col pb-5">
                <label for="descripcion">Descripcion del Avance</label>
                <input value={data1[0].descripcion} className="w-2/5 ml-4 bg-gray-300" type="text" id="descripcion" name="descripcion" />
            </div>
            <div className="flex flex-col pb-5">
                <label for="observaciones">Observaciones del Avance</label>
                <ul className="list-disc pl-8">
                    {data1[0].observaciones.map((obs) => <li>{obs}</li>)}
                </ul>
            </div>

            <Link style={{ backgroundColor: "#2C5697" }} className=" w-24 text-center text-white rounded ml-24 p-1" to={'/avances'}>REGRESAR</Link>
        </div >
    )
}