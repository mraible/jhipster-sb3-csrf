import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  IEntityWithServiceClassAndPagination,
  NewEntityWithServiceClassAndPagination,
} from '../entity-with-service-class-and-pagination.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEntityWithServiceClassAndPagination for edit and NewEntityWithServiceClassAndPaginationFormGroupInput for create.
 */
type EntityWithServiceClassAndPaginationFormGroupInput =
  | IEntityWithServiceClassAndPagination
  | PartialWithRequiredKeyOf<NewEntityWithServiceClassAndPagination>;

type EntityWithServiceClassAndPaginationFormDefaults = Pick<NewEntityWithServiceClassAndPagination, 'id'>;

type EntityWithServiceClassAndPaginationFormGroupContent = {
  id: FormControl<IEntityWithServiceClassAndPagination['id'] | NewEntityWithServiceClassAndPagination['id']>;
  enzo: FormControl<IEntityWithServiceClassAndPagination['enzo']>;
};

export type EntityWithServiceClassAndPaginationFormGroup = FormGroup<EntityWithServiceClassAndPaginationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceClassAndPaginationFormService {
  createEntityWithServiceClassAndPaginationFormGroup(
    entityWithServiceClassAndPagination: EntityWithServiceClassAndPaginationFormGroupInput = { id: null }
  ): EntityWithServiceClassAndPaginationFormGroup {
    const entityWithServiceClassAndPaginationRawValue = {
      ...this.getFormDefaults(),
      ...entityWithServiceClassAndPagination,
    };
    return new FormGroup<EntityWithServiceClassAndPaginationFormGroupContent>({
      id: new FormControl(
        { value: entityWithServiceClassAndPaginationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      enzo: new FormControl(entityWithServiceClassAndPaginationRawValue.enzo),
    });
  }

  getEntityWithServiceClassAndPagination(
    form: EntityWithServiceClassAndPaginationFormGroup
  ): IEntityWithServiceClassAndPagination | NewEntityWithServiceClassAndPagination {
    return form.getRawValue() as IEntityWithServiceClassAndPagination | NewEntityWithServiceClassAndPagination;
  }

  resetForm(
    form: EntityWithServiceClassAndPaginationFormGroup,
    entityWithServiceClassAndPagination: EntityWithServiceClassAndPaginationFormGroupInput
  ): void {
    const entityWithServiceClassAndPaginationRawValue = { ...this.getFormDefaults(), ...entityWithServiceClassAndPagination };
    form.reset(
      {
        ...entityWithServiceClassAndPaginationRawValue,
        id: { value: entityWithServiceClassAndPaginationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EntityWithServiceClassAndPaginationFormDefaults {
    return {
      id: null,
    };
  }
}
