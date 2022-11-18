import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import {
  IFieldTestServiceClassAndJpaFilteringEntity,
  NewFieldTestServiceClassAndJpaFilteringEntity,
} from '../field-test-service-class-and-jpa-filtering-entity.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFieldTestServiceClassAndJpaFilteringEntity for edit and NewFieldTestServiceClassAndJpaFilteringEntityFormGroupInput for create.
 */
type FieldTestServiceClassAndJpaFilteringEntityFormGroupInput =
  | IFieldTestServiceClassAndJpaFilteringEntity
  | PartialWithRequiredKeyOf<NewFieldTestServiceClassAndJpaFilteringEntity>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFieldTestServiceClassAndJpaFilteringEntity | NewFieldTestServiceClassAndJpaFilteringEntity> = Omit<
  T,
  'instantBob' | 'instanteRequiredBob' | 'zonedDateTimeBob' | 'zonedDateTimeRequiredBob'
> & {
  instantBob?: string | null;
  instanteRequiredBob?: string | null;
  zonedDateTimeBob?: string | null;
  zonedDateTimeRequiredBob?: string | null;
};

type FieldTestServiceClassAndJpaFilteringEntityFormRawValue = FormValueOf<IFieldTestServiceClassAndJpaFilteringEntity>;

type NewFieldTestServiceClassAndJpaFilteringEntityFormRawValue = FormValueOf<NewFieldTestServiceClassAndJpaFilteringEntity>;

type FieldTestServiceClassAndJpaFilteringEntityFormDefaults = Pick<
  NewFieldTestServiceClassAndJpaFilteringEntity,
  'id' | 'instantBob' | 'instanteRequiredBob' | 'zonedDateTimeBob' | 'zonedDateTimeRequiredBob' | 'booleanBob' | 'booleanRequiredBob'
>;

type FieldTestServiceClassAndJpaFilteringEntityFormGroupContent = {
  id: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['id'] | NewFieldTestServiceClassAndJpaFilteringEntity['id']>;
  stringBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['stringBob']>;
  stringRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['stringRequiredBob']>;
  stringMinlengthBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['stringMinlengthBob']>;
  stringMaxlengthBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['stringMaxlengthBob']>;
  stringPatternBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['stringPatternBob']>;
  integerBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['integerBob']>;
  integerRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['integerRequiredBob']>;
  integerMinBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['integerMinBob']>;
  integerMaxBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['integerMaxBob']>;
  longBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['longBob']>;
  longRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['longRequiredBob']>;
  longMinBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['longMinBob']>;
  longMaxBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['longMaxBob']>;
  floatBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['floatBob']>;
  floatRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['floatRequiredBob']>;
  floatMinBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['floatMinBob']>;
  floatMaxBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['floatMaxBob']>;
  doubleRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['doubleRequiredBob']>;
  doubleMinBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['doubleMinBob']>;
  doubleMaxBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['doubleMaxBob']>;
  bigDecimalRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['bigDecimalRequiredBob']>;
  bigDecimalMinBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['bigDecimalMinBob']>;
  bigDecimalMaxBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['bigDecimalMaxBob']>;
  localDateBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['localDateBob']>;
  localDateRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['localDateRequiredBob']>;
  instantBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['instantBob']>;
  instanteRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['instanteRequiredBob']>;
  zonedDateTimeBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['zonedDateTimeBob']>;
  zonedDateTimeRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['zonedDateTimeRequiredBob']>;
  durationBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['durationBob']>;
  durationRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['durationRequiredBob']>;
  booleanBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['booleanBob']>;
  booleanRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['booleanRequiredBob']>;
  enumBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['enumBob']>;
  enumRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['enumRequiredBob']>;
  uuidBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['uuidBob']>;
  uuidRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['uuidRequiredBob']>;
  byteImageBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteImageBob']>;
  byteImageBobContentType: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteImageBobContentType']>;
  byteImageRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteImageRequiredBob']>;
  byteImageRequiredBobContentType: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteImageRequiredBobContentType']>;
  byteImageMinbytesBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteImageMinbytesBob']>;
  byteImageMinbytesBobContentType: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteImageMinbytesBobContentType']>;
  byteImageMaxbytesBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteImageMaxbytesBob']>;
  byteImageMaxbytesBobContentType: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteImageMaxbytesBobContentType']>;
  byteAnyBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteAnyBob']>;
  byteAnyBobContentType: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteAnyBobContentType']>;
  byteAnyRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteAnyRequiredBob']>;
  byteAnyRequiredBobContentType: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteAnyRequiredBobContentType']>;
  byteAnyMinbytesBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteAnyMinbytesBob']>;
  byteAnyMinbytesBobContentType: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteAnyMinbytesBobContentType']>;
  byteAnyMaxbytesBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteAnyMaxbytesBob']>;
  byteAnyMaxbytesBobContentType: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteAnyMaxbytesBobContentType']>;
  byteTextBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteTextBob']>;
  byteTextRequiredBob: FormControl<FieldTestServiceClassAndJpaFilteringEntityFormRawValue['byteTextRequiredBob']>;
};

export type FieldTestServiceClassAndJpaFilteringEntityFormGroup = FormGroup<FieldTestServiceClassAndJpaFilteringEntityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FieldTestServiceClassAndJpaFilteringEntityFormService {
  createFieldTestServiceClassAndJpaFilteringEntityFormGroup(
    fieldTestServiceClassAndJpaFilteringEntity: FieldTestServiceClassAndJpaFilteringEntityFormGroupInput = { id: null }
  ): FieldTestServiceClassAndJpaFilteringEntityFormGroup {
    const fieldTestServiceClassAndJpaFilteringEntityRawValue =
      this.convertFieldTestServiceClassAndJpaFilteringEntityToFieldTestServiceClassAndJpaFilteringEntityRawValue({
        ...this.getFormDefaults(),
        ...fieldTestServiceClassAndJpaFilteringEntity,
      });
    return new FormGroup<FieldTestServiceClassAndJpaFilteringEntityFormGroupContent>({
      id: new FormControl(
        { value: fieldTestServiceClassAndJpaFilteringEntityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      stringBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.stringBob),
      stringRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.stringRequiredBob, {
        validators: [Validators.required],
      }),
      stringMinlengthBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.stringMinlengthBob, {
        validators: [Validators.minLength(0)],
      }),
      stringMaxlengthBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.stringMaxlengthBob, {
        validators: [Validators.maxLength(20)],
      }),
      stringPatternBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.stringPatternBob, {
        validators: [Validators.pattern('^[a-zA-Z0-9]*$')],
      }),
      integerBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.integerBob),
      integerRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.integerRequiredBob, {
        validators: [Validators.required],
      }),
      integerMinBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.integerMinBob, {
        validators: [Validators.min(0)],
      }),
      integerMaxBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.integerMaxBob, {
        validators: [Validators.max(100)],
      }),
      longBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.longBob),
      longRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.longRequiredBob, {
        validators: [Validators.required],
      }),
      longMinBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.longMinBob, {
        validators: [Validators.min(0)],
      }),
      longMaxBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.longMaxBob, {
        validators: [Validators.max(100)],
      }),
      floatBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.floatBob),
      floatRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.floatRequiredBob, {
        validators: [Validators.required],
      }),
      floatMinBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.floatMinBob, {
        validators: [Validators.min(0)],
      }),
      floatMaxBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.floatMaxBob, {
        validators: [Validators.max(100)],
      }),
      doubleRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.doubleRequiredBob, {
        validators: [Validators.required],
      }),
      doubleMinBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.doubleMinBob, {
        validators: [Validators.min(0)],
      }),
      doubleMaxBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.doubleMaxBob, {
        validators: [Validators.max(100)],
      }),
      bigDecimalRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.bigDecimalRequiredBob, {
        validators: [Validators.required],
      }),
      bigDecimalMinBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.bigDecimalMinBob, {
        validators: [Validators.min(0)],
      }),
      bigDecimalMaxBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.bigDecimalMaxBob, {
        validators: [Validators.max(100)],
      }),
      localDateBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.localDateBob),
      localDateRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.localDateRequiredBob, {
        validators: [Validators.required],
      }),
      instantBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.instantBob),
      instanteRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.instanteRequiredBob, {
        validators: [Validators.required],
      }),
      zonedDateTimeBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.zonedDateTimeBob),
      zonedDateTimeRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.zonedDateTimeRequiredBob, {
        validators: [Validators.required],
      }),
      durationBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.durationBob),
      durationRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.durationRequiredBob, {
        validators: [Validators.required],
      }),
      booleanBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.booleanBob),
      booleanRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.booleanRequiredBob, {
        validators: [Validators.required],
      }),
      enumBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.enumBob),
      enumRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.enumRequiredBob, {
        validators: [Validators.required],
      }),
      uuidBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.uuidBob),
      uuidRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.uuidRequiredBob, {
        validators: [Validators.required],
      }),
      byteImageBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteImageBob),
      byteImageBobContentType: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteImageBobContentType),
      byteImageRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteImageRequiredBob, {
        validators: [Validators.required],
      }),
      byteImageRequiredBobContentType: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteImageRequiredBobContentType),
      byteImageMinbytesBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteImageMinbytesBob),
      byteImageMinbytesBobContentType: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteImageMinbytesBobContentType),
      byteImageMaxbytesBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteImageMaxbytesBob),
      byteImageMaxbytesBobContentType: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteImageMaxbytesBobContentType),
      byteAnyBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteAnyBob),
      byteAnyBobContentType: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteAnyBobContentType),
      byteAnyRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteAnyRequiredBob, {
        validators: [Validators.required],
      }),
      byteAnyRequiredBobContentType: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteAnyRequiredBobContentType),
      byteAnyMinbytesBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteAnyMinbytesBob),
      byteAnyMinbytesBobContentType: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteAnyMinbytesBobContentType),
      byteAnyMaxbytesBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteAnyMaxbytesBob),
      byteAnyMaxbytesBobContentType: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteAnyMaxbytesBobContentType),
      byteTextBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteTextBob),
      byteTextRequiredBob: new FormControl(fieldTestServiceClassAndJpaFilteringEntityRawValue.byteTextRequiredBob, {
        validators: [Validators.required],
      }),
    });
  }

  getFieldTestServiceClassAndJpaFilteringEntity(
    form: FieldTestServiceClassAndJpaFilteringEntityFormGroup
  ): IFieldTestServiceClassAndJpaFilteringEntity | NewFieldTestServiceClassAndJpaFilteringEntity {
    return this.convertFieldTestServiceClassAndJpaFilteringEntityRawValueToFieldTestServiceClassAndJpaFilteringEntity(
      form.getRawValue() as
        | FieldTestServiceClassAndJpaFilteringEntityFormRawValue
        | NewFieldTestServiceClassAndJpaFilteringEntityFormRawValue
    );
  }

  resetForm(
    form: FieldTestServiceClassAndJpaFilteringEntityFormGroup,
    fieldTestServiceClassAndJpaFilteringEntity: FieldTestServiceClassAndJpaFilteringEntityFormGroupInput
  ): void {
    const fieldTestServiceClassAndJpaFilteringEntityRawValue =
      this.convertFieldTestServiceClassAndJpaFilteringEntityToFieldTestServiceClassAndJpaFilteringEntityRawValue({
        ...this.getFormDefaults(),
        ...fieldTestServiceClassAndJpaFilteringEntity,
      });
    form.reset(
      {
        ...fieldTestServiceClassAndJpaFilteringEntityRawValue,
        id: { value: fieldTestServiceClassAndJpaFilteringEntityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FieldTestServiceClassAndJpaFilteringEntityFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      instantBob: currentTime,
      instanteRequiredBob: currentTime,
      zonedDateTimeBob: currentTime,
      zonedDateTimeRequiredBob: currentTime,
      booleanBob: false,
      booleanRequiredBob: false,
    };
  }

  private convertFieldTestServiceClassAndJpaFilteringEntityRawValueToFieldTestServiceClassAndJpaFilteringEntity(
    rawFieldTestServiceClassAndJpaFilteringEntity:
      | FieldTestServiceClassAndJpaFilteringEntityFormRawValue
      | NewFieldTestServiceClassAndJpaFilteringEntityFormRawValue
  ): IFieldTestServiceClassAndJpaFilteringEntity | NewFieldTestServiceClassAndJpaFilteringEntity {
    return {
      ...rawFieldTestServiceClassAndJpaFilteringEntity,
      instantBob: dayjs(rawFieldTestServiceClassAndJpaFilteringEntity.instantBob, DATE_TIME_FORMAT),
      instanteRequiredBob: dayjs(rawFieldTestServiceClassAndJpaFilteringEntity.instanteRequiredBob, DATE_TIME_FORMAT),
      zonedDateTimeBob: dayjs(rawFieldTestServiceClassAndJpaFilteringEntity.zonedDateTimeBob, DATE_TIME_FORMAT),
      zonedDateTimeRequiredBob: dayjs(rawFieldTestServiceClassAndJpaFilteringEntity.zonedDateTimeRequiredBob, DATE_TIME_FORMAT),
    };
  }

  private convertFieldTestServiceClassAndJpaFilteringEntityToFieldTestServiceClassAndJpaFilteringEntityRawValue(
    fieldTestServiceClassAndJpaFilteringEntity:
      | IFieldTestServiceClassAndJpaFilteringEntity
      | (Partial<NewFieldTestServiceClassAndJpaFilteringEntity> & FieldTestServiceClassAndJpaFilteringEntityFormDefaults)
  ):
    | FieldTestServiceClassAndJpaFilteringEntityFormRawValue
    | PartialWithRequiredKeyOf<NewFieldTestServiceClassAndJpaFilteringEntityFormRawValue> {
    return {
      ...fieldTestServiceClassAndJpaFilteringEntity,
      instantBob: fieldTestServiceClassAndJpaFilteringEntity.instantBob
        ? fieldTestServiceClassAndJpaFilteringEntity.instantBob.format(DATE_TIME_FORMAT)
        : undefined,
      instanteRequiredBob: fieldTestServiceClassAndJpaFilteringEntity.instanteRequiredBob
        ? fieldTestServiceClassAndJpaFilteringEntity.instanteRequiredBob.format(DATE_TIME_FORMAT)
        : undefined,
      zonedDateTimeBob: fieldTestServiceClassAndJpaFilteringEntity.zonedDateTimeBob
        ? fieldTestServiceClassAndJpaFilteringEntity.zonedDateTimeBob.format(DATE_TIME_FORMAT)
        : undefined,
      zonedDateTimeRequiredBob: fieldTestServiceClassAndJpaFilteringEntity.zonedDateTimeRequiredBob
        ? fieldTestServiceClassAndJpaFilteringEntity.zonedDateTimeRequiredBob.format(DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
