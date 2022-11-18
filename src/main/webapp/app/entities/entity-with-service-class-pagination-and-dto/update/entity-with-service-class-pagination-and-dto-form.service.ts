import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  IEntityWithServiceClassPaginationAndDTO,
  NewEntityWithServiceClassPaginationAndDTO,
} from '../entity-with-service-class-pagination-and-dto.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEntityWithServiceClassPaginationAndDTO for edit and NewEntityWithServiceClassPaginationAndDTOFormGroupInput for create.
 */
type EntityWithServiceClassPaginationAndDTOFormGroupInput =
  | IEntityWithServiceClassPaginationAndDTO
  | PartialWithRequiredKeyOf<NewEntityWithServiceClassPaginationAndDTO>;

type EntityWithServiceClassPaginationAndDTOFormDefaults = Pick<NewEntityWithServiceClassPaginationAndDTO, 'id'>;

type EntityWithServiceClassPaginationAndDTOFormGroupContent = {
  id: FormControl<IEntityWithServiceClassPaginationAndDTO['id'] | NewEntityWithServiceClassPaginationAndDTO['id']>;
  lena: FormControl<IEntityWithServiceClassPaginationAndDTO['lena']>;
};

export type EntityWithServiceClassPaginationAndDTOFormGroup = FormGroup<EntityWithServiceClassPaginationAndDTOFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceClassPaginationAndDTOFormService {
  createEntityWithServiceClassPaginationAndDTOFormGroup(
    entityWithServiceClassPaginationAndDTO: EntityWithServiceClassPaginationAndDTOFormGroupInput = { id: null }
  ): EntityWithServiceClassPaginationAndDTOFormGroup {
    const entityWithServiceClassPaginationAndDTORawValue = {
      ...this.getFormDefaults(),
      ...entityWithServiceClassPaginationAndDTO,
    };
    return new FormGroup<EntityWithServiceClassPaginationAndDTOFormGroupContent>({
      id: new FormControl(
        { value: entityWithServiceClassPaginationAndDTORawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      lena: new FormControl(entityWithServiceClassPaginationAndDTORawValue.lena),
    });
  }

  getEntityWithServiceClassPaginationAndDTO(
    form: EntityWithServiceClassPaginationAndDTOFormGroup
  ): IEntityWithServiceClassPaginationAndDTO | NewEntityWithServiceClassPaginationAndDTO {
    return form.getRawValue() as IEntityWithServiceClassPaginationAndDTO | NewEntityWithServiceClassPaginationAndDTO;
  }

  resetForm(
    form: EntityWithServiceClassPaginationAndDTOFormGroup,
    entityWithServiceClassPaginationAndDTO: EntityWithServiceClassPaginationAndDTOFormGroupInput
  ): void {
    const entityWithServiceClassPaginationAndDTORawValue = { ...this.getFormDefaults(), ...entityWithServiceClassPaginationAndDTO };
    form.reset(
      {
        ...entityWithServiceClassPaginationAndDTORawValue,
        id: { value: entityWithServiceClassPaginationAndDTORawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EntityWithServiceClassPaginationAndDTOFormDefaults {
    return {
      id: null,
    };
  }
}
