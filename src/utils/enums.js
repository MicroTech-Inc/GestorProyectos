const Enum_Rol = {
  ADMINISTRADOR: 'Administrador',
  ESTUDIANTE: 'Estudiante',
  LIDER: 'Líder',
};

const Enum_EstadoUsuario = {
  PENDIENTE: 'Pendiente',
  AUTORIZADO: 'Autorizado',
  NO_AUTORIZADO: 'No autorizado',
};

const Enum_EstadoUsuarioLider = {
  PENDIENTE: 'Pendiente',
  AUTORIZADO: 'Autorizado',
};

const Enum_EstadoInscripcion = {
  ACEPTADO: 'Aceptado',
  RECHAZADO: 'Rechazado',
  PENDIENTE: 'Pendiente',
};

const Enum_EstadoProyecto = {
  ACTIVO: "Activo",
  INACTIVO: "Inactivo",
};

const Enum_FaseProyecto = {
  INICIADO: "Iniciado",
  DESARROLLO: "Desarrollo",
  TERMINADO: "Terminado",
  NULO: " ",
};

const Enum_TipoObjetivo = {
  GENERAL: "General",
  ESPECIFICO: "Específico",
}


export { Enum_Rol, Enum_EstadoUsuario, Enum_EstadoUsuarioLider, Enum_EstadoInscripcion, Enum_EstadoProyecto, Enum_FaseProyecto, Enum_TipoObjetivo  };
