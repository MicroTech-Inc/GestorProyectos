import React, { useEffect, useState } from 'react';
import PrivateRoute from 'components/PrivateRoute';
import { useMutation, useQuery } from "@apollo/client";
import { toast } from 'react-toastify';
import { GET_PROYECTOS } from "graphql/proyectos/queries";
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';

const Index = () => {

    const { data: queryData, error, loading } = useQuery(GET_PROYECTOS);
    const { data, errorData, loadingData } = useQuery(GET_INSCRIPCIONES);
    const [totalProyectos, setTotalProyectos] = useState(0);
    const [proyectosActivos, setProyectosActivos] = useState(0);
    const [proyectosIniciado, setProyectosIniciado] = useState(0);
    const [proyectosDesarrollo, setProyectosDesarrollo] = useState(0);
    const [proyectosTerminado, setProyectosTerminado] = useState(0);
    const [totalInscripciones, setTotalInscripciones] = useState(0);

    useEffect(() => {
        console.log("data servidor", queryData);
        let a = 0;
        let b = 0;
        let c= 0;
        if(queryData){
        setTotalProyectos(queryData.Proyectos.length);
        setProyectosActivos(queryData.Proyectos.filter((el)=>el.estado === "ACTIVO").length);
        setProyectosIniciado(queryData.Proyectos.filter((el)=>el.fase === "INICIADO").length);
        setProyectosDesarrollo(queryData.Proyectos.filter((el)=>el.fase === "DESARROLLO").length);
        setProyectosTerminado(queryData.Proyectos.filter((el)=>el.fase === "TERMINADO").length);
        }    

      }, [queryData]);

      useEffect(() => {
        console.log("data servidor", data);

        if(data){
        setTotalInscripciones(data.Inscripciones.length);
        }    

      }, [data]);
    
      useEffect(() => {
        if (error || errorData) {
          toast.error('Error consultando las inscripciones');
        }
      }, [error, errorData]);



      if (loading) return <div>Cargando....</div>;


  return (
    <PrivateRoute roleList={['ADMINISTRADOR','LIDER', 'ESTUDIANTE']}>
    
    <div className='flex flex-col items-center justify-center mt-28'>
      <h2 className =' text-3xl font-bold'>DASHBOARD</h2>
    
        <div className='flex flex-col mt-6 p-2' >
            <div className='grid grid-cols-2 gap-12'>
            <div className='flex flex-row justify-evenly items-center border-2 border-gray-700 rounded-md p-1 shadow-col'>
                <i className='fas fa-cogs fa-lg text-white' />
                <div className='flex flex-col items-center p-1 text-white'>
                <span>{totalProyectos}</span>
                <span>TOTAL PROYECTOS</span>
                </div>
            </div>
            <div className='flex flex-row justify-evenly items-center border-2 border-gray-700 rounded-md p-1 shadow-col'>
                <i className='far fa-edit fa-lg text-white'/>
                <div className='flex flex-col items-center p-1 text-white'>
                <span>{totalInscripciones}</span>
                <span>TOTAL INSCRITOS</span>
                </div>
            </div>
            <div className='flex flex-row justify-evenly items-center border-2 border-gray-700 rounded-md p-1 shadow-col'>
                <i className='fas fa-cogs fa-lg text-white'/>
                <div className='flex flex-col items-center p-1 text-white'>
                <span>{proyectosActivos}</span>
                <span>PROYECTOS ACTIVO</span>
                </div>
            </div>
            <div className='flex flex-row justify-evenly items-center border-2 border-gray-700 rounded-md p-1 shadow-col'>
                <i className='fas fa-cogs fa-lg text-white'/>
                <div className='flex flex-col items-center p-1 text-white'>
                <span>{proyectosIniciado}</span>
                <span>PROYECTOS INICIADOS</span>
                </div>
            </div>
            <div className='flex flex-row justify-evenly items-center border-2 border-gray-700 rounded-md p-1 shadow-col'>
                <i className='fas fa-cogs fa-lg text-white'/>
                <div className='flex flex-col items-center p-1 text-white'>
                <span>{proyectosDesarrollo}</span>
                <span>PROYECTOS EN DESARROLLO</span>
                </div>
            </div>
            <div className='flex flex-row justify-evenly items-center border-2 border-gray-700 rounded-md p-1 shadow-col'>
                <i className='fas fa-cogs fa-lg text-white'/>
                <div className='flex flex-col items-center p-1 text-white'>
                <span>{proyectosTerminado}</span>
                <span>PROYECTOS TERMINADOS</span>
                </div>
            </div>
            </div>           
        </div>   
    </div>
    </PrivateRoute>
  );
};

export default Index;
