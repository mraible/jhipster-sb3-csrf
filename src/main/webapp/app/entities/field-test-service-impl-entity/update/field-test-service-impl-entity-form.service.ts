import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFieldTestServiceImplEntity, NewFieldTestServiceImplEntity } from '../field-test-service-impl-entity.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFieldTestServiceImplEntity for edit and NewFieldTestServiceImplEntityFormGroupInput for create.
 */
type FieldTestServiceImplEntityFormGroupInput = IFieldTestServiceImplEntity | PartialWithRequiredKeyOf<NewFieldTestServiceImplEntity>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFieldTestServiceImplEntity | NewFieldTestServiceImplEntity> = Omit<
  T,
  'instantMika' | 'instanteRequiredMika' | 'zonedDateTimeMika' | 'zonedDateTimeRequiredMika'
> & {
  instantMika?: string | null;
  instanteRequiredMika?: string | null;
  zonedDateTimeMika?: string | null;
  zonedDateTimeRequiredMika?: string | null;
};

type FieldTestServiceImplEntityFormRawValue = FormValueOf<IFieldTestServiceImplEntity>;

type NewFieldTestServiceImplEntityFormRawValue = FormValueOf<NewFieldTestServiceImplEntity>;

type FieldTestServiceImplEntityFormDefaults = Pick<
  NewFieldTestServiceImplEntity,
  'id' | 'instantMika' | 'instanteRequiredMika' | 'zonedDateTimeMika' | 'zonedDateTimeRequiredMika' | 'booleanMika' | 'booleanRequiredMika'
>;

type FieldTestServiceImplEntityFormGroupContent = {
  id: FormControl<FieldTestServiceImplEntityFormRawValue['id'] | NewFieldTestServiceImplEntity['id']>;
  stringMika: FormControl<FieldTestServiceImplEntityFormRawValue['stringMika']>;
  stringRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['stringRequiredMika']>;
  stringMinlengthMika: FormControl<FieldTestServiceImplEntityFormRawValue['stringMinlengthMika']>;
  stringMaxlengthMika: FormControl<FieldTestServiceImplEntityFormRawValue['stringMaxlengthMika']>;
  stringPatternMika: FormControl<FieldTestServiceImplEntityFormRawValue['stringPatternMika']>;
  integerMika: FormControl<FieldTestServiceImplEntityFormRawValue['integerMika']>;
  integerRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['integerRequiredMika']>;
  integerMinMika: FormControl<FieldTestServiceImplEntityFormRawValue['integerMinMika']>;
  integerMaxMika: FormControl<FieldTestServiceImplEntityFormRawValue['integerMaxMika']>;
  longMika: FormControl<FieldTestServiceImplEntityFormRawValue['longMika']>;
  longRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['longRequiredMika']>;
  longMinMika: FormControl<FieldTestServiceImplEntityFormRawValue['longMinMika']>;
  longMaxMika: FormControl<FieldTestServiceImplEntityFormRawValue['longMaxMika']>;
  floatMika: FormControl<FieldTestServiceImplEntityFormRawValue['floatMika']>;
  floatRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['floatRequiredMika']>;
  floatMinMika: FormControl<FieldTestServiceImplEntityFormRawValue['floatMinMika']>;
  floatMaxMika: FormControl<FieldTestServiceImplEntityFormRawValue['floatMaxMika']>;
  doubleRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['doubleRequiredMika']>;
  doubleMinMika: FormControl<FieldTestServiceImplEntityFormRawValue['doubleMinMika']>;
  doubleMaxMika: FormControl<FieldTestServiceImplEntityFormRawValue['doubleMaxMika']>;
  bigDecimalRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['bigDecimalRequiredMika']>;
  bigDecimalMinMika: FormControl<FieldTestServiceImplEntityFormRawValue['bigDecimalMinMika']>;
  bigDecimalMaxMika: FormControl<FieldTestServiceImplEntityFormRawValue['bigDecimalMaxMika']>;
  localDateMika: FormControl<FieldTestServiceImplEntityFormRawValue['localDateMika']>;
  localDateRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['localDateRequiredMika']>;
  instantMika: FormControl<FieldTestServiceImplEntityFormRawValue['instantMika']>;
  instanteRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['instanteRequiredMika']>;
  zonedDateTimeMika: FormControl<FieldTestServiceImplEntityFormRawValue['zonedDateTimeMika']>;
  zonedDateTimeRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['zonedDateTimeRequiredMika']>;
  durationMika: FormControl<FieldTestServiceImplEntityFormRawValue['durationMika']>;
  durationRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['durationRequiredMika']>;
  booleanMika: FormControl<FieldTestServiceImplEntityFormRawValue['booleanMika']>;
  booleanRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['booleanRequiredMika']>;
  enumMika: FormControl<FieldTestServiceImplEntityFormRawValue['enumMika']>;
  enumRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['enumRequiredMika']>;
  uuidMika: FormControl<FieldTestServiceImplEntityFormRawValue['uuidMika']>;
  uuidRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['uuidRequiredMika']>;
  byteImageMika: FormControl<FieldTestServiceImplEntityFormRawValue['byteImageMika']>;
  byteImageMikaContentType: FormControl<FieldTestServiceImplEntityFormRawValue['byteImageMikaContentType']>;
  byteImageRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['byteImageRequiredMika']>;
  byteImageRequiredMikaContentType: FormControl<FieldTestServiceImplEntityFormRawValue['byteImageRequiredMikaContentType']>;
  byteImageMinbytesMika: FormControl<FieldTestServiceImplEntityFormRawValue['byteImageMinbytesMika']>;
  byteImageMinbytesMikaContentType: FormControl<FieldTestServiceImplEntityFormRawValue['byteImageMinbytesMikaContentType']>;
  byteImageMaxbytesMika: FormControl<FieldTestServiceImplEntityFormRawValue['byteImageMaxbytesMika']>;
  byteImageMaxbytesMikaContentType: FormControl<FieldTestServiceImplEntityFormRawValue['byteImageMaxbytesMikaContentType']>;
  byteAnyMika: FormControl<FieldTestServiceImplEntityFormRawValue['byteAnyMika']>;
  byteAnyMikaContentType: FormControl<FieldTestServiceImplEntityFormRawValue['byteAnyMikaContentType']>;
  byteAnyRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['byteAnyRequiredMika']>;
  byteAnyRequiredMikaContentType: FormControl<FieldTestServiceImplEntityFormRawValue['byteAnyRequiredMikaContentType']>;
  byteAnyMinbytesMika: FormControl<FieldTestServiceImplEntityFormRawValue['byteAnyMinbytesMika']>;
  byteAnyMinbytesMikaContentType: FormControl<FieldTestServiceImplEntityFormRawValue['byteAnyMinbytesMikaContentType']>;
  byteAnyMaxbytesMika: FormControl<FieldTestServiceImplEntityFormRawValue['byteAnyMaxbytesMika']>;
  byteAnyMaxbytesMikaContentType: FormControl<FieldTestServiceImplEntityFormRawValue['byteAnyMaxbytesMikaContentType']>;
  byteTextMika: FormControl<FieldTestServiceImplEntityFormRawValue['byteTextMika']>;
  byteTextRequiredMika: FormControl<FieldTestServiceImplEntityFormRawValue['byteTextRequiredMika']>;
};

export type FieldTestServiceImplEntityFormGroup = FormGroup<FieldTestServiceImplEntityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FieldTestServiceImplEntityFormService {
  createFieldTestServiceImplEntityFormGroup(
    fieldTestServiceImplEntity: FieldTestServiceImplEntityFormGroupInput = { id: null }
  ): FieldTestServiceImplEntityFormGroup {
    const fieldTestServiceImplEntityRawValue = this.convertFieldTestServiceImplEntityToFieldTestServiceImplEntityRawValue({
      ...this.getFormDefaults(),
      ...fieldTestServiceImplEntity,
    });
    return new FormGroup<FieldTestServiceImplEntityFormGroupContent>({
      id: new FormControl(
        { value: fieldTestServiceImplEntityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      stringMika: new FormControl(fieldTestServiceImplEntityRawValue.stringMika),
      stringRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.stringRequiredMika, {
        validators: [Validators.required],
      }),
      stringMinlengthMika: new FormControl(fieldTestServiceImplEntityRawValue.stringMinlengthMika, {
        validators: [Validators.minLength(0)],
      }),
      stringMaxlengthMika: new FormControl(fieldTestServiceImplEntityRawValue.stringMaxlengthMika, {
        validators: [Validators.maxLength(20)],
      }),
      stringPatternMika: new FormControl(fieldTestServiceImplEntityRawValue.stringPatternMika, {
        validators: [Validators.pattern('^[a-zA-Z0-9]*$')],
      }),
      integerMika: new FormControl(fieldTestServiceImplEntityRawValue.integerMika),
      integerRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.integerRequiredMika, {
        validators: [Validators.required],
      }),
      integerMinMika: new FormControl(fieldTestServiceImplEntityRawValue.integerMinMika, {
        validators: [Validators.min(0)],
      }),
      integerMaxMika: new FormControl(fieldTestServiceImplEntityRawValue.integerMaxMika, {
        validators: [Validators.max(100)],
      }),
      longMika: new FormControl(fieldTestServiceImplEntityRawValue.longMika),
      longRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.longRequiredMika, {
        validators: [Validators.required],
      }),
      longMinMika: new FormControl(fieldTestServiceImplEntityRawValue.longMinMika, {
        validators: [Validators.min(0)],
      }),
      longMaxMika: new FormControl(fieldTestServiceImplEntityRawValue.longMaxMika, {
        validators: [Validators.max(100)],
      }),
      floatMika: new FormControl(fieldTestServiceImplEntityRawValue.floatMika),
      floatRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.floatRequiredMika, {
        validators: [Validators.required],
      }),
      floatMinMika: new FormControl(fieldTestServiceImplEntityRawValue.floatMinMika, {
        validators: [Validators.min(0)],
      }),
      floatMaxMika: new FormControl(fieldTestServiceImplEntityRawValue.floatMaxMika, {
        validators: [Validators.max(100)],
      }),
      doubleRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.doubleRequiredMika, {
        validators: [Validators.required],
      }),
      doubleMinMika: new FormControl(fieldTestServiceImplEntityRawValue.doubleMinMika, {
        validators: [Validators.min(0)],
      }),
      doubleMaxMika: new FormControl(fieldTestServiceImplEntityRawValue.doubleMaxMika, {
        validators: [Validators.max(100)],
      }),
      bigDecimalRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.bigDecimalRequiredMika, {
        validators: [Validators.required],
      }),
      bigDecimalMinMika: new FormControl(fieldTestServiceImplEntityRawValue.bigDecimalMinMika, {
        validators: [Validators.min(0)],
      }),
      bigDecimalMaxMika: new FormControl(fieldTestServiceImplEntityRawValue.bigDecimalMaxMika, {
        validators: [Validators.max(100)],
      }),
      localDateMika: new FormControl(fieldTestServiceImplEntityRawValue.localDateMika),
      localDateRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.localDateRequiredMika, {
        validators: [Validators.required],
      }),
      instantMika: new FormControl(fieldTestServiceImplEntityRawValue.instantMika),
      instanteRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.instanteRequiredMika, {
        validators: [Validators.required],
      }),
      zonedDateTimeMika: new FormControl(fieldTestServiceImplEntityRawValue.zonedDateTimeMika),
      zonedDateTimeRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.zonedDateTimeRequiredMika, {
        validators: [Validators.required],
      }),
      durationMika: new FormControl(fieldTestServiceImplEntityRawValue.durationMika),
      durationRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.durationRequiredMika, {
        validators: [Validators.required],
      }),
      booleanMika: new FormControl(fieldTestServiceImplEntityRawValue.booleanMika),
      booleanRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.booleanRequiredMika, {
        validators: [Validators.required],
      }),
      enumMika: new FormControl(fieldTestServiceImplEntityRawValue.enumMika),
      enumRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.enumRequiredMika, {
        validators: [Validators.required],
      }),
      uuidMika: new FormControl(fieldTestServiceImplEntityRawValue.uuidMika),
      uuidRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.uuidRequiredMika, {
        validators: [Validators.required],
      }),
      byteImageMika: new FormControl(fieldTestServiceImplEntityRawValue.byteImageMika),
      byteImageMikaContentType: new FormControl(fieldTestServiceImplEntityRawValue.byteImageMikaContentType),
      byteImageRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.byteImageRequiredMika, {
        validators: [Validators.required],
      }),
      byteImageRequiredMikaContentType: new FormControl(fieldTestServiceImplEntityRawValue.byteImageRequiredMikaContentType),
      byteImageMinbytesMika: new FormControl(fieldTestServiceImplEntityRawValue.byteImageMinbytesMika),
      byteImageMinbytesMikaContentType: new FormControl(fieldTestServiceImplEntityRawValue.byteImageMinbytesMikaContentType),
      byteImageMaxbytesMika: new FormControl(fieldTestServiceImplEntityRawValue.byteImageMaxbytesMika),
      byteImageMaxbytesMikaContentType: new FormControl(fieldTestServiceImplEntityRawValue.byteImageMaxbytesMikaContentType),
      byteAnyMika: new FormControl(fieldTestServiceImplEntityRawValue.byteAnyMika),
      byteAnyMikaContentType: new FormControl(fieldTestServiceImplEntityRawValue.byteAnyMikaContentType),
      byteAnyRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.byteAnyRequiredMika, {
        validators: [Validators.required],
      }),
      byteAnyRequiredMikaContentType: new FormControl(fieldTestServiceImplEntityRawValue.byteAnyRequiredMikaContentType),
      byteAnyMinbytesMika: new FormControl(fieldTestServiceImplEntityRawValue.byteAnyMinbytesMika),
      byteAnyMinbytesMikaContentType: new FormControl(fieldTestServiceImplEntityRawValue.byteAnyMinbytesMikaContentType),
      byteAnyMaxbytesMika: new FormControl(fieldTestServiceImplEntityRawValue.byteAnyMaxbytesMika),
      byteAnyMaxbytesMikaContentType: new FormControl(fieldTestServiceImplEntityRawValue.byteAnyMaxbytesMikaContentType),
      byteTextMika: new FormControl(fieldTestServiceImplEntityRawValue.byteTextMika),
      byteTextRequiredMika: new FormControl(fieldTestServiceImplEntityRawValue.byteTextRequiredMika, {
        validators: [Validators.required],
      }),
    });
  }

  getFieldTestServiceImplEntity(form: FieldTestServiceImplEntityFormGroup): IFieldTestServiceImplEntity | NewFieldTestServiceImplEntity {
    return this.convertFieldTestServiceImplEntityRawValueToFieldTestServiceImplEntity(
      form.getRawValue() as FieldTestServiceImplEntityFormRawValue | NewFieldTestServiceImplEntityFormRawValue
    );
  }

  resetForm(form: FieldTestServiceImplEntityFormGroup, fieldTestServiceImplEntity: FieldTestServiceImplEntityFormGroupInput): void {
    const fieldTestServiceImplEntityRawValue = this.convertFieldTestServiceImplEntityToFieldTestServiceImplEntityRawValue({
      ...this.getFormDefaults(),
      ...fieldTestServiceImplEntity,
    });
    form.reset(
      {
        ...fieldTestServiceImplEntityRawValue,
        id: { value: fieldTestServiceImplEntityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FieldTestServiceImplEntityFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      instantMika: currentTime,
      instanteRequiredMika: currentTime,
      zonedDateTimeMika: currentTime,
      zonedDateTimeRequiredMika: currentTime,
      booleanMika: false,
      booleanRequiredMika: false,
    };
  }

  private convertFieldTestServiceImplEntityRawValueToFieldTestServiceImplEntity(
    rawFieldTestServiceImplEntity: FieldTestServiceImplEntityFormRawValue | NewFieldTestServiceImplEntityFormRawValue
  ): IFieldTestServiceImplEntity | NewFieldTestServiceImplEntity {
    return {
      ...rawFieldTestServiceImplEntity,
      instantMika: dayjs(rawFieldTestServiceImplEntity.instantMika, DATE_TIME_FORMAT),
      instanteRequiredMika: dayjs(rawFieldTestServiceImplEntity.instanteRequiredMika, DATE_TIME_FORMAT),
      zonedDateTimeMika: dayjs(rawFieldTestServiceImplEntity.zonedDateTimeMika, DATE_TIME_FORMAT),
      zonedDateTimeRequiredMika: dayjs(rawFieldTestServiceImplEntity.zonedDateTimeRequiredMika, DATE_TIME_FORMAT),
    };
  }

  private convertFieldTestServiceImplEntityToFieldTestServiceImplEntityRawValue(
    fieldTestServiceImplEntity:
      | IFieldTestServiceImplEntity
      | (Partial<NewFieldTestServiceImplEntity> & FieldTestServiceImplEntityFormDefaults)
  ): FieldTestServiceImplEntityFormRawValue | PartialWithRequiredKeyOf<NewFieldTestServiceImplEntityFormRawValue> {
    return {
      ...fieldTestServiceImplEntity,
      instantMika: fieldTestServiceImplEntity.instantMika ? fieldTestServiceImplEntity.instantMika.format(DATE_TIME_FORMAT) : undefined,
      instanteRequiredMika: fieldTestServiceImplEntity.instanteRequiredMika
        ? fieldTestServiceImplEntity.instanteRequiredMika.format(DATE_TIME_FORMAT)
        : undefined,
      zonedDateTimeMika: fieldTestServiceImplEntity.zonedDateTimeMika
        ? fieldTestServiceImplEntity.zonedDateTimeMika.format(DATE_TIME_FORMAT)
        : undefined,
      zonedDateTimeRequiredMika: fieldTestServiceImplEntity.zonedDateTimeRequiredMika
        ? fieldTestServiceImplEntity.zonedDateTimeRequiredMika.format(DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
