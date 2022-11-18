export interface IEntityWithPaginationAndDTO {
  id: string;
  lea?: string | null;
}

export type NewEntityWithPaginationAndDTO = Omit<IEntityWithPaginationAndDTO, 'id'> & { id: null };
