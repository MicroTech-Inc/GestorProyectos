import { GET_AVANCE } from 'graphql/avances/queries';
import {React , useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import AvancesDetalles from './AvanceEditar';
import ButtonLoading from 'components/ButtonLoading';

const AvanceDetalles = () =>{
    const{_id} = useParams();
    
    const{
        data: queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_AVANCE,{
        variables: {_id},
    });
    console.log("ESTE ES EL ID:",_id)

    console.log(queryData);

    useEffect(() => {
        if(queryError){
            toast.error("Error consultado el avance");
        }
    }, [queryError]);

    if(queryLoading) return <div>Cargando...</div>


return (
    <div className="flex flex-col w-full h-full items-center">
      <Link to="/avances">
        <i className="fas fa-arrow-left mr-96 mt-7 text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
      </Link>
      <h1 className="m-4 text-2xl font-bold text-center">
        Detalle del Avance
      </h1>
      <form className="flex flex-col items-right justify-center">
        <label htmlFor="nombre" className="flex flex-col my-3">
          <span className="font-bold">ID del avance</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.detalleAvance._id}
            disabled
          />
        </label>
        <label htmlFor="presupuesto" className="flex flex-col my-3">
          <span className="font-bold">Fecha</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.detalleAvance.fecha.slice(0, -14)}
            disabled
          />
        </label>
        <label htmlFor="Fecha de inicio" className="flex flex-col my-3">
          <span className="font-bold">Descripcion</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.detalleAvance.descripcion}
            disabled
          />
        </label>
        <label htmlFor="Fecha de fin" className="flex flex-col my-3">
          <span className="font-bold">Observaciones</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.detalleAvance.observaciones}
            disabled
          />
        </label>
        <label htmlFor="Estado" className="flex flex-col my-3">
          <span className="font-bold">Nombre del proyecto</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.detalleAvance.proyecto.nombre}
            disabled
          />
        </label>
        <label htmlFor="Fase" className="flex flex-col my-3">
          <span className="font-bold">Creado por</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.detalleAvance.creadoPor.nombre}
            disabled
          />
        </label>
      </form>
    </div>
  );
};
    


export default AvanceDetalles;


/* <div className='flex flex-col justify-center align-middle mt-28 ml-14'>
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





    IMPORTANTE:

     <div className="">
          <span className="font-bold">Objetivos del proyecto:</span>
          <div className="">
            {queryData.Proyecto.objetivos.map((objetivo) => {
              return (
                <Objetivos
                  tipo={objetivo.tipo}
                  descripcion={objetivo.descripcion}
                />
              );
            })}
          </div>
        </div>*/