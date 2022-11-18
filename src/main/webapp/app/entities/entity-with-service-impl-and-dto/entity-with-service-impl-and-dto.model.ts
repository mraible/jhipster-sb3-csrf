export interface IEntityWithServiceImplAndDTO {
  id: string;
  louis?: string | null;
}

export type NewEntityWithServiceImplAndDTO = Omit<IEntityWithServiceImplAndDTO, 'id'> & { id: null };
