import { DivisionType } from 'app/entities/enumerations/division-type.model';

import { IDivision, NewDivision } from './division.model';

export const sampleWithRequiredData: IDivision = {
  id: '92c1782c-65d3-4d88-8b39-1c903a94dff5',
  name: 'Passenger',
  divisionType: DivisionType['SCHOOL'],
};

export const sampleWithPartialData: IDivision = {
  id: 'ef8e6595-5d13-487a-800a-c31b6b74035f',
  name: 'Cambridgeshire',
  shortName: 'partnerships Nakfa',
  numberOfPeople: 31948,
  divisionType: DivisionType['SUBGROUP'],
  colorBackground: 'Rubber Administrator',
  colorText: 'apprehensive ab',
};

export const sampleWithFullData: IDivision = {
  id: '044125f2-b716-4574-a81b-e432a534039a',
  name: 'XML',
  shortName: 'Strategist male Minnesota',
  numberOfPeople: 53206,
  divisionType: DivisionType['SCHOOL'],
  colorBackground: 'South Crew',
  colorText: 'Electric Organized',
};

export const sampleWithNewData: NewDivision = {
  name: 'absent',
  divisionType: DivisionType['SUBGROUP'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
