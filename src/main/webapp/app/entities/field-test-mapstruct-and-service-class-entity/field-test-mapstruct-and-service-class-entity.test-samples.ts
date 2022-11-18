import dayjs from 'dayjs/esm';

import { EnumFieldClass } from 'app/entities/enumerations/enum-field-class.model';
import { EnumRequiredFieldClass } from 'app/entities/enumerations/enum-required-field-class.model';

import {
  IFieldTestMapstructAndServiceClassEntity,
  NewFieldTestMapstructAndServiceClassEntity,
} from './field-test-mapstruct-and-service-class-entity.model';

export const sampleWithRequiredData: IFieldTestMapstructAndServiceClassEntity = {
  id: '6c4b0983-7b14-4138-a56c-f0a91571bd9b',
  stringRequiredEva: 'hack capacitor',
  integerRequiredEva: 1907,
  longRequiredEva: 53434,
  floatRequiredEva: 51129,
  doubleRequiredEva: 88537,
  bigDecimalRequiredEva: 73221,
  localDateRequiredEva: dayjs('2016-02-07'),
  instanteRequiredEva: dayjs('2016-02-08T03:00'),
  zonedDateTimeRequiredEva: dayjs('2016-02-07T21:17'),
  durationRequiredEva: '6943',
  booleanRequiredEva: false,
  enumRequiredEva: EnumRequiredFieldClass['ENUM_VALUE_2'],
  uuidRequiredEva: '5171b73b-9823-4499-b729-d0a36b60e844',
  byteImageRequiredEva: '../fake-data/blob/hipster.png',
  byteImageRequiredEvaContentType: 'unknown',
  byteAnyRequiredEva: '../fake-data/blob/hipster.png',
  byteAnyRequiredEvaContentType: 'unknown',
  byteTextRequiredEva: '../fake-data/blob/hipster.txt',
};

export const sampleWithPartialData: IFieldTestMapstructAndServiceClassEntity = {
  id: '73257606-1094-42bf-a341-6e58fece2db9',
  stringEva: 'Kentucky',
  stringRequiredEva: 'violet Garden Pants',
  stringMaxlengthEva: 'Officer withdrawal',
  integerRequiredEva: 74213,
  integerMaxEva: 2,
  longRequiredEva: 49348,
  longMinEva: 38662,
  floatRequiredEva: 97606,
  doubleRequiredEva: 662,
  doubleMinEva: 27975,
  bigDecimalRequiredEva: 10192,
  bigDecimalMaxEva: 73,
  localDateRequiredEva: dayjs('2016-02-07'),
  instantEva: dayjs('2016-02-08T06:44'),
  instanteRequiredEva: dayjs('2016-02-07T23:10'),
  zonedDateTimeEva: dayjs('2016-02-08T14:13'),
  zonedDateTimeRequiredEva: dayjs('2016-02-08T04:32'),
  durationRequiredEva: '75959',
  booleanEva: true,
  booleanRequiredEva: true,
  enumEva: EnumFieldClass['ENUM_VALUE_1'],
  enumRequiredEva: EnumRequiredFieldClass['ENUM_VALUE_3'],
  uuidRequiredEva: '45107aa3-cf16-4f2a-bc97-8071bac8e992',
  byteImageRequiredEva: '../fake-data/blob/hipster.png',
  byteImageRequiredEvaContentType: 'unknown',
  byteAnyEva: '../fake-data/blob/hipster.png',
  byteAnyEvaContentType: 'unknown',
  byteAnyRequiredEva: '../fake-data/blob/hipster.png',
  byteAnyRequiredEvaContentType: 'unknown',
  byteAnyMinbytesEva: '../fake-data/blob/hipster.png',
  byteAnyMinbytesEvaContentType: 'unknown',
  byteAnyMaxbytesEva: '../fake-data/blob/hipster.png',
  byteAnyMaxbytesEvaContentType: 'unknown',
  byteTextEva: '../fake-data/blob/hipster.txt',
  byteTextRequiredEva: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IFieldTestMapstructAndServiceClassEntity = {
  id: '9c5ca78a-0758-4800-af8b-f5f3e8f1525f',
  stringEva: 'backing ah Mouse',
  stringRequiredEva: 'West tiny ivory',
  stringMinlengthEva: 'Functionality Administrator drive',
  stringMaxlengthEva: 'Pop',
  stringPatternEva: '7NJu',
  integerEva: 15808,
  integerRequiredEva: 39753,
  integerMinEva: 50798,
  integerMaxEva: 76,
  longEva: 41778,
  longRequiredEva: 57025,
  longMinEva: 39783,
  longMaxEva: 88,
  floatEva: 81468,
  floatRequiredEva: 24382,
  floatMinEva: 43490,
  floatMaxEva: 49,
  doubleRequiredEva: 49627,
  doubleMinEva: 7141,
  doubleMaxEva: 80,
  bigDecimalRequiredEva: 34812,
  bigDecimalMinEva: 99875,
  bigDecimalMaxEva: 90,
  localDateEva: dayjs('2016-02-08'),
  localDateRequiredEva: dayjs('2016-02-07'),
  instantEva: dayjs('2016-02-07T23:46'),
  instanteRequiredEva: dayjs('2016-02-08T02:32'),
  zonedDateTimeEva: dayjs('2016-02-08T15:43'),
  zonedDateTimeRequiredEva: dayjs('2016-02-08T08:59'),
  durationEva: '9313',
  durationRequiredEva: '30078',
  booleanEva: true,
  booleanRequiredEva: true,
  enumEva: EnumFieldClass['ENUM_VALUE_3'],
  enumRequiredEva: EnumRequiredFieldClass['ENUM_VALUE_1'],
  uuidEva: '59060a25-8e6b-4480-8a05-468e86dce662',
  uuidRequiredEva: '84a8c62f-71cf-4a90-b50a-f1a0800a8665',
  byteImageEva: '../fake-data/blob/hipster.png',
  byteImageEvaContentType: 'unknown',
  byteImageRequiredEva: '../fake-data/blob/hipster.png',
  byteImageRequiredEvaContentType: 'unknown',
  byteImageMinbytesEva: '../fake-data/blob/hipster.png',
  byteImageMinbytesEvaContentType: 'unknown',
  byteImageMaxbytesEva: '../fake-data/blob/hipster.png',
  byteImageMaxbytesEvaContentType: 'unknown',
  byteAnyEva: '../fake-data/blob/hipster.png',
  byteAnyEvaContentType: 'unknown',
  byteAnyRequiredEva: '../fake-data/blob/hipster.png',
  byteAnyRequiredEvaContentType: 'unknown',
  byteAnyMinbytesEva: '../fake-data/blob/hipster.png',
  byteAnyMinbytesEvaContentType: 'unknown',
  byteAnyMaxbytesEva: '../fake-data/blob/hipster.png',
  byteAnyMaxbytesEvaContentType: 'unknown',
  byteTextEva: '../fake-data/blob/hipster.txt',
  byteTextRequiredEva: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewFieldTestMapstructAndServiceClassEntity = {
  stringRequiredEva: 'Hybrid scaly',
  integerRequiredEva: 30978,
  longRequiredEva: 61801,
  floatRequiredEva: 25299,
  doubleRequiredEva: 42532,
  bigDecimalRequiredEva: 5298,
  localDateRequiredEva: dayjs('2016-02-08'),
  instanteRequiredEva: dayjs('2016-02-08T06:46'),
  zonedDateTimeRequiredEva: dayjs('2016-02-07T21:14'),
  durationRequiredEva: '46755',
  booleanRequiredEva: true,
  enumRequiredEva: EnumRequiredFieldClass['ENUM_VALUE_1'],
  uuidRequiredEva: '8d4b9483-de3a-4126-9e3a-ecc2ad4ec5e6',
  byteImageRequiredEva: '../fake-data/blob/hipster.png',
  byteImageRequiredEvaContentType: 'unknown',
  byteAnyRequiredEva: '../fake-data/blob/hipster.png',
  byteAnyRequiredEvaContentType: 'unknown',
  byteTextRequiredEva: '../fake-data/blob/hipster.txt',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);