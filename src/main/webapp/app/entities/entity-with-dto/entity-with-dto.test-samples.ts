import { IEntityWithDTO, NewEntityWithDTO } from './entity-with-dto.model';

export const sampleWithRequiredData: IEntityWithDTO = {
  id: '535dbea5-8139-4695-921c-3feaa84f25c9',
};

export const sampleWithPartialData: IEntityWithDTO = {
  id: '41aafa36-ce97-474b-bfb7-7dcf7d0074f8',
  emma: 'South whenever',
};

export const sampleWithFullData: IEntityWithDTO = {
  id: 'c9630c77-0d25-4a43-93f3-f36d8420fe28',
  emma: 'orchestrate API',
};

export const sampleWithNewData: NewEntityWithDTO = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
