import { IEntityWithPaginationAndDTO, NewEntityWithPaginationAndDTO } from './entity-with-pagination-and-dto.model';

export const sampleWithRequiredData: IEntityWithPaginationAndDTO = {
  id: '55f45bac-2c54-4519-95a7-3cc9fc952d2e',
};

export const sampleWithPartialData: IEntityWithPaginationAndDTO = {
  id: '7283a638-c8d5-4f94-b826-b900a8062ea1',
  lea: 'reintermediate',
};

export const sampleWithFullData: IEntityWithPaginationAndDTO = {
  id: 'dbc27fd8-04e7-4d98-83e0-0fa7a39b9763',
  lea: 'babushka',
};

export const sampleWithNewData: NewEntityWithPaginationAndDTO = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
