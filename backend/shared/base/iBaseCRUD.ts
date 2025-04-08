/**
 * IBaseCRUD defines a standard interface for Create, Read, Update, Delete operations
 * on a data repository. It provides a consistent contract for data access layers.
 *
 * @template T - The entity type returned by operations (fully populated model)
 * @template U - The data transfer object type used for creating/updating entities
 * @template R - The return type (default is T, but can be different in services)
 */
export interface IBaseCRUD<T, U, R = T> {
  /**
   * Retrieves a single entity by its unique identifier
   * @param {string} id - The unique identifier of the entity
   * @returns {Promise<R>} A promise that resolves to the found entity
   */
  findOne(id: string): Promise<R>;

  /**
   * Retrieves all entities of this type
   * @returns {Promise<R[]>} A promise that resolves to an array of entities
   */
  findAll(): Promise<R[]>;

  /**
   * Creates a new entity
   * @param {U} item - The data transfer object containing entity information
   * @returns {Promise<R>} A promise that resolves to the created entity
   */
  createOne(item: U): Promise<R>;

  /**
   * Updates an existing entity
   * @param {string} id - The unique identifier of the entity to update
   * @param {U} item - The data transfer object containing updated entity information
   * @returns {Promise<void>} A promise that resolves when the update is complete
   */
  updateOne(id: string, item: U): Promise<void | R>;

  /**
   * Deletes an entity by its unique identifier
   * @param {string} id - The unique identifier of the entity to delete
   * @returns {Promise<void>} A promise that resolves when the deletion is complete
   */
  deleteOne(id: string): Promise<void>;
}
