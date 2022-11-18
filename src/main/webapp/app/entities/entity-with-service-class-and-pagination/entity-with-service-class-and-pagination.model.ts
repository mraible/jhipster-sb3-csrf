export interface IEntityWithServiceClassAndPagination {
  id: string;
  enzo?: string | null;
}

export type NewEntityWithServiceClassAndPagination = Omit<IEntityWithServiceClassAndPagination, 'id'> & { id: null };
