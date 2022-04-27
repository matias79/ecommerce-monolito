import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Producto, ProductoRelations, Categoria, ProductoCategoria, Imagen, Marca} from '../models';
import {ProductoCategoriaRepository} from './producto-categoria.repository';
import {CategoriaRepository} from './categoria.repository';
import {ImagenRepository} from './imagen.repository';
import {MarcaRepository} from './marca.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly categorias: HasManyThroughRepositoryFactory<Categoria, typeof Categoria.prototype.id,
          ProductoCategoria,
          typeof Producto.prototype.id
        >;

  public readonly imagens: HasManyRepositoryFactory<Imagen, typeof Producto.prototype.id>;

  public readonly marca: BelongsToAccessor<Marca, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProductoCategoriaRepository') protected productoCategoriaRepositoryGetter: Getter<ProductoCategoriaRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('ImagenRepository') protected imagenRepositoryGetter: Getter<ImagenRepository>, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>,
  ) {
    super(Producto, dataSource);
    this.marca = this.createBelongsToAccessorFor('marca', marcaRepositoryGetter,);
    this.registerInclusionResolver('marca', this.marca.inclusionResolver);
    this.imagens = this.createHasManyRepositoryFactoryFor('imagens', imagenRepositoryGetter,);
    this.registerInclusionResolver('imagens', this.imagens.inclusionResolver);
    this.categorias = this.createHasManyThroughRepositoryFactoryFor('categorias', categoriaRepositoryGetter, productoCategoriaRepositoryGetter,);
    this.registerInclusionResolver('categorias', this.categorias.inclusionResolver);
  }
}
