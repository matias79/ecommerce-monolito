import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class UsuarioCliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<UsuarioCliente>) {
    super(data);
  }
}

export interface UsuarioClienteRelations {
  // describe navigational properties here
}

export type UsuarioClienteWithRelations = UsuarioCliente & UsuarioClienteRelations;
