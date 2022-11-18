import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFieldTestEntity, NewFieldTestEntity } from '../field-test-entity.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFieldTestEntity for edit and NewFieldTestEntityFormGroupInput for create.
 */
type FieldTestEntityFormGroupInput = IFieldTestEntity | PartialWithRequiredKeyOf<NewFieldTestEntity>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFieldTestEntity | NewFieldTestEntity> = Omit<
  T,
  'instantTom' | 'instantRequiredTom' | 'zonedDateTimeTom' | 'zonedDateTimeRequiredTom'
> & {
  instantTom?: string | null;
  instantRequiredTom?: string | null;
  zonedDateTimeTom?: string | null;
  zonedDateTimeRequiredTom?: string | null;
};

type FieldTestEntityFormRawValue = FormValueOf<IFieldTestEntity>;

type NewFieldTestEntityFormRawValue = FormValueOf<NewFieldTestEntity>;

type FieldTestEntityFormDefaults = Pick<
  NewFieldTestEntity,
  'id' | 'instantTom' | 'instantRequiredTom' | 'zonedDateTimeTom' | 'zonedDateTimeRequiredTom' | 'booleanTom' | 'booleanRequiredTom'
>;

type FieldTestEntityFormGroupContent = {
  id: FormControl<FieldTestEntityFormRawValue['id'] | NewFieldTestEntity['id']>;
  stringTom: FormControl<FieldTestEntityFormRawValue['stringTom']>;
  stringRequiredTom: FormControl<FieldTestEntityFormRawValue['stringRequiredTom']>;
  stringMinlengthTom: FormControl<FieldTestEntityFormRawValue['stringMinlengthTom']>;
  stringMaxlengthTom: FormControl<FieldTestEntityFormRawValue['stringMaxlengthTom']>;
  stringPatternTom: FormControl<FieldTestEntityFormRawValue['stringPatternTom']>;
  numberPatternTom: FormControl<FieldTestEntityFormRawValue['numberPatternTom']>;
  numberPatternRequiredTom: FormControl<FieldTestEntityFormRawValue['numberPatternRequiredTom']>;
  integerTom: FormControl<FieldTestEntityFormRawValue['integerTom']>;
  integerRequiredTom: FormControl<FieldTestEntityFormRawValue['integerRequiredTom']>;
  integerMinTom: FormControl<FieldTestEntityFormRawValue['integerMinTom']>;
  integerMaxTom: FormControl<FieldTestEntityFormRawValue['integerMaxTom']>;
  longTom: FormControl<FieldTestEntityFormRawValue['longTom']>;
  longRequiredTom: FormControl<FieldTestEntityFormRawValue['longRequiredTom']>;
  longMinTom: FormControl<FieldTestEntityFormRawValue['longMinTom']>;
  longMaxTom: FormControl<FieldTestEntityFormRawValue['longMaxTom']>;
  floatTom: FormControl<FieldTestEntityFormRawValue['floatTom']>;
  floatRequiredTom: FormControl<FieldTestEntityFormRawValue['floatRequiredTom']>;
  floatMinTom: FormControl<FieldTestEntityFormRawValue['floatMinTom']>;
  floatMaxTom: FormControl<FieldTestEntityFormRawValue['floatMaxTom']>;
  doubleRequiredTom: FormControl<FieldTestEntityFormRawValue['doubleRequiredTom']>;
  doubleMinTom: FormControl<FieldTestEntityFormRawValue['doubleMinTom']>;
  doubleMaxTom: FormControl<FieldTestEntityFormRawValue['doubleMaxTom']>;
  bigDecimalRequiredTom: FormControl<FieldTestEntityFormRawValue['bigDecimalRequiredTom']>;
  bigDecimalMinTom: FormControl<FieldTestEntityFormRawValue['bigDecimalMinTom']>;
  bigDecimalMaxTom: FormControl<FieldTestEntityFormRawValue['bigDecimalMaxTom']>;
  localDateTom: FormControl<FieldTestEntityFormRawValue['localDateTom']>;
  localDateRequiredTom: FormControl<FieldTestEntityFormRawValue['localDateRequiredTom']>;
  instantTom: FormControl<FieldTestEntityFormRawValue['instantTom']>;
  instantRequiredTom: FormControl<FieldTestEntityFormRawValue['instantRequiredTom']>;
  zonedDateTimeTom: FormControl<FieldTestEntityFormRawValue['zonedDateTimeTom']>;
  zonedDateTimeRequiredTom: FormControl<FieldTestEntityFormRawValue['zonedDateTimeRequiredTom']>;
  durationTom: FormControl<FieldTestEntityFormRawValue['durationTom']>;
  durationRequiredTom: FormControl<FieldTestEntityFormRawValue['durationRequiredTom']>;
  booleanTom: FormControl<FieldTestEntityFormRawValue['booleanTom']>;
  booleanRequiredTom: FormControl<FieldTestEntityFormRawValue['booleanRequiredTom']>;
  enumTom: FormControl<FieldTestEntityFormRawValue['enumTom']>;
  enumRequiredTom: FormControl<FieldTestEntityFormRawValue['enumRequiredTom']>;
  uuidTom: FormControl<FieldTestEntityFormRawValue['uuidTom']>;
  uuidRequiredTom: FormControl<FieldTestEntityFormRawValue['uuidRequiredTom']>;
  byteImageTom: FormControl<FieldTestEntityFormRawValue['byteImageTom']>;
  byteImageTomContentType: FormControl<FieldTestEntityFormRawValue['byteImageTomContentType']>;
  byteImageRequiredTom: FormControl<FieldTestEntityFormRawValue['byteImageRequiredTom']>;
  byteImageRequiredTomContentType: FormControl<FieldTestEntityFormRawValue['byteImageRequiredTomContentType']>;
  byteImageMinbytesTom: FormControl<FieldTestEntityFormRawValue['byteImageMinbytesTom']>;
  byteImageMinbytesTomContentType: FormControl<FieldTestEntityFormRawValue['byteImageMinbytesTomContentType']>;
  byteImageMaxbytesTom: FormControl<FieldTestEntityFormRawValue['byteImageMaxbytesTom']>;
  byteImageMaxbytesTomContentType: FormControl<FieldTestEntityFormRawValue['byteImageMaxbytesTomContentType']>;
  byteAnyTom: FormControl<FieldTestEntityFormRawValue['byteAnyTom']>;
  byteAnyTomContentType: FormControl<FieldTestEntityFormRawValue['byteAnyTomContentType']>;
  byteAnyRequiredTom: FormControl<FieldTestEntityFormRawValue['byteAnyRequiredTom']>;
  byteAnyRequiredTomContentType: FormControl<FieldTestEntityFormRawValue['byteAnyRequiredTomContentType']>;
  byteAnyMinbytesTom: FormControl<FieldTestEntityFormRawValue['byteAnyMinbytesTom']>;
  byteAnyMinbytesTomContentType: FormControl<FieldTestEntityFormRawValue['byteAnyMinbytesTomContentType']>;
  byteAnyMaxbytesTom: FormControl<FieldTestEntityFormRawValue['byteAnyMaxbytesTom']>;
  byteAnyMaxbytesTomContentType: FormControl<FieldTestEntityFormRawValue['byteAnyMaxbytesTomContentType']>;
  byteTextTom: FormControl<FieldTestEntityFormRawValue['byteTextTom']>;
  byteTextRequiredTom: FormControl<FieldTestEntityFormRawValue['byteTextRequiredTom']>;
};

export type FieldTestEntityFormGroup = FormGroup<FieldTestEntityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FieldTestEntityFormService {
  createFieldTestEntityFormGroup(fieldTestEntity: FieldTestEntityFormGroupInput = { id: null }): FieldTestEntityFormGroup {
    const fieldTestEntityRawValue = this.convertFieldTestEntityToFieldTestEntityRawValue({
      ...this.getFormDefaults(),
      ...fieldTestEntity,
    });
    return new FormGroup<FieldTestEntityFormGroupContent>({
      id: new FormControl(
        { value: fieldTestEntityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      stringTom: new FormControl(fieldTestEntityRawValue.stringTom),
      stringRequiredTom: new FormControl(fieldTestEntityRawValue.stringRequiredTom, {
        validators: [Validators.required],
      }),
      stringMinlengthTom: new FormControl(fieldTestEntityRawValue.stringMinlengthTom, {
        validators: [Validators.minLength(0)],
      }),
      stringMaxlengthTom: new FormControl(fieldTestEntityRawValue.stringMaxlengthTom, {
        validators: [Validators.maxLength(20)],
      }),
      stringPatternTom: new FormControl(fieldTestEntityRawValue.stringPatternTom, {
        validators: [Validators.pattern('^[a-zA-Z0-9]*$')],
      }),
      numberPatternTom: new FormControl(fieldTestEntityRawValue.numberPatternTom, {
        validators: [Validators.pattern('^\\d+$')],
      }),
      numberPatternRequiredTom: new FormControl(fieldTestEntityRawValue.numberPatternRequiredTom, {
        validators: [Validators.required, Validators.pattern('^\\d+$')],
      }),
      integerTom: new FormControl(fieldTestEntityRawValue.integerTom),
      integerRequiredTom: new FormControl(fieldTestEntityRawValue.integerRequiredTom, {
        validators: [Validators.required],
      }),
      integerMinTom: new FormControl(fieldTestEntityRawValue.integerMinTom, {
        validators: [Validators.min(0)],
      }),
      integerMaxTom: new FormControl(fieldTestEntityRawValue.integerMaxTom, {
        validators: [Validators.max(100)],
      }),
      longTom: new FormControl(fieldTestEntityRawValue.longTom),
      longRequiredTom: new FormControl(fieldTestEntityRawValue.longRequiredTom, {
        validators: [Validators.required],
      }),
      longMinTom: new FormControl(fieldTestEntityRawValue.longMinTom, {
        validators: [Validators.min(0)],
      }),
      longMaxTom: new FormControl(fieldTestEntityRawValue.longMaxTom, {
        validators: [Validators.max(100)],
      }),
      floatTom: new FormControl(fieldTestEntityRawValue.floatTom),
      floatRequiredTom: new FormControl(fieldTestEntityRawValue.floatRequiredTom, {
        validators: [Validators.required],
      }),
      floatMinTom: new FormControl(fieldTestEntityRawValue.floatMinTom, {
        validators: [Validators.min(0)],
      }),
      floatMaxTom: new FormControl(fieldTestEntityRawValue.floatMaxTom, {
        validators: [Validators.max(100)],
      }),
      doubleRequiredTom: new FormControl(fieldTestEntityRawValue.doubleRequiredTom, {
        validators: [Validators.required],
      }),
      doubleMinTom: new FormControl(fieldTestEntityRawValue.doubleMinTom, {
        validators: [Validators.min(0)],
      }),
      doubleMaxTom: new FormControl(fieldTestEntityRawValue.doubleMaxTom, {
        validators: [Validators.max(100)],
      }),
      bigDecimalRequiredTom: new FormControl(fieldTestEntityRawValue.bigDecimalRequiredTom, {
        validators: [Validators.required],
      }),
      bigDecimalMinTom: new FormControl(fieldTestEntityRawValue.bigDecimalMinTom, {
        validators: [Validators.min(0)],
      }),
      bigDecimalMaxTom: new FormControl(fieldTestEntityRawValue.bigDecimalMaxTom, {
        validators: [Validators.max(100)],
      }),
      localDateTom: new FormControl(fieldTestEntityRawValue.localDateTom),
      localDateRequiredTom: new FormControl(fieldTestEntityRawValue.localDateRequiredTom, {
        validators: [Validators.required],
      }),
      instantTom: new FormControl(fieldTestEntityRawValue.instantTom),
      instantRequiredTom: new FormControl(fieldTestEntityRawValue.instantRequiredTom, {
        validators: [Validators.required],
      }),
      zonedDateTimeTom: new FormControl(fieldTestEntityRawValue.zonedDateTimeTom),
      zonedDateTimeRequiredTom: new FormControl(fieldTestEntityRawValue.zonedDateTimeRequiredTom, {
        validators: [Validators.required],
      }),
      durationTom: new FormControl(fieldTestEntityRawValue.durationTom),
      durationRequiredTom: new FormControl(fieldTestEntityRawValue.durationRequiredTom, {
        validators: [Validators.required],
      }),
      booleanTom: new FormControl(fieldTestEntityRawValue.booleanTom),
      booleanRequiredTom: new FormControl(fieldTestEntityRawValue.booleanRequiredTom, {
        validators: [Validators.required],
      }),
      enumTom: new FormControl(fieldTestEntityRawValue.enumTom),
      enumRequiredTom: new FormControl(fieldTestEntityRawValue.enumRequiredTom, {
        validators: [Validators.required],
      }),
      uuidTom: new FormControl(fieldTestEntityRawValue.uuidTom),
      uuidRequiredTom: new FormControl(fieldTestEntityRawValue.uuidRequiredTom, {
        validators: [Validators.required],
      }),
      byteImageTom: new FormControl(fieldTestEntityRawValue.byteImageTom),
      byteImageTomContentType: new FormControl(fieldTestEntityRawValue.byteImageTomContentType),
      byteImageRequiredTom: new FormControl(fieldTestEntityRawValue.byteImageRequiredTom, {
        validators: [Validators.required],
      }),
      byteImageRequiredTomContentType: new FormControl(fieldTestEntityRawValue.byteImageRequiredTomContentType),
      byteImageMinbytesTom: new FormControl(fieldTestEntityRawValue.byteImageMinbytesTom),
      byteImageMinbytesTomContentType: new FormControl(fieldTestEntityRawValue.byteImageMinbytesTomContentType),
      byteImageMaxbytesTom: new FormControl(fieldTestEntityRawValue.byteImageMaxbytesTom),
      byteImageMaxbytesTomContentType: new FormControl(fieldTestEntityRawValue.byteImageMaxbytesTomContentType),
      byteAnyTom: new FormControl(fieldTestEntityRawValue.byteAnyTom),
      byteAnyTomContentType: new FormControl(fieldTestEntityRawValue.byteAnyTomContentType),
      byteAnyRequiredTom: new FormControl(fieldTestEntityRawValue.byteAnyRequiredTom, {
        validators: [Validators.required],
      }),
      byteAnyRequiredTomContentType: new FormControl(fieldTestEntityRawValue.byteAnyRequiredTomContentType),
      byteAnyMinbytesTom: new FormControl(fieldTestEntityRawValue.byteAnyMinbytesTom),
      byteAnyMinbytesTomContentType: new FormControl(fieldTestEntityRawValue.byteAnyMinbytesTomContentType),
      byteAnyMaxbytesTom: new FormControl(fieldTestEntityRawValue.byteAnyMaxbytesTom),
      byteAnyMaxbytesTomContentType: new FormControl(fieldTestEntityRawValue.byteAnyMaxbytesTomContentType),
      byteTextTom: new FormControl(fieldTestEntityRawValue.byteTextTom),
      byteTextRequiredTom: new FormControl(fieldTestEntityRawValue.byteTextRequiredTom, {
        validators: [Validators.required],
      }),
    });
  }

  getFieldTestEntity(form: FieldTestEntityFormGroup): IFieldTestEntity | NewFieldTestEntity {
    return this.convertFieldTestEntityRawValueToFieldTestEntity(
      form.getRawValue() as FieldTestEntityFormRawValue | NewFieldTestEntityFormRawValue
    );
  }

  resetForm(form: FieldTestEntityFormGroup, fieldTestEntity: FieldTestEntityFormGroupInput): void {
    const fieldTestEntityRawValue = this.convertFieldTestEntityToFieldTestEntityRawValue({ ...this.getFormDefaults(), ...fieldTestEntity });
    form.reset(
      {
        ...fieldTestEntityRawValue,
        id: { value: fieldTestEntityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FieldTestEntityFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      instantTom: currentTime,
      instantRequiredTom: currentTime,
      zonedDateTimeTom: currentTime,
      zonedDateTimeRequiredTom: currentTime,
      booleanTom: false,
      booleanRequiredTom: false,
    };
  }

  private convertFieldTestEntityRawValueToFieldTestEntity(
    rawFieldTestEntity: FieldTestEntityFormRawValue | NewFieldTestEntityFormRawValue
  ): IFieldTestEntity | NewFieldTestEntity {
    return {
      ...rawFieldTestEntity,
      instantTom: dayjs(rawFieldTestEntity.instantTom, DATE_TIME_FORMAT),
      instantRequiredTom: dayjs(rawFieldTestEntity.instantRequiredTom, DATE_TIME_FORMAT),
      zonedDateTimeTom: dayjs(rawFieldTestEntity.zonedDateTimeTom, DATE_TIME_FORMAT),
      zonedDateTimeRequiredTom: dayjs(rawFieldTestEntity.zonedDateTimeRequiredTom, DATE_TIME_FORMAT),
    };
  }

  private convertFieldTestEntityToFieldTestEntityRawValue(
    fieldTestEntity: IFieldTestEntity | (Partial<NewFieldTestEntity> & FieldTestEntityFormDefaults)
  ): FieldTestEntityFormRawValue | PartialWithRequiredKeyOf<NewFieldTestEntityFormRawValue> {
    return {
      ...fieldTestEntity,
      instantTom: fieldTestEntity.instantTom ? fieldTestEntity.instantTom.format(DATE_TIME_FORMAT) : undefined,
      instantRequiredTom: fieldTestEntity.instantRequiredTom ? fieldTestEntity.instantRequiredTom.format(DATE_TIME_FORMAT) : undefined,
      zonedDateTimeTom: fieldTestEntity.zonedDateTimeTom ? fieldTestEntity.zonedDateTimeTom.format(DATE_TIME_FORMAT) : undefined,
      zonedDateTimeRequiredTom: fieldTestEntity.zonedDateTimeRequiredTom
        ? fieldTestEntity.zonedDateTimeRequiredTom.format(DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
