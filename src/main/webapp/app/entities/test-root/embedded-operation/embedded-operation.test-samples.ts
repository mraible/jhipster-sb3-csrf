import dayjs from 'dayjs/esm';

import { IEmbeddedOperation } from './embedded-operation.model';

export const sampleWithRequiredData: IEmbeddedOperation = {
  date: dayjs('2020-08-03T22:03'),
  amount: 36039,
};

export const sampleWithPartialData: IEmbeddedOperation = {
  date: dayjs('2020-08-04T05:42'),
  description: 'Gasoline Casper',
  amount: 62038,
};

export const sampleWithFullData: IEmbeddedOperation = {
  date: dayjs('2020-08-04T13:06'),
  description: 'Diesel Audi',
  amount: 49275,
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
