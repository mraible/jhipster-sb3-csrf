import dayjs from 'dayjs/esm';
import { EnumFieldClass } from 'app/entities/enumerations/enum-field-class.model';
import { EnumRequiredFieldClass } from 'app/entities/enumerations/enum-required-field-class.model';

export interface IFieldTestEntity {
  id: string;
  stringTom?: string | null;
  stringRequiredTom?: string | null;
  stringMinlengthTom?: string | null;
  stringMaxlengthTom?: string | null;
  stringPatternTom?: string | null;
  numberPatternTom?: string | null;
  numberPatternRequiredTom?: string | null;
  integerTom?: number | null;
  integerRequiredTom?: number | null;
  integerMinTom?: number | null;
  integerMaxTom?: number | null;
  longTom?: number | null;
  longRequiredTom?: number | null;
  longMinTom?: number | null;
  longMaxTom?: number | null;
  floatTom?: number | null;
  floatRequiredTom?: number | null;
  floatMinTom?: number | null;
  floatMaxTom?: number | null;
  doubleRequiredTom?: number | null;
  doubleMinTom?: number | null;
  doubleMaxTom?: number | null;
  bigDecimalRequiredTom?: number | null;
  bigDecimalMinTom?: number | null;
  bigDecimalMaxTom?: number | null;
  localDateTom?: dayjs.Dayjs | null;
  localDateRequiredTom?: dayjs.Dayjs | null;
  instantTom?: dayjs.Dayjs | null;
  instantRequiredTom?: dayjs.Dayjs | null;
  zonedDateTimeTom?: dayjs.Dayjs | null;
  zonedDateTimeRequiredTom?: dayjs.Dayjs | null;
  durationTom?: string | null;
  durationRequiredTom?: string | null;
  booleanTom?: boolean | null;
  booleanRequiredTom?: boolean | null;
  enumTom?: EnumFieldClass | null;
  enumRequiredTom?: EnumRequiredFieldClass | null;
  uuidTom?: string | null;
  uuidRequiredTom?: string | null;
  byteImageTom?: string | null;
  byteImageTomContentType?: string | null;
  byteImageRequiredTom?: string | null;
  byteImageRequiredTomContentType?: string | null;
  byteImageMinbytesTom?: string | null;
  byteImageMinbytesTomContentType?: string | null;
  byteImageMaxbytesTom?: string | null;
  byteImageMaxbytesTomContentType?: string | null;
  byteAnyTom?: string | null;
  byteAnyTomContentType?: string | null;
  byteAnyRequiredTom?: string | null;
  byteAnyRequiredTomContentType?: string | null;
  byteAnyMinbytesTom?: string | null;
  byteAnyMinbytesTomContentType?: string | null;
  byteAnyMaxbytesTom?: string | null;
  byteAnyMaxbytesTomContentType?: string | null;
  byteTextTom?: string | null;
  byteTextRequiredTom?: string | null;
}

export type NewFieldTestEntity = Omit<IFieldTestEntity, 'id'> & { id: null };