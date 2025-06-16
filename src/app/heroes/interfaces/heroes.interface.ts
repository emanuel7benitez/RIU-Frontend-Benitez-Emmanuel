export interface Superheroe {
  id: number;
  nombre: string;
  alias: string;
  activoDesde: number;
  descripcion?: string;
  poderes: string[];
  biografia: Biografia;
  img?: string;
  activo: boolean;
}

export interface Biografia {
  nombreReal?: string;
  ocupacion?: string;
  baseDeOperaciones?: string;
  afiliaciones?: string;
}
