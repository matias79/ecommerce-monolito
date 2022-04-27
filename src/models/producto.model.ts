import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Categoria} from './categoria.model';
import {ProductoCategoria} from './producto-categoria.model';
import {Imagen} from './imagen.model';
import {Marca} from './marca.model';

@model()
export class Producto extends Entity {
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
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  existencia: number;

  @property({
    type: 'number',
    default: 0,
  })
  calificacion?: number;

  @property({
    type: 'number',
    default: 0,
  })
  descuento?: number;

  @hasMany(() => Categoria, {through: {model: () => ProductoCategoria}})
  categorias: Categoria[];

  @hasMany(() => Imagen)
  imagens: Imagen[];

  @belongsTo(() => Marca)
  marcaId: number;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
