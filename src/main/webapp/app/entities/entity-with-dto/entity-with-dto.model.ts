export interface IEntityWithDTO {
  id: string;
  emma?: string | null;
}

export type NewEntityWithDTO = Omit<IEntityWithDTO, 'id'> & { id: null };
