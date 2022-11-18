import {
  IEntityWithServiceImplPaginationAndDTO,
  NewEntityWithServiceImplPaginationAndDTO,
} from './entity-with-service-impl-pagination-and-dto.model';

export const sampleWithRequiredData: IEntityWithServiceImplPaginationAndDTO = {
  id: 'f09b1565-8ad9-4e17-8071-d788e738a04a',
};

export const sampleWithPartialData: IEntityWithServiceImplPaginationAndDTO = {
  id: '4adccbc2-e6ab-401b-a13e-9236ecb74c8c',
  theo: 'extend',
};

export const sampleWithFullData: IEntityWithServiceImplPaginationAndDTO = {
  id: '461bb22d-aa3c-45fa-9908-21cd0ad470f2',
  theo: 'Developer',
};

export const sampleWithNewData: NewEntityWithServiceImplPaginationAndDTO = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
