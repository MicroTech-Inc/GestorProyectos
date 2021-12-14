import { gql } from '@apollo/client';

const GET_INSCRIPCIONES = gql`
query InscripcionesVerProyectos {
    InscripcionesVerProyectos {
      _id
      estado
      fechaIngreso
      fechaEgreso
      proyecto {
        nombre
      }
    }
  }
`;

export { GET_INSCRIPCIONES };