import { gql } from "@apollo/client";

const EDITAR_PROYECTO = gql`
  mutation EditarProyecto($_id: String!, $campos: camposProyecto!) {
    editarProyecto(_id: $_id, campos: $campos) {
      nombre
      presupuesto
    }
  }
`;

const CREAR_PROYECTO = gql`
  mutation CrearProyecto(
    $nombre: String!
    $presupuesto: Float!
    $lider: String!
    $objetivos: [crearObjetivo]
  ) {
    crearProyecto(
      nombre: $nombre
      presupuesto: $presupuesto
      lider: $lider
      objetivos: $objetivos
    ) {
      _id
    }
  }
`;

const ACTIVAR_ESTADO = gql`
  mutation ActivarEstado($id: String!) {
    activarEstado(_id: $id) {
      _id
    }
  }
`;

const TERMINAR_PROYECTO = gql`
  mutation TerminarProyecto($id: String!) {
    terminarProyecto(_id: $id) {
      _id
    }
  }
`;

const PROBLEMA_PROYECTO = gql`
  mutation ProblemaProyecto($id: String!) {
    problemaProyecto(_id: $id) {
      _id
    }
  }
`;

export { EDITAR_PROYECTO, CREAR_PROYECTO, ACTIVAR_ESTADO, TERMINAR_PROYECTO, PROBLEMA_PROYECTO };
