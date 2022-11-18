import { IPlace } from 'app/entities/test-root/place/place.model';
import { DivisionType } from 'app/entities/enumerations/division-type.model';

export interface IDivision {
  id: string;
  name?: string | null;
  shortName?: string | null;
  numberOfPeople?: number | null;
  divisionType?: DivisionType | null;
  colorBackground?: string | null;
  colorText?: string | null;
  preferredPlaces?: Pick<IPlace, 'id'>[] | null;
}

export type NewDivision = Omit<IDivision, 'id'> & { id: null };
