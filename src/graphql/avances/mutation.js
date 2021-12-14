import { gql } from "@apollo/client";

const CREAR_AVANCE = gql`
  mutation CrearAvance(
    $fecha: Date!
    $descripcion: String!
    $proyecto: String!
    $creadoPor: String!
  ) {
    crearAvance(
      fecha: $fecha
      descripcion: $descripcion
      proyecto: $proyecto
      creadoPor: $creadoPor
    ) {
      _id
    }
  }
`;

const EDITAR_AVANCE = gql `
mutation EditarAvance($_id: String!, $campos: camposAvance!) {
  editarAvance(_id: $_id, campos: $campos) {
    fecha
    descripcion
    observaciones
  }
}
`




export {CREAR_AVANCE, EDITAR_AVANCE};