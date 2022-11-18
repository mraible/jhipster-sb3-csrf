export interface IEntityWithServiceImplPaginationAndDTO {
  id: string;
  theo?: string | null;
}

export type NewEntityWithServiceImplPaginationAndDTO = Omit<IEntityWithServiceImplPaginationAndDTO, 'id'> & { id: null };
