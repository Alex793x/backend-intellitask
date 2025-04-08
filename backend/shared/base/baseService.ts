import { BaseRepository } from './baseRepository';
import { IBaseCRUD } from './iBaseCRUD';
import Singleton from './singleton';

/**
 * Base service class that implements the IBaseCRUD interface.
 * Provides generic implementation for common CRUD operations.
 *
 * @template T The type of the entity returned by repository (database model).
 * @template U The type used for creating and updating entities.
 * @template R The type of the enriched entity returned by service (DTO model).
 * @extends {Singleton}
 * @implements {IBaseCRUD<T, U, R>}
 */
export class BaseService<T, U, R = T> extends Singleton implements IBaseCRUD<T, U, R> {
  /**
   * Creates a new instance of BaseService.
   * @param repository The repository that handles database interactions for this service.
   */
  protected constructor(protected readonly repository: BaseRepository<T, U>) {
    super();
  }

  /**
   * Transforms a database entity to a service response entity.
   * Override this method in derived classes to perform the transformation.
   *
   * @param entity The database entity
   * @returns The transformed entity
   */
  protected async transformEntity(entity: T): Promise<R> {
    return entity as unknown as R;
  }

  /**
   * Transforms an array of database entities to service response entities.
   *
   * @param entities Array of database entities
   * @returns Array of transformed entities
   */
  protected async transformEntities(entities: T[]): Promise<R[]> {
    return Promise.all(entities.map((entity) => this.transformEntity(entity)));
  }

  /**
   * Retrieves a single entity by its ID.
   * @param id The unique identifier of the entity.
   * @returns A promise resolving to the found entity.
   */
  async findOne(id: string): Promise<R> {
    const entity = await this.repository.findOne(id);
    return this.transformEntity(entity);
  }

  /**
   * Retrieves all entities.
   * @returns A promise resolving to an array of all entities.
   */
  async findAll(): Promise<R[]> {
    const entities = await this.repository.findAll();
    return this.transformEntities(entities);
  }

  /**
   * Creates a new entity.
   * @param item The entity data to create.
   * @returns A promise resolving to the created entity.
   */
  async createOne(item: U): Promise<R> {
    const entity = await this.repository.createOne(item);
    return this.transformEntity(entity);
  }

  /**
   * Updates an existing entity.
   * @param id The unique identifier of the entity to update.
   * @param item The updated entity data.
   * @returns A promise that resolves when the update is complete.
   */
  async updateOne(id: string, item: U): Promise<void | R> {
    const result = await this.repository.updateOne(id, item);
    if (result !== undefined) {
      return this.transformEntity(result);
    }
    return;
  }

  /**
   * Deletes an entity by its ID.
   * @param id The unique identifier of the entity to delete.
   * @returns A promise that resolves when the deletion is complete.
   */
  deleteOne(id: string): Promise<void> {
    return this.repository.deleteOne(id);
  }
}
