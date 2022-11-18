import {
  IEntityWithServiceImplAndPagination,
  NewEntityWithServiceImplAndPagination,
} from './entity-with-service-impl-and-pagination.model';

export const sampleWithRequiredData: IEntityWithServiceImplAndPagination = {
  id: '031ec933-c7f7-4a78-ab38-5a5c65b61b90',
};

export const sampleWithPartialData: IEntityWithServiceImplAndPagination = {
  id: '0108a6f7-75d4-46d5-a205-e8ba76b37a26',
};

export const sampleWithFullData: IEntityWithServiceImplAndPagination = {
  id: 'cf87a3d6-3009-42fb-80b3-52f2694b09d6',
  hugo: 'Electronic directional',
};

export const sampleWithNewData: NewEntityWithServiceImplAndPagination = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
