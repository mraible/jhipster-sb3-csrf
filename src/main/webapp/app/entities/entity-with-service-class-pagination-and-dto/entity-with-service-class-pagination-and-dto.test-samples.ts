import {
  IEntityWithServiceClassPaginationAndDTO,
  NewEntityWithServiceClassPaginationAndDTO,
} from './entity-with-service-class-pagination-and-dto.model';

export const sampleWithRequiredData: IEntityWithServiceClassPaginationAndDTO = {
  id: '6f49e106-91ca-4ed3-8616-16c8d3b93ef3',
};

export const sampleWithPartialData: IEntityWithServiceClassPaginationAndDTO = {
  id: '6b1084bf-8df7-4402-b482-2011e672f0e9',
};

export const sampleWithFullData: IEntityWithServiceClassPaginationAndDTO = {
  id: 'c543b10e-b6f0-4c1c-b2a9-9461e194bb7d',
  lena: 'Buckinghamshire Global Home',
};

export const sampleWithNewData: NewEntityWithServiceClassPaginationAndDTO = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
