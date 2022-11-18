import dayjs from 'dayjs/esm';

import { EnumFieldClass } from 'app/entities/enumerations/enum-field-class.model';
import { EnumRequiredFieldClass } from 'app/entities/enumerations/enum-required-field-class.model';

import {
  IFieldTestServiceClassAndJpaFilteringEntity,
  NewFieldTestServiceClassAndJpaFilteringEntity,
} from './field-test-service-class-and-jpa-filtering-entity.model';

export const sampleWithRequiredData: IFieldTestServiceClassAndJpaFilteringEntity = {
  id: '73678d43-3297-4e4d-9da6-a86b29130f6d',
  stringRequiredBob: 'East',
  integerRequiredBob: 48107,
  longRequiredBob: 89029,
  floatRequiredBob: 65213,
  doubleRequiredBob: 47036,
  bigDecimalRequiredBob: 19514,
  localDateRequiredBob: dayjs('2016-02-08'),
  instanteRequiredBob: dayjs('2016-02-08T06:49'),
  zonedDateTimeRequiredBob: dayjs('2016-02-08T12:39'),
  durationRequiredBob: '80044',
  booleanRequiredBob: true,
  enumRequiredBob: EnumRequiredFieldClass['ENUM_VALUE_1'],
  uuidRequiredBob: '3b37bb9a-2bce-4f29-b478-0ab75b8f9db2',
  byteImageRequiredBob: '../fake-data/blob/hipster.png',
  byteImageRequiredBobContentType: 'unknown',
  byteAnyRequiredBob: '../fake-data/blob/hipster.png',
  byteAnyRequiredBobContentType: 'unknown',
  byteTextRequiredBob: '../fake-data/blob/hipster.txt',
};

export const sampleWithPartialData: IFieldTestServiceClassAndJpaFilteringEntity = {
  id: '9dd50c99-e456-451f-b4df-5dc5142a4df1',
  stringRequiredBob: 'bypassing',
  stringMinlengthBob: 'candela',
  stringPatternBob: 'lNag',
  integerRequiredBob: 12029,
  integerMaxBob: 9,
  longRequiredBob: 92556,
  longMinBob: 96067,
  floatRequiredBob: 4580,
  floatMaxBob: 82,
  doubleRequiredBob: 71629,
  doubleMaxBob: 13,
  bigDecimalRequiredBob: 73543,
  bigDecimalMinBob: 73835,
  localDateRequiredBob: dayjs('2016-02-07'),
  instantBob: dayjs('2016-02-07T23:20'),
  instanteRequiredBob: dayjs('2016-02-08T13:13'),
  zonedDateTimeBob: dayjs('2016-02-08T05:41'),
  zonedDateTimeRequiredBob: dayjs('2016-02-08T13:42'),
  durationRequiredBob: '69197',
  booleanBob: true,
  booleanRequiredBob: true,
  enumBob: EnumFieldClass['ENUM_VALUE_2'],
  enumRequiredBob: EnumRequiredFieldClass['ENUM_VALUE_3'],
  uuidBob: 'b5b539db-c6aa-47e1-8e03-8d680948dcac',
  uuidRequiredBob: 'ef56ad39-9719-42c3-9671-928471ff08cf',
  byteImageBob: '../fake-data/blob/hipster.png',
  byteImageBobContentType: 'unknown',
  byteImageRequiredBob: '../fake-data/blob/hipster.png',
  byteImageRequiredBobContentType: 'unknown',
  byteImageMaxbytesBob: '../fake-data/blob/hipster.png',
  byteImageMaxbytesBobContentType: 'unknown',
  byteAnyBob: '../fake-data/blob/hipster.png',
  byteAnyBobContentType: 'unknown',
  byteAnyRequiredBob: '../fake-data/blob/hipster.png',
  byteAnyRequiredBobContentType: 'unknown',
  byteAnyMinbytesBob: '../fake-data/blob/hipster.png',
  byteAnyMinbytesBobContentType: 'unknown',
  byteAnyMaxbytesBob: '../fake-data/blob/hipster.png',
  byteAnyMaxbytesBobContentType: 'unknown',
  byteTextRequiredBob: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IFieldTestServiceClassAndJpaFilteringEntity = {
  id: '743acf86-9ca7-4a6e-95f7-00d70800e788',
  stringBob: 'ack',
  stringRequiredBob: 'deposit',
  stringMinlengthBob: 'Promethium newton Automotive',
  stringMaxlengthBob: 'eyeballs Liaison Imp',
  stringPatternBob: '7pQQ1',
  integerBob: 29142,
  integerRequiredBob: 8830,
  integerMinBob: 71784,
  integerMaxBob: 67,
  longBob: 93908,
  longRequiredBob: 35413,
  longMinBob: 33728,
  longMaxBob: 40,
  floatBob: 26199,
  floatRequiredBob: 24587,
  floatMinBob: 77635,
  floatMaxBob: 19,
  doubleRequiredBob: 56224,
  doubleMinBob: 22985,
  doubleMaxBob: 8,
  bigDecimalRequiredBob: 17844,
  bigDecimalMinBob: 1808,
  bigDecimalMaxBob: 12,
  localDateBob: dayjs('2016-02-07'),
  localDateRequiredBob: dayjs('2016-02-07'),
  instantBob: dayjs('2016-02-08T05:49'),
  instanteRequiredBob: dayjs('2016-02-08T01:25'),
  zonedDateTimeBob: dayjs('2016-02-08T15:53'),
  zonedDateTimeRequiredBob: dayjs('2016-02-08T05:22'),
  durationBob: '62882',
  durationRequiredBob: '6235',
  booleanBob: false,
  booleanRequiredBob: false,
  enumBob: EnumFieldClass['ENUM_VALUE_2'],
  enumRequiredBob: EnumRequiredFieldClass['ENUM_VALUE_3'],
  uuidBob: '0d4428af-0c31-47dc-98b0-f496013cb250',
  uuidRequiredBob: '8b9a505e-3e01-4163-9ead-0f00ae2542d3',
  byteImageBob: '../fake-data/blob/hipster.png',
  byteImageBobContentType: 'unknown',
  byteImageRequiredBob: '../fake-data/blob/hipster.png',
  byteImageRequiredBobContentType: 'unknown',
  byteImageMinbytesBob: '../fake-data/blob/hipster.png',
  byteImageMinbytesBobContentType: 'unknown',
  byteImageMaxbytesBob: '../fake-data/blob/hipster.png',
  byteImageMaxbytesBobContentType: 'unknown',
  byteAnyBob: '../fake-data/blob/hipster.png',
  byteAnyBobContentType: 'unknown',
  byteAnyRequiredBob: '../fake-data/blob/hipster.png',
  byteAnyRequiredBobContentType: 'unknown',
  byteAnyMinbytesBob: '../fake-data/blob/hipster.png',
  byteAnyMinbytesBobContentType: 'unknown',
  byteAnyMaxbytesBob: '../fake-data/blob/hipster.png',
  byteAnyMaxbytesBobContentType: 'unknown',
  byteTextBob: '../fake-data/blob/hipster.txt',
  byteTextRequiredBob: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewFieldTestServiceClassAndJpaFilteringEntity = {
  stringRequiredBob: 'Plastic',
  integerRequiredBob: 93671,
  longRequiredBob: 39264,
  floatRequiredBob: 36244,
  doubleRequiredBob: 36834,
  bigDecimalRequiredBob: 18733,
  localDateRequiredBob: dayjs('2016-02-08'),
  instanteRequiredBob: dayjs('2016-02-08T11:04'),
  zonedDateTimeRequiredBob: dayjs('2016-02-08T02:15'),
  durationRequiredBob: '62280',
  booleanRequiredBob: false,
  enumRequiredBob: EnumRequiredFieldClass['ENUM_VALUE_1'],
  uuidRequiredBob: 'b1d267d1-026a-4cb8-9a78-618e4592848f',
  byteImageRequiredBob: '../fake-data/blob/hipster.png',
  byteImageRequiredBobContentType: 'unknown',
  byteAnyRequiredBob: '../fake-data/blob/hipster.png',
  byteAnyRequiredBobContentType: 'unknown',
  byteTextRequiredBob: '../fake-data/blob/hipster.txt',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);