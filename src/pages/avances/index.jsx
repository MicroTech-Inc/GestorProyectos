import React, { useEffect, useParams } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AVANCES } from 'graphql/avances/queries';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PrivateComponent from 'components/PrivateComponent';

const IndexAvances = () => {
  const { data: queryData, error, loading } = useQuery(GET_AVANCES);

  useEffect(() => {
    console.log("data servidor", queryData);
  }, [queryData]);

  useEffect(() => {
    if (error) {
      toast.error("Error consultando los avances");
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;


  return <>
    <PrivateComponent roleList={"ADMINISTRADOR"}>
        <h1 className='text-red-600 text-4xl text-center'>NO ESTAS AUTORIZADO PARA VER ESTE SITIO</h1>
    </PrivateComponent>
    <PrivateComponent roleList={['ESTUDIANTE', 'LIDER']}>
      <div className='flex flex-col justify-start mt-28 ml-14'>
        <h2 className='text-2xl font-bold mb-6'>Listado de Avances</h2>
        <PrivateComponent roleList={"ESTUDIANTE"}>
          <div>
            <Link to={`/avances/registro`}><i className='fas fa-folder-plus fa-2x  text-green-500 hover:text-green-600 cursor-pointer p-1 justify-end' /></Link>
          </div>
        </PrivateComponent>
        <table className='tabla'>
          <thead>
            <tr>
              <th className='rounded-tl-xl'>Nombre proyecto</th>
              <th>Fecha</th>
              <th className="rounded-tr-xl"></th>
            </tr>
          </thead>
          <tbody>
            {queryData &&
              queryData.avanceLider.map((u) => {
                return (
                  <tr key={u._id}>
                    <td>{u.proyecto.nombre}</td>
                    <td>{u.fecha.slice(0, -14)}</td>
                    <td>
                      <Link to={`/avances/${u._id}`}><i className='fas fa-eye text-yellow-600 hover:text-yellow-400 cursor-pointer p-1' /></Link>
                      <Link to={`/avances/editar/${u._id}`}><i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer p-1'></i></Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </PrivateComponent>
  </>;
};

export default IndexAvances;

/* ADMINISTRADOR 
const { data, error, loading } = useQuery(GET_AVANCE);

  useEffect(()=>{
    console.log('Data servidor', data);
  }, [data]);

  useEffect(() =>{
    if(error){
      toast.error('Error consultando los avances');
    }
  },[error]);
  
  if(loading) return <div>Cargando...</div>;*/