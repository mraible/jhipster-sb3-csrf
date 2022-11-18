import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEntityWithDTO, NewEntityWithDTO } from '../entity-with-dto.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEntityWithDTO for edit and NewEntityWithDTOFormGroupInput for create.
 */
type EntityWithDTOFormGroupInput = IEntityWithDTO | PartialWithRequiredKeyOf<NewEntityWithDTO>;

type EntityWithDTOFormDefaults = Pick<NewEntityWithDTO, 'id'>;

type EntityWithDTOFormGroupContent = {
  id: FormControl<IEntityWithDTO['id'] | NewEntityWithDTO['id']>;
  emma: FormControl<IEntityWithDTO['emma']>;
};

export type EntityWithDTOFormGroup = FormGroup<EntityWithDTOFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EntityWithDTOFormService {
  createEntityWithDTOFormGroup(entityWithDTO: EntityWithDTOFormGroupInput = { id: null }): EntityWithDTOFormGroup {
    const entityWithDTORawValue = {
      ...this.getFormDefaults(),
      ...entityWithDTO,
    };
    return new FormGroup<EntityWithDTOFormGroupContent>({
      id: new FormControl(
        { value: entityWithDTORawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      emma: new FormControl(entityWithDTORawValue.emma),
    });
  }

  getEntityWithDTO(form: EntityWithDTOFormGroup): IEntityWithDTO | NewEntityWithDTO {
    return form.getRawValue() as IEntityWithDTO | NewEntityWithDTO;
  }

  resetForm(form: EntityWithDTOFormGroup, entityWithDTO: EntityWithDTOFormGroupInput): void {
    const entityWithDTORawValue = { ...this.getFormDefaults(), ...entityWithDTO };
    form.reset(
      {
        ...entityWithDTORawValue,
        id: { value: entityWithDTORawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EntityWithDTOFormDefaults {
    return {
      id: null,
    };
  }
}
