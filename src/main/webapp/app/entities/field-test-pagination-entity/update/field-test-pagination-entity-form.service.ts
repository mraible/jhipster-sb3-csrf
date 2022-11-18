import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFieldTestPaginationEntity, NewFieldTestPaginationEntity } from '../field-test-pagination-entity.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFieldTestPaginationEntity for edit and NewFieldTestPaginationEntityFormGroupInput for create.
 */
type FieldTestPaginationEntityFormGroupInput = IFieldTestPaginationEntity | PartialWithRequiredKeyOf<NewFieldTestPaginationEntity>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFieldTestPaginationEntity | NewFieldTestPaginationEntity> = Omit<
  T,
  'instantAlice' | 'instanteRequiredAlice' | 'zonedDateTimeAlice' | 'zonedDateTimeRequiredAlice'
> & {
  instantAlice?: string | null;
  instanteRequiredAlice?: string | null;
  zonedDateTimeAlice?: string | null;
  zonedDateTimeRequiredAlice?: string | null;
};

type FieldTestPaginationEntityFormRawValue = FormValueOf<IFieldTestPaginationEntity>;

type NewFieldTestPaginationEntityFormRawValue = FormValueOf<NewFieldTestPaginationEntity>;

type FieldTestPaginationEntityFormDefaults = Pick<
  NewFieldTestPaginationEntity,
  | 'id'
  | 'instantAlice'
  | 'instanteRequiredAlice'
  | 'zonedDateTimeAlice'
  | 'zonedDateTimeRequiredAlice'
  | 'booleanAlice'
  | 'booleanRequiredAlice'
>;

type FieldTestPaginationEntityFormGroupContent = {
  id: FormControl<FieldTestPaginationEntityFormRawValue['id'] | NewFieldTestPaginationEntity['id']>;
  stringAlice: FormControl<FieldTestPaginationEntityFormRawValue['stringAlice']>;
  stringRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['stringRequiredAlice']>;
  stringMinlengthAlice: FormControl<FieldTestPaginationEntityFormRawValue['stringMinlengthAlice']>;
  stringMaxlengthAlice: FormControl<FieldTestPaginationEntityFormRawValue['stringMaxlengthAlice']>;
  stringPatternAlice: FormControl<FieldTestPaginationEntityFormRawValue['stringPatternAlice']>;
  integerAlice: FormControl<FieldTestPaginationEntityFormRawValue['integerAlice']>;
  integerRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['integerRequiredAlice']>;
  integerMinAlice: FormControl<FieldTestPaginationEntityFormRawValue['integerMinAlice']>;
  integerMaxAlice: FormControl<FieldTestPaginationEntityFormRawValue['integerMaxAlice']>;
  longAlice: FormControl<FieldTestPaginationEntityFormRawValue['longAlice']>;
  longRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['longRequiredAlice']>;
  longMinAlice: FormControl<FieldTestPaginationEntityFormRawValue['longMinAlice']>;
  longMaxAlice: FormControl<FieldTestPaginationEntityFormRawValue['longMaxAlice']>;
  floatAlice: FormControl<FieldTestPaginationEntityFormRawValue['floatAlice']>;
  floatRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['floatRequiredAlice']>;
  floatMinAlice: FormControl<FieldTestPaginationEntityFormRawValue['floatMinAlice']>;
  floatMaxAlice: FormControl<FieldTestPaginationEntityFormRawValue['floatMaxAlice']>;
  doubleRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['doubleRequiredAlice']>;
  doubleMinAlice: FormControl<FieldTestPaginationEntityFormRawValue['doubleMinAlice']>;
  doubleMaxAlice: FormControl<FieldTestPaginationEntityFormRawValue['doubleMaxAlice']>;
  bigDecimalRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['bigDecimalRequiredAlice']>;
  bigDecimalMinAlice: FormControl<FieldTestPaginationEntityFormRawValue['bigDecimalMinAlice']>;
  bigDecimalMaxAlice: FormControl<FieldTestPaginationEntityFormRawValue['bigDecimalMaxAlice']>;
  localDateAlice: FormControl<FieldTestPaginationEntityFormRawValue['localDateAlice']>;
  localDateRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['localDateRequiredAlice']>;
  instantAlice: FormControl<FieldTestPaginationEntityFormRawValue['instantAlice']>;
  instanteRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['instanteRequiredAlice']>;
  zonedDateTimeAlice: FormControl<FieldTestPaginationEntityFormRawValue['zonedDateTimeAlice']>;
  zonedDateTimeRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['zonedDateTimeRequiredAlice']>;
  durationAlice: FormControl<FieldTestPaginationEntityFormRawValue['durationAlice']>;
  durationRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['durationRequiredAlice']>;
  booleanAlice: FormControl<FieldTestPaginationEntityFormRawValue['booleanAlice']>;
  booleanRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['booleanRequiredAlice']>;
  enumAlice: FormControl<FieldTestPaginationEntityFormRawValue['enumAlice']>;
  enumRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['enumRequiredAlice']>;
  uuidAlice: FormControl<FieldTestPaginationEntityFormRawValue['uuidAlice']>;
  uuidRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['uuidRequiredAlice']>;
  byteImageAlice: FormControl<FieldTestPaginationEntityFormRawValue['byteImageAlice']>;
  byteImageAliceContentType: FormControl<FieldTestPaginationEntityFormRawValue['byteImageAliceContentType']>;
  byteImageRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['byteImageRequiredAlice']>;
  byteImageRequiredAliceContentType: FormControl<FieldTestPaginationEntityFormRawValue['byteImageRequiredAliceContentType']>;
  byteImageMinbytesAlice: FormControl<FieldTestPaginationEntityFormRawValue['byteImageMinbytesAlice']>;
  byteImageMinbytesAliceContentType: FormControl<FieldTestPaginationEntityFormRawValue['byteImageMinbytesAliceContentType']>;
  byteImageMaxbytesAlice: FormControl<FieldTestPaginationEntityFormRawValue['byteImageMaxbytesAlice']>;
  byteImageMaxbytesAliceContentType: FormControl<FieldTestPaginationEntityFormRawValue['byteImageMaxbytesAliceContentType']>;
  byteAnyAlice: FormControl<FieldTestPaginationEntityFormRawValue['byteAnyAlice']>;
  byteAnyAliceContentType: FormControl<FieldTestPaginationEntityFormRawValue['byteAnyAliceContentType']>;
  byteAnyRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['byteAnyRequiredAlice']>;
  byteAnyRequiredAliceContentType: FormControl<FieldTestPaginationEntityFormRawValue['byteAnyRequiredAliceContentType']>;
  byteAnyMinbytesAlice: FormControl<FieldTestPaginationEntityFormRawValue['byteAnyMinbytesAlice']>;
  byteAnyMinbytesAliceContentType: FormControl<FieldTestPaginationEntityFormRawValue['byteAnyMinbytesAliceContentType']>;
  byteAnyMaxbytesAlice: FormControl<FieldTestPaginationEntityFormRawValue['byteAnyMaxbytesAlice']>;
  byteAnyMaxbytesAliceContentType: FormControl<FieldTestPaginationEntityFormRawValue['byteAnyMaxbytesAliceContentType']>;
  byteTextAlice: FormControl<FieldTestPaginationEntityFormRawValue['byteTextAlice']>;
  byteTextRequiredAlice: FormControl<FieldTestPaginationEntityFormRawValue['byteTextRequiredAlice']>;
};

export type FieldTestPaginationEntityFormGroup = FormGroup<FieldTestPaginationEntityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FieldTestPaginationEntityFormService {
  createFieldTestPaginationEntityFormGroup(
    fieldTestPaginationEntity: FieldTestPaginationEntityFormGroupInput = { id: null }
  ): FieldTestPaginationEntityFormGroup {
    const fieldTestPaginationEntityRawValue = this.convertFieldTestPaginationEntityToFieldTestPaginationEntityRawValue({
      ...this.getFormDefaults(),
      ...fieldTestPaginationEntity,
    });
    return new FormGroup<FieldTestPaginationEntityFormGroupContent>({
      id: new FormControl(
        { value: fieldTestPaginationEntityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      stringAlice: new FormControl(fieldTestPaginationEntityRawValue.stringAlice),
      stringRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.stringRequiredAlice, {
        validators: [Validators.required],
      }),
      stringMinlengthAlice: new FormControl(fieldTestPaginationEntityRawValue.stringMinlengthAlice, {
        validators: [Validators.minLength(0)],
      }),
      stringMaxlengthAlice: new FormControl(fieldTestPaginationEntityRawValue.stringMaxlengthAlice, {
        validators: [Validators.maxLength(20)],
      }),
      stringPatternAlice: new FormControl(fieldTestPaginationEntityRawValue.stringPatternAlice, {
        validators: [Validators.pattern('^[a-zA-Z0-9]*$')],
      }),
      integerAlice: new FormControl(fieldTestPaginationEntityRawValue.integerAlice),
      integerRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.integerRequiredAlice, {
        validators: [Validators.required],
      }),
      integerMinAlice: new FormControl(fieldTestPaginationEntityRawValue.integerMinAlice, {
        validators: [Validators.min(0)],
      }),
      integerMaxAlice: new FormControl(fieldTestPaginationEntityRawValue.integerMaxAlice, {
        validators: [Validators.max(100)],
      }),
      longAlice: new FormControl(fieldTestPaginationEntityRawValue.longAlice),
      longRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.longRequiredAlice, {
        validators: [Validators.required],
      }),
      longMinAlice: new FormControl(fieldTestPaginationEntityRawValue.longMinAlice, {
        validators: [Validators.min(0)],
      }),
      longMaxAlice: new FormControl(fieldTestPaginationEntityRawValue.longMaxAlice, {
        validators: [Validators.max(100)],
      }),
      floatAlice: new FormControl(fieldTestPaginationEntityRawValue.floatAlice),
      floatRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.floatRequiredAlice, {
        validators: [Validators.required],
      }),
      floatMinAlice: new FormControl(fieldTestPaginationEntityRawValue.floatMinAlice, {
        validators: [Validators.min(0)],
      }),
      floatMaxAlice: new FormControl(fieldTestPaginationEntityRawValue.floatMaxAlice, {
        validators: [Validators.max(100)],
      }),
      doubleRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.doubleRequiredAlice, {
        validators: [Validators.required],
      }),
      doubleMinAlice: new FormControl(fieldTestPaginationEntityRawValue.doubleMinAlice, {
        validators: [Validators.min(0)],
      }),
      doubleMaxAlice: new FormControl(fieldTestPaginationEntityRawValue.doubleMaxAlice, {
        validators: [Validators.max(100)],
      }),
      bigDecimalRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.bigDecimalRequiredAlice, {
        validators: [Validators.required],
      }),
      bigDecimalMinAlice: new FormControl(fieldTestPaginationEntityRawValue.bigDecimalMinAlice, {
        validators: [Validators.min(0)],
      }),
      bigDecimalMaxAlice: new FormControl(fieldTestPaginationEntityRawValue.bigDecimalMaxAlice, {
        validators: [Validators.max(100)],
      }),
      localDateAlice: new FormControl(fieldTestPaginationEntityRawValue.localDateAlice),
      localDateRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.localDateRequiredAlice, {
        validators: [Validators.required],
      }),
      instantAlice: new FormControl(fieldTestPaginationEntityRawValue.instantAlice),
      instanteRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.instanteRequiredAlice, {
        validators: [Validators.required],
      }),
      zonedDateTimeAlice: new FormControl(fieldTestPaginationEntityRawValue.zonedDateTimeAlice),
      zonedDateTimeRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.zonedDateTimeRequiredAlice, {
        validators: [Validators.required],
      }),
      durationAlice: new FormControl(fieldTestPaginationEntityRawValue.durationAlice),
      durationRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.durationRequiredAlice, {
        validators: [Validators.required],
      }),
      booleanAlice: new FormControl(fieldTestPaginationEntityRawValue.booleanAlice),
      booleanRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.booleanRequiredAlice, {
        validators: [Validators.required],
      }),
      enumAlice: new FormControl(fieldTestPaginationEntityRawValue.enumAlice),
      enumRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.enumRequiredAlice, {
        validators: [Validators.required],
      }),
      uuidAlice: new FormControl(fieldTestPaginationEntityRawValue.uuidAlice),
      uuidRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.uuidRequiredAlice, {
        validators: [Validators.required],
      }),
      byteImageAlice: new FormControl(fieldTestPaginationEntityRawValue.byteImageAlice),
      byteImageAliceContentType: new FormControl(fieldTestPaginationEntityRawValue.byteImageAliceContentType),
      byteImageRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.byteImageRequiredAlice, {
        validators: [Validators.required],
      }),
      byteImageRequiredAliceContentType: new FormControl(fieldTestPaginationEntityRawValue.byteImageRequiredAliceContentType),
      byteImageMinbytesAlice: new FormControl(fieldTestPaginationEntityRawValue.byteImageMinbytesAlice),
      byteImageMinbytesAliceContentType: new FormControl(fieldTestPaginationEntityRawValue.byteImageMinbytesAliceContentType),
      byteImageMaxbytesAlice: new FormControl(fieldTestPaginationEntityRawValue.byteImageMaxbytesAlice),
      byteImageMaxbytesAliceContentType: new FormControl(fieldTestPaginationEntityRawValue.byteImageMaxbytesAliceContentType),
      byteAnyAlice: new FormControl(fieldTestPaginationEntityRawValue.byteAnyAlice),
      byteAnyAliceContentType: new FormControl(fieldTestPaginationEntityRawValue.byteAnyAliceContentType),
      byteAnyRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.byteAnyRequiredAlice, {
        validators: [Validators.required],
      }),
      byteAnyRequiredAliceContentType: new FormControl(fieldTestPaginationEntityRawValue.byteAnyRequiredAliceContentType),
      byteAnyMinbytesAlice: new FormControl(fieldTestPaginationEntityRawValue.byteAnyMinbytesAlice),
      byteAnyMinbytesAliceContentType: new FormControl(fieldTestPaginationEntityRawValue.byteAnyMinbytesAliceContentType),
      byteAnyMaxbytesAlice: new FormControl(fieldTestPaginationEntityRawValue.byteAnyMaxbytesAlice),
      byteAnyMaxbytesAliceContentType: new FormControl(fieldTestPaginationEntityRawValue.byteAnyMaxbytesAliceContentType),
      byteTextAlice: new FormControl(fieldTestPaginationEntityRawValue.byteTextAlice),
      byteTextRequiredAlice: new FormControl(fieldTestPaginationEntityRawValue.byteTextRequiredAlice, {
        validators: [Validators.required],
      }),
    });
  }

  getFieldTestPaginationEntity(form: FieldTestPaginationEntityFormGroup): IFieldTestPaginationEntity | NewFieldTestPaginationEntity {
    return this.convertFieldTestPaginationEntityRawValueToFieldTestPaginationEntity(
      form.getRawValue() as FieldTestPaginationEntityFormRawValue | NewFieldTestPaginationEntityFormRawValue
    );
  }

  resetForm(form: FieldTestPaginationEntityFormGroup, fieldTestPaginationEntity: FieldTestPaginationEntityFormGroupInput): void {
    const fieldTestPaginationEntityRawValue = this.convertFieldTestPaginationEntityToFieldTestPaginationEntityRawValue({
      ...this.getFormDefaults(),
      ...fieldTestPaginationEntity,
    });
    form.reset(
      {
        ...fieldTestPaginationEntityRawValue,
        id: { value: fieldTestPaginationEntityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FieldTestPaginationEntityFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      instantAlice: currentTime,
      instanteRequiredAlice: currentTime,
      zonedDateTimeAlice: currentTime,
      zonedDateTimeRequiredAlice: currentTime,
      booleanAlice: false,
      booleanRequiredAlice: false,
    };
  }

  private convertFieldTestPaginationEntityRawValueToFieldTestPaginationEntity(
    rawFieldTestPaginationEntity: FieldTestPaginationEntityFormRawValue | NewFieldTestPaginationEntityFormRawValue
  ): IFieldTestPaginationEntity | NewFieldTestPaginationEntity {
    return {
      ...rawFieldTestPaginationEntity,
      instantAlice: dayjs(rawFieldTestPaginationEntity.instantAlice, DATE_TIME_FORMAT),
      instanteRequiredAlice: dayjs(rawFieldTestPaginationEntity.instanteRequiredAlice, DATE_TIME_FORMAT),
      zonedDateTimeAlice: dayjs(rawFieldTestPaginationEntity.zonedDateTimeAlice, DATE_TIME_FORMAT),
      zonedDateTimeRequiredAlice: dayjs(rawFieldTestPaginationEntity.zonedDateTimeRequiredAlice, DATE_TIME_FORMAT),
    };
  }

  private convertFieldTestPaginationEntityToFieldTestPaginationEntityRawValue(
    fieldTestPaginationEntity: IFieldTestPaginationEntity | (Partial<NewFieldTestPaginationEntity> & FieldTestPaginationEntityFormDefaults)
  ): FieldTestPaginationEntityFormRawValue | PartialWithRequiredKeyOf<NewFieldTestPaginationEntityFormRawValue> {
    return {
      ...fieldTestPaginationEntity,
      instantAlice: fieldTestPaginationEntity.instantAlice ? fieldTestPaginationEntity.instantAlice.format(DATE_TIME_FORMAT) : undefined,
      instanteRequiredAlice: fieldTestPaginationEntity.instanteRequiredAlice
        ? fieldTestPaginationEntity.instanteRequiredAlice.format(DATE_TIME_FORMAT)
        : undefined,
      zonedDateTimeAlice: fieldTestPaginationEntity.zonedDateTimeAlice
        ? fieldTestPaginationEntity.zonedDateTimeAlice.format(DATE_TIME_FORMAT)
        : undefined,
      zonedDateTimeRequiredAlice: fieldTestPaginationEntity.zonedDateTimeRequiredAlice
        ? fieldTestPaginationEntity.zonedDateTimeRequiredAlice.format(DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
