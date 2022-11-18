import {
  IEntityWithServiceClassAndPagination,
  NewEntityWithServiceClassAndPagination,
} from './entity-with-service-class-and-pagination.model';

export const sampleWithRequiredData: IEntityWithServiceClassAndPagination = {
  id: 'ae57ec17-a8d5-41ef-b1f0-ef06fd7e51e3',
};

export const sampleWithPartialData: IEntityWithServiceClassAndPagination = {
  id: 'eec1aba9-9e60-445a-8a8d-14612f4b18c8',
  enzo: 'online',
};

export const sampleWithFullData: IEntityWithServiceClassAndPagination = {
  id: '16bca9c5-ca4a-45b9-933a-ed6083a23a5e',
  enzo: 'error',
};

export const sampleWithNewData: NewEntityWithServiceClassAndPagination = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
