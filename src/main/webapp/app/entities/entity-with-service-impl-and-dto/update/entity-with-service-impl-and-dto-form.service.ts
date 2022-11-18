import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEntityWithServiceImplAndDTO, NewEntityWithServiceImplAndDTO } from '../entity-with-service-impl-and-dto.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEntityWithServiceImplAndDTO for edit and NewEntityWithServiceImplAndDTOFormGroupInput for create.
 */
type EntityWithServiceImplAndDTOFormGroupInput = IEntityWithServiceImplAndDTO | PartialWithRequiredKeyOf<NewEntityWithServiceImplAndDTO>;

type EntityWithServiceImplAndDTOFormDefaults = Pick<NewEntityWithServiceImplAndDTO, 'id'>;

type EntityWithServiceImplAndDTOFormGroupContent = {
  id: FormControl<IEntityWithServiceImplAndDTO['id'] | NewEntityWithServiceImplAndDTO['id']>;
  louis: FormControl<IEntityWithServiceImplAndDTO['louis']>;
};

export type EntityWithServiceImplAndDTOFormGroup = FormGroup<EntityWithServiceImplAndDTOFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceImplAndDTOFormService {
  createEntityWithServiceImplAndDTOFormGroup(
    entityWithServiceImplAndDTO: EntityWithServiceImplAndDTOFormGroupInput = { id: null }
  ): EntityWithServiceImplAndDTOFormGroup {
    const entityWithServiceImplAndDTORawValue = {
      ...this.getFormDefaults(),
      ...entityWithServiceImplAndDTO,
    };
    return new FormGroup<EntityWithServiceImplAndDTOFormGroupContent>({
      id: new FormControl(
        { value: entityWithServiceImplAndDTORawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      louis: new FormControl(entityWithServiceImplAndDTORawValue.louis),
    });
  }

  getEntityWithServiceImplAndDTO(
    form: EntityWithServiceImplAndDTOFormGroup
  ): IEntityWithServiceImplAndDTO | NewEntityWithServiceImplAndDTO {
    return form.getRawValue() as IEntityWithServiceImplAndDTO | NewEntityWithServiceImplAndDTO;
  }

  resetForm(form: EntityWithServiceImplAndDTOFormGroup, entityWithServiceImplAndDTO: EntityWithServiceImplAndDTOFormGroupInput): void {
    const entityWithServiceImplAndDTORawValue = { ...this.getFormDefaults(), ...entityWithServiceImplAndDTO };
    form.reset(
      {
        ...entityWithServiceImplAndDTORawValue,
        id: { value: entityWithServiceImplAndDTORawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EntityWithServiceImplAndDTOFormDefaults {
    return {
      id: null,
    };
  }
}
