export interface IEntityWithServiceImplAndPagination {
  id: string;
  hugo?: string | null;
}

export type NewEntityWithServiceImplAndPagination = Omit<IEntityWithServiceImplAndPagination, 'id'> & { id: null };
