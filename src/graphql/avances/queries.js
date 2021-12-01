import { gql } from '@apollo/client';

const GET_AVANCES = gql`
  query Avances {
    Avances {
      _id
      fecha
      descripcion
      observaciones
      proyecto{
          _id
      }
      creadoPor{
          _id
      }
    }
  }
`;

const GET_AVANCE = gql`
  query filtrarAvance($_id:String!){
    filtrarAvance(_id:$_id) {
      _id
      fecha
      descripcion
      observaciones
      proyecto
      creadoPor
    }
  }
`;


export { GET_AVANCES, GET_AVANCE };