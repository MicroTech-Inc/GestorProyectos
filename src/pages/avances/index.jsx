import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AVANCES } from 'graphql/avances/queries';
import { Link } from 'react-router-dom';

const IndexAvances = () => {
  const { data, error, loading } = useQuery(GET_AVANCES);
  const data1 = [{
    "_id": "619ce9abb2211d9ebd2339de",
    "fecha": "2021-11-22T00:00:00.000Z",
    "descripcion": "Este es el avance del proyecto",
    "project": {
      "id": "45454"
    },
    "observaciones": [
      "Esta es la observación del avance"
    ],
    "__typename": "Avance"
  }]

  const handlerDetails = () => {

  }
  return <>
    <div className='flex flex-col justify-start mt-28 ml-14'>
      <h2 className='text-2xl font-bold mb-6'>Listado de Avances</h2>
      <table className='tabla'>
        <thead>
          <tr>
            <th className='rounded-tl-xl'>Id</th>
            <th>Id proyecto</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th class="rounded-tr-xl"></th>
          </tr>
        </thead>
        <tbody>
          {data1 &&
            data1.map((p) => {
              return (
                <tr key={p._id}>
                  <td>{p._id}</td>
                  <td>{p.project.id}</td>
                  <td>{p.fecha}</td>
                  <td>{p.observaciones[0]}</td>
                  <td>
                    <Link to={`/avances/${p._id}`}><i className='fas fa-eye text-yellow-600 hover:text-yellow-400 cursor-pointer p-1' /></Link>
                    <Link to={`/avances/editar/${p._id}`}><i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer p-1'></i></Link>
                    <i className='fas fa-trash-alt text-yellow-600 hover:text-yellow-400 cursor-pointer p-1'></i>

                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  </>;
};

export default IndexAvances;