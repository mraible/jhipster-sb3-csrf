import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFieldTestInfiniteScrollEntity, NewFieldTestInfiniteScrollEntity } from '../field-test-infinite-scroll-entity.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFieldTestInfiniteScrollEntity for edit and NewFieldTestInfiniteScrollEntityFormGroupInput for create.
 */
type FieldTestInfiniteScrollEntityFormGroupInput =
  | IFieldTestInfiniteScrollEntity
  | PartialWithRequiredKeyOf<NewFieldTestInfiniteScrollEntity>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFieldTestInfiniteScrollEntity | NewFieldTestInfiniteScrollEntity> = Omit<
  T,
  'instantHugo' | 'instanteRequiredHugo' | 'zonedDateTimeHugo' | 'zonedDateTimeRequiredHugo'
> & {
  instantHugo?: string | null;
  instanteRequiredHugo?: string | null;
  zonedDateTimeHugo?: string | null;
  zonedDateTimeRequiredHugo?: string | null;
};

type FieldTestInfiniteScrollEntityFormRawValue = FormValueOf<IFieldTestInfiniteScrollEntity>;

type NewFieldTestInfiniteScrollEntityFormRawValue = FormValueOf<NewFieldTestInfiniteScrollEntity>;

type FieldTestInfiniteScrollEntityFormDefaults = Pick<
  NewFieldTestInfiniteScrollEntity,
  'id' | 'instantHugo' | 'instanteRequiredHugo' | 'zonedDateTimeHugo' | 'zonedDateTimeRequiredHugo' | 'booleanHugo' | 'booleanRequiredHugo'
>;

type FieldTestInfiniteScrollEntityFormGroupContent = {
  id: FormControl<FieldTestInfiniteScrollEntityFormRawValue['id'] | NewFieldTestInfiniteScrollEntity['id']>;
  stringHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['stringHugo']>;
  stringRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['stringRequiredHugo']>;
  stringMinlengthHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['stringMinlengthHugo']>;
  stringMaxlengthHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['stringMaxlengthHugo']>;
  stringPatternHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['stringPatternHugo']>;
  integerHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['integerHugo']>;
  integerRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['integerRequiredHugo']>;
  integerMinHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['integerMinHugo']>;
  integerMaxHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['integerMaxHugo']>;
  longHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['longHugo']>;
  longRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['longRequiredHugo']>;
  longMinHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['longMinHugo']>;
  longMaxHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['longMaxHugo']>;
  floatHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['floatHugo']>;
  floatRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['floatRequiredHugo']>;
  floatMinHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['floatMinHugo']>;
  floatMaxHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['floatMaxHugo']>;
  doubleRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['doubleRequiredHugo']>;
  doubleMinHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['doubleMinHugo']>;
  doubleMaxHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['doubleMaxHugo']>;
  bigDecimalRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['bigDecimalRequiredHugo']>;
  bigDecimalMinHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['bigDecimalMinHugo']>;
  bigDecimalMaxHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['bigDecimalMaxHugo']>;
  localDateHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['localDateHugo']>;
  localDateRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['localDateRequiredHugo']>;
  instantHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['instantHugo']>;
  instanteRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['instanteRequiredHugo']>;
  zonedDateTimeHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['zonedDateTimeHugo']>;
  zonedDateTimeRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['zonedDateTimeRequiredHugo']>;
  durationHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['durationHugo']>;
  durationRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['durationRequiredHugo']>;
  booleanHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['booleanHugo']>;
  booleanRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['booleanRequiredHugo']>;
  enumHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['enumHugo']>;
  enumRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['enumRequiredHugo']>;
  uuidHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['uuidHugo']>;
  uuidRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['uuidRequiredHugo']>;
  byteImageHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteImageHugo']>;
  byteImageHugoContentType: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteImageHugoContentType']>;
  byteImageRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteImageRequiredHugo']>;
  byteImageRequiredHugoContentType: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteImageRequiredHugoContentType']>;
  byteImageMinbytesHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteImageMinbytesHugo']>;
  byteImageMinbytesHugoContentType: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteImageMinbytesHugoContentType']>;
  byteImageMaxbytesHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteImageMaxbytesHugo']>;
  byteImageMaxbytesHugoContentType: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteImageMaxbytesHugoContentType']>;
  byteAnyHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteAnyHugo']>;
  byteAnyHugoContentType: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteAnyHugoContentType']>;
  byteAnyRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteAnyRequiredHugo']>;
  byteAnyRequiredHugoContentType: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteAnyRequiredHugoContentType']>;
  byteAnyMinbytesHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteAnyMinbytesHugo']>;
  byteAnyMinbytesHugoContentType: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteAnyMinbytesHugoContentType']>;
  byteAnyMaxbytesHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteAnyMaxbytesHugo']>;
  byteAnyMaxbytesHugoContentType: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteAnyMaxbytesHugoContentType']>;
  byteTextHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteTextHugo']>;
  byteTextRequiredHugo: FormControl<FieldTestInfiniteScrollEntityFormRawValue['byteTextRequiredHugo']>;
};

export type FieldTestInfiniteScrollEntityFormGroup = FormGroup<FieldTestInfiniteScrollEntityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FieldTestInfiniteScrollEntityFormService {
  createFieldTestInfiniteScrollEntityFormGroup(
    fieldTestInfiniteScrollEntity: FieldTestInfiniteScrollEntityFormGroupInput = { id: null }
  ): FieldTestInfiniteScrollEntityFormGroup {
    const fieldTestInfiniteScrollEntityRawValue = this.convertFieldTestInfiniteScrollEntityToFieldTestInfiniteScrollEntityRawValue({
      ...this.getFormDefaults(),
      ...fieldTestInfiniteScrollEntity,
    });
    return new FormGroup<FieldTestInfiniteScrollEntityFormGroupContent>({
      id: new FormControl(
        { value: fieldTestInfiniteScrollEntityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      stringHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.stringHugo),
      stringRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.stringRequiredHugo, {
        validators: [Validators.required],
      }),
      stringMinlengthHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.stringMinlengthHugo, {
        validators: [Validators.minLength(0)],
      }),
      stringMaxlengthHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.stringMaxlengthHugo, {
        validators: [Validators.maxLength(20)],
      }),
      stringPatternHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.stringPatternHugo, {
        validators: [Validators.pattern('^[a-zA-Z0-9]*$')],
      }),
      integerHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.integerHugo),
      integerRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.integerRequiredHugo, {
        validators: [Validators.required],
      }),
      integerMinHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.integerMinHugo, {
        validators: [Validators.min(0)],
      }),
      integerMaxHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.integerMaxHugo, {
        validators: [Validators.max(100)],
      }),
      longHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.longHugo),
      longRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.longRequiredHugo, {
        validators: [Validators.required],
      }),
      longMinHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.longMinHugo, {
        validators: [Validators.min(0)],
      }),
      longMaxHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.longMaxHugo, {
        validators: [Validators.max(100)],
      }),
      floatHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.floatHugo),
      floatRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.floatRequiredHugo, {
        validators: [Validators.required],
      }),
      floatMinHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.floatMinHugo, {
        validators: [Validators.min(0)],
      }),
      floatMaxHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.floatMaxHugo, {
        validators: [Validators.max(100)],
      }),
      doubleRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.doubleRequiredHugo, {
        validators: [Validators.required],
      }),
      doubleMinHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.doubleMinHugo, {
        validators: [Validators.min(0)],
      }),
      doubleMaxHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.doubleMaxHugo, {
        validators: [Validators.max(100)],
      }),
      bigDecimalRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.bigDecimalRequiredHugo, {
        validators: [Validators.required],
      }),
      bigDecimalMinHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.bigDecimalMinHugo, {
        validators: [Validators.min(0)],
      }),
      bigDecimalMaxHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.bigDecimalMaxHugo, {
        validators: [Validators.max(100)],
      }),
      localDateHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.localDateHugo),
      localDateRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.localDateRequiredHugo, {
        validators: [Validators.required],
      }),
      instantHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.instantHugo),
      instanteRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.instanteRequiredHugo, {
        validators: [Validators.required],
      }),
      zonedDateTimeHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.zonedDateTimeHugo),
      zonedDateTimeRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.zonedDateTimeRequiredHugo, {
        validators: [Validators.required],
      }),
      durationHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.durationHugo),
      durationRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.durationRequiredHugo, {
        validators: [Validators.required],
      }),
      booleanHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.booleanHugo),
      booleanRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.booleanRequiredHugo, {
        validators: [Validators.required],
      }),
      enumHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.enumHugo),
      enumRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.enumRequiredHugo, {
        validators: [Validators.required],
      }),
      uuidHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.uuidHugo),
      uuidRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.uuidRequiredHugo, {
        validators: [Validators.required],
      }),
      byteImageHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteImageHugo),
      byteImageHugoContentType: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteImageHugoContentType),
      byteImageRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteImageRequiredHugo, {
        validators: [Validators.required],
      }),
      byteImageRequiredHugoContentType: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteImageRequiredHugoContentType),
      byteImageMinbytesHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteImageMinbytesHugo),
      byteImageMinbytesHugoContentType: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteImageMinbytesHugoContentType),
      byteImageMaxbytesHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteImageMaxbytesHugo),
      byteImageMaxbytesHugoContentType: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteImageMaxbytesHugoContentType),
      byteAnyHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteAnyHugo),
      byteAnyHugoContentType: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteAnyHugoContentType),
      byteAnyRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteAnyRequiredHugo, {
        validators: [Validators.required],
      }),
      byteAnyRequiredHugoContentType: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteAnyRequiredHugoContentType),
      byteAnyMinbytesHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteAnyMinbytesHugo),
      byteAnyMinbytesHugoContentType: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteAnyMinbytesHugoContentType),
      byteAnyMaxbytesHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteAnyMaxbytesHugo),
      byteAnyMaxbytesHugoContentType: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteAnyMaxbytesHugoContentType),
      byteTextHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteTextHugo),
      byteTextRequiredHugo: new FormControl(fieldTestInfiniteScrollEntityRawValue.byteTextRequiredHugo, {
        validators: [Validators.required],
      }),
    });
  }

  getFieldTestInfiniteScrollEntity(
    form: FieldTestInfiniteScrollEntityFormGroup
  ): IFieldTestInfiniteScrollEntity | NewFieldTestInfiniteScrollEntity {
    return this.convertFieldTestInfiniteScrollEntityRawValueToFieldTestInfiniteScrollEntity(
      form.getRawValue() as FieldTestInfiniteScrollEntityFormRawValue | NewFieldTestInfiniteScrollEntityFormRawValue
    );
  }

  resetForm(
    form: FieldTestInfiniteScrollEntityFormGroup,
    fieldTestInfiniteScrollEntity: FieldTestInfiniteScrollEntityFormGroupInput
  ): void {
    const fieldTestInfiniteScrollEntityRawValue = this.convertFieldTestInfiniteScrollEntityToFieldTestInfiniteScrollEntityRawValue({
      ...this.getFormDefaults(),
      ...fieldTestInfiniteScrollEntity,
    });
    form.reset(
      {
        ...fieldTestInfiniteScrollEntityRawValue,
        id: { value: fieldTestInfiniteScrollEntityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FieldTestInfiniteScrollEntityFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      instantHugo: currentTime,
      instanteRequiredHugo: currentTime,
      zonedDateTimeHugo: currentTime,
      zonedDateTimeRequiredHugo: currentTime,
      booleanHugo: false,
      booleanRequiredHugo: false,
    };
  }

  private convertFieldTestInfiniteScrollEntityRawValueToFieldTestInfiniteScrollEntity(
    rawFieldTestInfiniteScrollEntity: FieldTestInfiniteScrollEntityFormRawValue | NewFieldTestInfiniteScrollEntityFormRawValue
  ): IFieldTestInfiniteScrollEntity | NewFieldTestInfiniteScrollEntity {
    return {
      ...rawFieldTestInfiniteScrollEntity,
      instantHugo: dayjs(rawFieldTestInfiniteScrollEntity.instantHugo, DATE_TIME_FORMAT),
      instanteRequiredHugo: dayjs(rawFieldTestInfiniteScrollEntity.instanteRequiredHugo, DATE_TIME_FORMAT),
      zonedDateTimeHugo: dayjs(rawFieldTestInfiniteScrollEntity.zonedDateTimeHugo, DATE_TIME_FORMAT),
      zonedDateTimeRequiredHugo: dayjs(rawFieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo, DATE_TIME_FORMAT),
    };
  }

  private convertFieldTestInfiniteScrollEntityToFieldTestInfiniteScrollEntityRawValue(
    fieldTestInfiniteScrollEntity:
      | IFieldTestInfiniteScrollEntity
      | (Partial<NewFieldTestInfiniteScrollEntity> & FieldTestInfiniteScrollEntityFormDefaults)
  ): FieldTestInfiniteScrollEntityFormRawValue | PartialWithRequiredKeyOf<NewFieldTestInfiniteScrollEntityFormRawValue> {
    return {
      ...fieldTestInfiniteScrollEntity,
      instantHugo: fieldTestInfiniteScrollEntity.instantHugo
        ? fieldTestInfiniteScrollEntity.instantHugo.format(DATE_TIME_FORMAT)
        : undefined,
      instanteRequiredHugo: fieldTestInfiniteScrollEntity.instanteRequiredHugo
        ? fieldTestInfiniteScrollEntity.instanteRequiredHugo.format(DATE_TIME_FORMAT)
        : undefined,
      zonedDateTimeHugo: fieldTestInfiniteScrollEntity.zonedDateTimeHugo
        ? fieldTestInfiniteScrollEntity.zonedDateTimeHugo.format(DATE_TIME_FORMAT)
        : undefined,
      zonedDateTimeRequiredHugo: fieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo
        ? fieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo.format(DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
