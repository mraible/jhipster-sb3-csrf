import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  IEntityWithServiceImplAndPagination,
  NewEntityWithServiceImplAndPagination,
} from '../entity-with-service-impl-and-pagination.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEntityWithServiceImplAndPagination for edit and NewEntityWithServiceImplAndPaginationFormGroupInput for create.
 */
type EntityWithServiceImplAndPaginationFormGroupInput =
  | IEntityWithServiceImplAndPagination
  | PartialWithRequiredKeyOf<NewEntityWithServiceImplAndPagination>;

type EntityWithServiceImplAndPaginationFormDefaults = Pick<NewEntityWithServiceImplAndPagination, 'id'>;

type EntityWithServiceImplAndPaginationFormGroupContent = {
  id: FormControl<IEntityWithServiceImplAndPagination['id'] | NewEntityWithServiceImplAndPagination['id']>;
  hugo: FormControl<IEntityWithServiceImplAndPagination['hugo']>;
};

export type EntityWithServiceImplAndPaginationFormGroup = FormGroup<EntityWithServiceImplAndPaginationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceImplAndPaginationFormService {
  createEntityWithServiceImplAndPaginationFormGroup(
    entityWithServiceImplAndPagination: EntityWithServiceImplAndPaginationFormGroupInput = { id: null }
  ): EntityWithServiceImplAndPaginationFormGroup {
    const entityWithServiceImplAndPaginationRawValue = {
      ...this.getFormDefaults(),
      ...entityWithServiceImplAndPagination,
    };
    return new FormGroup<EntityWithServiceImplAndPaginationFormGroupContent>({
      id: new FormControl(
        { value: entityWithServiceImplAndPaginationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      hugo: new FormControl(entityWithServiceImplAndPaginationRawValue.hugo),
    });
  }

  getEntityWithServiceImplAndPagination(
    form: EntityWithServiceImplAndPaginationFormGroup
  ): IEntityWithServiceImplAndPagination | NewEntityWithServiceImplAndPagination {
    return form.getRawValue() as IEntityWithServiceImplAndPagination | NewEntityWithServiceImplAndPagination;
  }

  resetForm(
    form: EntityWithServiceImplAndPaginationFormGroup,
    entityWithServiceImplAndPagination: EntityWithServiceImplAndPaginationFormGroupInput
  ): void {
    const entityWithServiceImplAndPaginationRawValue = { ...this.getFormDefaults(), ...entityWithServiceImplAndPagination };
    form.reset(
      {
        ...entityWithServiceImplAndPaginationRawValue,
        id: { value: entityWithServiceImplAndPaginationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EntityWithServiceImplAndPaginationFormDefaults {
    return {
      id: null,
    };
  }
}
