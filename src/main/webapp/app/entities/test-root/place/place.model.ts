import { IDivision } from 'app/entities/test-root/division/division.model';

export interface IPlace {
  id: string;
  name?: string | null;
  numberOfSeats?: number | null;
  shortName?: string | null;
  colorBackground?: string | null;
  colorText?: string | null;
  description?: string | null;
  preferredDivisions?: Pick<IDivision, 'id' | 'name'>[] | null;
  owner?: Pick<IDivision, 'id' | 'name'> | null;
}

export type NewPlace = Omit<IPlace, 'id'> & { id: null };
