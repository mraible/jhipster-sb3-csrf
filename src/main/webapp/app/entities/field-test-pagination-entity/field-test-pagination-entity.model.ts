import dayjs from 'dayjs/esm';
import { EnumFieldClass } from 'app/entities/enumerations/enum-field-class.model';
import { EnumRequiredFieldClass } from 'app/entities/enumerations/enum-required-field-class.model';

export interface IFieldTestPaginationEntity {
  id: string;
  stringAlice?: string | null;
  stringRequiredAlice?: string | null;
  stringMinlengthAlice?: string | null;
  stringMaxlengthAlice?: string | null;
  stringPatternAlice?: string | null;
  integerAlice?: number | null;
  integerRequiredAlice?: number | null;
  integerMinAlice?: number | null;
  integerMaxAlice?: number | null;
  longAlice?: number | null;
  longRequiredAlice?: number | null;
  longMinAlice?: number | null;
  longMaxAlice?: number | null;
  floatAlice?: number | null;
  floatRequiredAlice?: number | null;
  floatMinAlice?: number | null;
  floatMaxAlice?: number | null;
  doubleRequiredAlice?: number | null;
  doubleMinAlice?: number | null;
  doubleMaxAlice?: number | null;
  bigDecimalRequiredAlice?: number | null;
  bigDecimalMinAlice?: number | null;
  bigDecimalMaxAlice?: number | null;
  localDateAlice?: dayjs.Dayjs | null;
  localDateRequiredAlice?: dayjs.Dayjs | null;
  instantAlice?: dayjs.Dayjs | null;
  instanteRequiredAlice?: dayjs.Dayjs | null;
  zonedDateTimeAlice?: dayjs.Dayjs | null;
  zonedDateTimeRequiredAlice?: dayjs.Dayjs | null;
  durationAlice?: string | null;
  durationRequiredAlice?: string | null;
  booleanAlice?: boolean | null;
  booleanRequiredAlice?: boolean | null;
  enumAlice?: EnumFieldClass | null;
  enumRequiredAlice?: EnumRequiredFieldClass | null;
  uuidAlice?: string | null;
  uuidRequiredAlice?: string | null;
  byteImageAlice?: string | null;
  byteImageAliceContentType?: string | null;
  byteImageRequiredAlice?: string | null;
  byteImageRequiredAliceContentType?: string | null;
  byteImageMinbytesAlice?: string | null;
  byteImageMinbytesAliceContentType?: string | null;
  byteImageMaxbytesAlice?: string | null;
  byteImageMaxbytesAliceContentType?: string | null;
  byteAnyAlice?: string | null;
  byteAnyAliceContentType?: string | null;
  byteAnyRequiredAlice?: string | null;
  byteAnyRequiredAliceContentType?: string | null;
  byteAnyMinbytesAlice?: string | null;
  byteAnyMinbytesAliceContentType?: string | null;
  byteAnyMaxbytesAlice?: string | null;
  byteAnyMaxbytesAliceContentType?: string | null;
  byteTextAlice?: string | null;
  byteTextRequiredAlice?: string | null;
}

export type NewFieldTestPaginationEntity = Omit<IFieldTestPaginationEntity, 'id'> & { id: null };