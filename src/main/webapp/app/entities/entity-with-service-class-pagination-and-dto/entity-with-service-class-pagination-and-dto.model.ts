export interface IEntityWithServiceClassPaginationAndDTO {
  id: string;
  lena?: string | null;
}

export type NewEntityWithServiceClassPaginationAndDTO = Omit<IEntityWithServiceClassPaginationAndDTO, 'id'> & { id: null };
