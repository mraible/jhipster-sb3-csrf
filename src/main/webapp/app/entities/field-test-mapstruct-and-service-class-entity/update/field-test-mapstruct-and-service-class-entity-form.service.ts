import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import {
  IFieldTestMapstructAndServiceClassEntity,
  NewFieldTestMapstructAndServiceClassEntity,
} from '../field-test-mapstruct-and-service-class-entity.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFieldTestMapstructAndServiceClassEntity for edit and NewFieldTestMapstructAndServiceClassEntityFormGroupInput for create.
 */
type FieldTestMapstructAndServiceClassEntityFormGroupInput =
  | IFieldTestMapstructAndServiceClassEntity
  | PartialWithRequiredKeyOf<NewFieldTestMapstructAndServiceClassEntity>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFieldTestMapstructAndServiceClassEntity | NewFieldTestMapstructAndServiceClassEntity> = Omit<
  T,
  'instantEva' | 'instanteRequiredEva' | 'zonedDateTimeEva' | 'zonedDateTimeRequiredEva'
> & {
  instantEva?: string | null;
  instanteRequiredEva?: string | null;
  zonedDateTimeEva?: string | null;
  zonedDateTimeRequiredEva?: string | null;
};

type FieldTestMapstructAndServiceClassEntityFormRawValue = FormValueOf<IFieldTestMapstructAndServiceClassEntity>;

type NewFieldTestMapstructAndServiceClassEntityFormRawValue = FormValueOf<NewFieldTestMapstructAndServiceClassEntity>;

type FieldTestMapstructAndServiceClassEntityFormDefaults = Pick<
  NewFieldTestMapstructAndServiceClassEntity,
  'id' | 'instantEva' | 'instanteRequiredEva' | 'zonedDateTimeEva' | 'zonedDateTimeRequiredEva' | 'booleanEva' | 'booleanRequiredEva'
>;

type FieldTestMapstructAndServiceClassEntityFormGroupContent = {
  id: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['id'] | NewFieldTestMapstructAndServiceClassEntity['id']>;
  stringEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['stringEva']>;
  stringRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['stringRequiredEva']>;
  stringMinlengthEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['stringMinlengthEva']>;
  stringMaxlengthEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['stringMaxlengthEva']>;
  stringPatternEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['stringPatternEva']>;
  integerEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['integerEva']>;
  integerRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['integerRequiredEva']>;
  integerMinEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['integerMinEva']>;
  integerMaxEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['integerMaxEva']>;
  longEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['longEva']>;
  longRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['longRequiredEva']>;
  longMinEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['longMinEva']>;
  longMaxEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['longMaxEva']>;
  floatEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['floatEva']>;
  floatRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['floatRequiredEva']>;
  floatMinEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['floatMinEva']>;
  floatMaxEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['floatMaxEva']>;
  doubleRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['doubleRequiredEva']>;
  doubleMinEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['doubleMinEva']>;
  doubleMaxEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['doubleMaxEva']>;
  bigDecimalRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['bigDecimalRequiredEva']>;
  bigDecimalMinEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['bigDecimalMinEva']>;
  bigDecimalMaxEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['bigDecimalMaxEva']>;
  localDateEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['localDateEva']>;
  localDateRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['localDateRequiredEva']>;
  instantEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['instantEva']>;
  instanteRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['instanteRequiredEva']>;
  zonedDateTimeEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['zonedDateTimeEva']>;
  zonedDateTimeRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['zonedDateTimeRequiredEva']>;
  durationEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['durationEva']>;
  durationRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['durationRequiredEva']>;
  booleanEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['booleanEva']>;
  booleanRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['booleanRequiredEva']>;
  enumEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['enumEva']>;
  enumRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['enumRequiredEva']>;
  uuidEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['uuidEva']>;
  uuidRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['uuidRequiredEva']>;
  byteImageEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteImageEva']>;
  byteImageEvaContentType: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteImageEvaContentType']>;
  byteImageRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteImageRequiredEva']>;
  byteImageRequiredEvaContentType: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteImageRequiredEvaContentType']>;
  byteImageMinbytesEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteImageMinbytesEva']>;
  byteImageMinbytesEvaContentType: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteImageMinbytesEvaContentType']>;
  byteImageMaxbytesEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteImageMaxbytesEva']>;
  byteImageMaxbytesEvaContentType: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteImageMaxbytesEvaContentType']>;
  byteAnyEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteAnyEva']>;
  byteAnyEvaContentType: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteAnyEvaContentType']>;
  byteAnyRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteAnyRequiredEva']>;
  byteAnyRequiredEvaContentType: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteAnyRequiredEvaContentType']>;
  byteAnyMinbytesEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteAnyMinbytesEva']>;
  byteAnyMinbytesEvaContentType: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteAnyMinbytesEvaContentType']>;
  byteAnyMaxbytesEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteAnyMaxbytesEva']>;
  byteAnyMaxbytesEvaContentType: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteAnyMaxbytesEvaContentType']>;
  byteTextEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteTextEva']>;
  byteTextRequiredEva: FormControl<FieldTestMapstructAndServiceClassEntityFormRawValue['byteTextRequiredEva']>;
};

export type FieldTestMapstructAndServiceClassEntityFormGroup = FormGroup<FieldTestMapstructAndServiceClassEntityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FieldTestMapstructAndServiceClassEntityFormService {
  createFieldTestMapstructAndServiceClassEntityFormGroup(
    fieldTestMapstructAndServiceClassEntity: FieldTestMapstructAndServiceClassEntityFormGroupInput = { id: null }
  ): FieldTestMapstructAndServiceClassEntityFormGroup {
    const fieldTestMapstructAndServiceClassEntityRawValue =
      this.convertFieldTestMapstructAndServiceClassEntityToFieldTestMapstructAndServiceClassEntityRawValue({
        ...this.getFormDefaults(),
        ...fieldTestMapstructAndServiceClassEntity,
      });
    return new FormGroup<FieldTestMapstructAndServiceClassEntityFormGroupContent>({
      id: new FormControl(
        { value: fieldTestMapstructAndServiceClassEntityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      stringEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.stringEva),
      stringRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.stringRequiredEva, {
        validators: [Validators.required],
      }),
      stringMinlengthEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.stringMinlengthEva, {
        validators: [Validators.minLength(0)],
      }),
      stringMaxlengthEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.stringMaxlengthEva, {
        validators: [Validators.maxLength(20)],
      }),
      stringPatternEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.stringPatternEva, {
        validators: [Validators.pattern('^[a-zA-Z0-9]*$')],
      }),
      integerEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.integerEva),
      integerRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.integerRequiredEva, {
        validators: [Validators.required],
      }),
      integerMinEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.integerMinEva, {
        validators: [Validators.min(0)],
      }),
      integerMaxEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.integerMaxEva, {
        validators: [Validators.max(100)],
      }),
      longEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.longEva),
      longRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.longRequiredEva, {
        validators: [Validators.required],
      }),
      longMinEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.longMinEva, {
        validators: [Validators.min(0)],
      }),
      longMaxEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.longMaxEva, {
        validators: [Validators.max(100)],
      }),
      floatEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.floatEva),
      floatRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.floatRequiredEva, {
        validators: [Validators.required],
      }),
      floatMinEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.floatMinEva, {
        validators: [Validators.min(0)],
      }),
      floatMaxEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.floatMaxEva, {
        validators: [Validators.max(100)],
      }),
      doubleRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.doubleRequiredEva, {
        validators: [Validators.required],
      }),
      doubleMinEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.doubleMinEva, {
        validators: [Validators.min(0)],
      }),
      doubleMaxEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.doubleMaxEva, {
        validators: [Validators.max(100)],
      }),
      bigDecimalRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.bigDecimalRequiredEva, {
        validators: [Validators.required],
      }),
      bigDecimalMinEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.bigDecimalMinEva, {
        validators: [Validators.min(0)],
      }),
      bigDecimalMaxEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.bigDecimalMaxEva, {
        validators: [Validators.max(100)],
      }),
      localDateEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.localDateEva),
      localDateRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.localDateRequiredEva, {
        validators: [Validators.required],
      }),
      instantEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.instantEva),
      instanteRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.instanteRequiredEva, {
        validators: [Validators.required],
      }),
      zonedDateTimeEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.zonedDateTimeEva),
      zonedDateTimeRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.zonedDateTimeRequiredEva, {
        validators: [Validators.required],
      }),
      durationEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.durationEva),
      durationRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.durationRequiredEva, {
        validators: [Validators.required],
      }),
      booleanEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.booleanEva),
      booleanRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.booleanRequiredEva, {
        validators: [Validators.required],
      }),
      enumEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.enumEva),
      enumRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.enumRequiredEva, {
        validators: [Validators.required],
      }),
      uuidEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.uuidEva),
      uuidRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.uuidRequiredEva, {
        validators: [Validators.required],
      }),
      byteImageEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteImageEva),
      byteImageEvaContentType: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteImageEvaContentType),
      byteImageRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteImageRequiredEva, {
        validators: [Validators.required],
      }),
      byteImageRequiredEvaContentType: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteImageRequiredEvaContentType),
      byteImageMinbytesEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteImageMinbytesEva),
      byteImageMinbytesEvaContentType: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteImageMinbytesEvaContentType),
      byteImageMaxbytesEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteImageMaxbytesEva),
      byteImageMaxbytesEvaContentType: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteImageMaxbytesEvaContentType),
      byteAnyEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteAnyEva),
      byteAnyEvaContentType: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteAnyEvaContentType),
      byteAnyRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteAnyRequiredEva, {
        validators: [Validators.required],
      }),
      byteAnyRequiredEvaContentType: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteAnyRequiredEvaContentType),
      byteAnyMinbytesEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteAnyMinbytesEva),
      byteAnyMinbytesEvaContentType: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteAnyMinbytesEvaContentType),
      byteAnyMaxbytesEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteAnyMaxbytesEva),
      byteAnyMaxbytesEvaContentType: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteAnyMaxbytesEvaContentType),
      byteTextEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteTextEva),
      byteTextRequiredEva: new FormControl(fieldTestMapstructAndServiceClassEntityRawValue.byteTextRequiredEva, {
        validators: [Validators.required],
      }),
    });
  }

  getFieldTestMapstructAndServiceClassEntity(
    form: FieldTestMapstructAndServiceClassEntityFormGroup
  ): IFieldTestMapstructAndServiceClassEntity | NewFieldTestMapstructAndServiceClassEntity {
    return this.convertFieldTestMapstructAndServiceClassEntityRawValueToFieldTestMapstructAndServiceClassEntity(
      form.getRawValue() as FieldTestMapstructAndServiceClassEntityFormRawValue | NewFieldTestMapstructAndServiceClassEntityFormRawValue
    );
  }

  resetForm(
    form: FieldTestMapstructAndServiceClassEntityFormGroup,
    fieldTestMapstructAndServiceClassEntity: FieldTestMapstructAndServiceClassEntityFormGroupInput
  ): void {
    const fieldTestMapstructAndServiceClassEntityRawValue =
      this.convertFieldTestMapstructAndServiceClassEntityToFieldTestMapstructAndServiceClassEntityRawValue({
        ...this.getFormDefaults(),
        ...fieldTestMapstructAndServiceClassEntity,
      });
    form.reset(
      {
        ...fieldTestMapstructAndServiceClassEntityRawValue,
        id: { value: fieldTestMapstructAndServiceClassEntityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FieldTestMapstructAndServiceClassEntityFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      instantEva: currentTime,
      instanteRequiredEva: currentTime,
      zonedDateTimeEva: currentTime,
      zonedDateTimeRequiredEva: currentTime,
      booleanEva: false,
      booleanRequiredEva: false,
    };
  }

  private convertFieldTestMapstructAndServiceClassEntityRawValueToFieldTestMapstructAndServiceClassEntity(
    rawFieldTestMapstructAndServiceClassEntity:
      | FieldTestMapstructAndServiceClassEntityFormRawValue
      | NewFieldTestMapstructAndServiceClassEntityFormRawValue
  ): IFieldTestMapstructAndServiceClassEntity | NewFieldTestMapstructAndServiceClassEntity {
    return {
      ...rawFieldTestMapstructAndServiceClassEntity,
      instantEva: dayjs(rawFieldTestMapstructAndServiceClassEntity.instantEva, DATE_TIME_FORMAT),
      instanteRequiredEva: dayjs(rawFieldTestMapstructAndServiceClassEntity.instanteRequiredEva, DATE_TIME_FORMAT),
      zonedDateTimeEva: dayjs(rawFieldTestMapstructAndServiceClassEntity.zonedDateTimeEva, DATE_TIME_FORMAT),
      zonedDateTimeRequiredEva: dayjs(rawFieldTestMapstructAndServiceClassEntity.zonedDateTimeRequiredEva, DATE_TIME_FORMAT),
    };
  }

  private convertFieldTestMapstructAndServiceClassEntityToFieldTestMapstructAndServiceClassEntityRawValue(
    fieldTestMapstructAndServiceClassEntity:
      | IFieldTestMapstructAndServiceClassEntity
      | (Partial<NewFieldTestMapstructAndServiceClassEntity> & FieldTestMapstructAndServiceClassEntityFormDefaults)
  ):
    | FieldTestMapstructAndServiceClassEntityFormRawValue
    | PartialWithRequiredKeyOf<NewFieldTestMapstructAndServiceClassEntityFormRawValue> {
    return {
      ...fieldTestMapstructAndServiceClassEntity,
      instantEva: fieldTestMapstructAndServiceClassEntity.instantEva
        ? fieldTestMapstructAndServiceClassEntity.instantEva.format(DATE_TIME_FORMAT)
        : undefined,
      instanteRequiredEva: fieldTestMapstructAndServiceClassEntity.instanteRequiredEva
        ? fieldTestMapstructAndServiceClassEntity.instanteRequiredEva.format(DATE_TIME_FORMAT)
        : undefined,
      zonedDateTimeEva: fieldTestMapstructAndServiceClassEntity.zonedDateTimeEva
        ? fieldTestMapstructAndServiceClassEntity.zonedDateTimeEva.format(DATE_TIME_FORMAT)
        : undefined,
      zonedDateTimeRequiredEva: fieldTestMapstructAndServiceClassEntity.zonedDateTimeRequiredEva
        ? fieldTestMapstructAndServiceClassEntity.zonedDateTimeRequiredEva.format(DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
