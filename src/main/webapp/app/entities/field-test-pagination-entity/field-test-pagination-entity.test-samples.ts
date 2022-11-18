import dayjs from 'dayjs/esm';

import { EnumFieldClass } from 'app/entities/enumerations/enum-field-class.model';
import { EnumRequiredFieldClass } from 'app/entities/enumerations/enum-required-field-class.model';

import { IFieldTestPaginationEntity, NewFieldTestPaginationEntity } from './field-test-pagination-entity.model';

export const sampleWithRequiredData: IFieldTestPaginationEntity = {
  id: '8eb35170-0ab8-4a7e-aabd-794765cf98f0',
  stringRequiredAlice: 'Investor',
  integerRequiredAlice: 63152,
  longRequiredAlice: 78680,
  floatRequiredAlice: 89917,
  doubleRequiredAlice: 58400,
  bigDecimalRequiredAlice: 93091,
  localDateRequiredAlice: dayjs('2016-02-08'),
  instanteRequiredAlice: dayjs('2016-02-07T20:51'),
  zonedDateTimeRequiredAlice: dayjs('2016-02-08T08:34'),
  durationRequiredAlice: '96234',
  booleanRequiredAlice: true,
  enumRequiredAlice: EnumRequiredFieldClass['ENUM_VALUE_2'],
  uuidRequiredAlice: 'd36da191-72e6-4989-a389-1b9451301f0d',
  byteImageRequiredAlice: '../fake-data/blob/hipster.png',
  byteImageRequiredAliceContentType: 'unknown',
  byteAnyRequiredAlice: '../fake-data/blob/hipster.png',
  byteAnyRequiredAliceContentType: 'unknown',
  byteTextRequiredAlice: '../fake-data/blob/hipster.txt',
};

export const sampleWithPartialData: IFieldTestPaginationEntity = {
  id: '5c07d1c6-1a88-4ce0-9744-24ba62eb278d',
  stringRequiredAlice: 'Northwest',
  stringMaxlengthAlice: 'payment',
  stringPatternAlice: 'JbuU',
  integerAlice: 61555,
  integerRequiredAlice: 45299,
  integerMaxAlice: 22,
  longRequiredAlice: 73431,
  longMinAlice: 61126,
  longMaxAlice: 61,
  floatRequiredAlice: 68710,
  floatMinAlice: 81562,
  doubleRequiredAlice: 73266,
  doubleMaxAlice: 94,
  bigDecimalRequiredAlice: 58845,
  bigDecimalMaxAlice: 46,
  localDateRequiredAlice: dayjs('2016-02-08'),
  instantAlice: dayjs('2016-02-08T14:19'),
  instanteRequiredAlice: dayjs('2016-02-08T13:25'),
  zonedDateTimeRequiredAlice: dayjs('2016-02-08T00:18'),
  durationRequiredAlice: '73915',
  booleanRequiredAlice: false,
  enumAlice: EnumFieldClass['ENUM_VALUE_1'],
  enumRequiredAlice: EnumRequiredFieldClass['ENUM_VALUE_3'],
  uuidRequiredAlice: '44d09ba1-1f80-49cd-ac46-e74508a983f7',
  byteImageRequiredAlice: '../fake-data/blob/hipster.png',
  byteImageRequiredAliceContentType: 'unknown',
  byteImageMinbytesAlice: '../fake-data/blob/hipster.png',
  byteImageMinbytesAliceContentType: 'unknown',
  byteAnyAlice: '../fake-data/blob/hipster.png',
  byteAnyAliceContentType: 'unknown',
  byteAnyRequiredAlice: '../fake-data/blob/hipster.png',
  byteAnyRequiredAliceContentType: 'unknown',
  byteAnyMinbytesAlice: '../fake-data/blob/hipster.png',
  byteAnyMinbytesAliceContentType: 'unknown',
  byteAnyMaxbytesAlice: '../fake-data/blob/hipster.png',
  byteAnyMaxbytesAliceContentType: 'unknown',
  byteTextRequiredAlice: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IFieldTestPaginationEntity = {
  id: 'bbb42106-c599-4a62-b2b7-53b2e29bf196',
  stringAlice: 'channels',
  stringRequiredAlice: 'recontextualize Bike',
  stringMinlengthAlice: 'Electronic mole Screen',
  stringMaxlengthAlice: 'flare',
  stringPatternAlice: undefined,
  integerAlice: 74300,
  integerRequiredAlice: 18795,
  integerMinAlice: 60855,
  integerMaxAlice: 15,
  longAlice: 92754,
  longRequiredAlice: 59144,
  longMinAlice: 60854,
  longMaxAlice: 42,
  floatAlice: 24228,
  floatRequiredAlice: 99053,
  floatMinAlice: 55925,
  floatMaxAlice: 82,
  doubleRequiredAlice: 13893,
  doubleMinAlice: 72384,
  doubleMaxAlice: 81,
  bigDecimalRequiredAlice: 27720,
  bigDecimalMinAlice: 41956,
  bigDecimalMaxAlice: 92,
  localDateAlice: dayjs('2016-02-08'),
  localDateRequiredAlice: dayjs('2016-02-07'),
  instantAlice: dayjs('2016-02-07T23:37'),
  instanteRequiredAlice: dayjs('2016-02-08T07:46'),
  zonedDateTimeAlice: dayjs('2016-02-08T16:24'),
  zonedDateTimeRequiredAlice: dayjs('2016-02-08T15:42'),
  durationAlice: '69093',
  durationRequiredAlice: '7931',
  booleanAlice: true,
  booleanRequiredAlice: true,
  enumAlice: EnumFieldClass['ENUM_VALUE_3'],
  enumRequiredAlice: EnumRequiredFieldClass['ENUM_VALUE_1'],
  uuidAlice: '55c7ffc1-bc08-45c4-ae38-4e83a100e8a3',
  uuidRequiredAlice: '2e7ab827-72b9-454a-b78e-8a4fb1031cde',
  byteImageAlice: '../fake-data/blob/hipster.png',
  byteImageAliceContentType: 'unknown',
  byteImageRequiredAlice: '../fake-data/blob/hipster.png',
  byteImageRequiredAliceContentType: 'unknown',
  byteImageMinbytesAlice: '../fake-data/blob/hipster.png',
  byteImageMinbytesAliceContentType: 'unknown',
  byteImageMaxbytesAlice: '../fake-data/blob/hipster.png',
  byteImageMaxbytesAliceContentType: 'unknown',
  byteAnyAlice: '../fake-data/blob/hipster.png',
  byteAnyAliceContentType: 'unknown',
  byteAnyRequiredAlice: '../fake-data/blob/hipster.png',
  byteAnyRequiredAliceContentType: 'unknown',
  byteAnyMinbytesAlice: '../fake-data/blob/hipster.png',
  byteAnyMinbytesAliceContentType: 'unknown',
  byteAnyMaxbytesAlice: '../fake-data/blob/hipster.png',
  byteAnyMaxbytesAliceContentType: 'unknown',
  byteTextAlice: '../fake-data/blob/hipster.txt',
  byteTextRequiredAlice: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewFieldTestPaginationEntity = {
  stringRequiredAlice: 'Rhodium once',
  integerRequiredAlice: 15183,
  longRequiredAlice: 85504,
  floatRequiredAlice: 89586,
  doubleRequiredAlice: 20513,
  bigDecimalRequiredAlice: 46562,
  localDateRequiredAlice: dayjs('2016-02-08'),
  instanteRequiredAlice: dayjs('2016-02-08T09:09'),
  zonedDateTimeRequiredAlice: dayjs('2016-02-08T01:37'),
  durationRequiredAlice: '94887',
  booleanRequiredAlice: true,
  enumRequiredAlice: EnumRequiredFieldClass['ENUM_VALUE_3'],
  uuidRequiredAlice: 'fd50192a-b529-4438-8982-fd113ae8cb86',
  byteImageRequiredAlice: '../fake-data/blob/hipster.png',
  byteImageRequiredAliceContentType: 'unknown',
  byteAnyRequiredAlice: '../fake-data/blob/hipster.png',
  byteAnyRequiredAliceContentType: 'unknown',
  byteTextRequiredAlice: '../fake-data/blob/hipster.txt',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
