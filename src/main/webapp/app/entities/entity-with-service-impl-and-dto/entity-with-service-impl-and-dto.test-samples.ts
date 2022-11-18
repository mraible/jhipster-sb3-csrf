import { IEntityWithServiceImplAndDTO, NewEntityWithServiceImplAndDTO } from './entity-with-service-impl-and-dto.model';

export const sampleWithRequiredData: IEntityWithServiceImplAndDTO = {
  id: 'b561a165-0371-48aa-ada8-639375fd3f10',
};

export const sampleWithPartialData: IEntityWithServiceImplAndDTO = {
  id: 'de6a57a8-d95b-4971-a152-11d5796657b2',
  louis: 'Northwest',
};

export const sampleWithFullData: IEntityWithServiceImplAndDTO = {
  id: '234acbce-4a6b-4b2d-a293-164fa7928803',
  louis: 'Southeast',
};

export const sampleWithNewData: NewEntityWithServiceImplAndDTO = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
