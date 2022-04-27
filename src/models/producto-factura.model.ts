import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductoFactura extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  precio_uni: number;

  @property({
    type: 'number',
  })
  facturaId?: number;

  @property({
    type: 'number',
  })
  productoId?: number;

  constructor(data?: Partial<ProductoFactura>) {
    super(data);
  }
}

export interface ProductoFacturaRelations {
  // describe navigational properties here
}

export type ProductoFacturaWithRelations = ProductoFactura & ProductoFacturaRelations;
