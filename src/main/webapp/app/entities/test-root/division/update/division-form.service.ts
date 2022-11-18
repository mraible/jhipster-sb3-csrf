import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDivision, NewDivision } from '../division.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDivision for edit and NewDivisionFormGroupInput for create.
 */
type DivisionFormGroupInput = IDivision | PartialWithRequiredKeyOf<NewDivision>;

type DivisionFormDefaults = Pick<NewDivision, 'id' | 'preferredPlaces'>;

type DivisionFormGroupContent = {
  id: FormControl<IDivision['id'] | NewDivision['id']>;
  name: FormControl<IDivision['name']>;
  shortName: FormControl<IDivision['shortName']>;
  numberOfPeople: FormControl<IDivision['numberOfPeople']>;
  divisionType: FormControl<IDivision['divisionType']>;
  colorBackground: FormControl<IDivision['colorBackground']>;
  colorText: FormControl<IDivision['colorText']>;
  preferredPlaces: FormControl<IDivision['preferredPlaces']>;
};

export type DivisionFormGroup = FormGroup<DivisionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DivisionFormService {
  createDivisionFormGroup(division: DivisionFormGroupInput = { id: null }): DivisionFormGroup {
    const divisionRawValue = {
      ...this.getFormDefaults(),
      ...division,
    };
    return new FormGroup<DivisionFormGroupContent>({
      id: new FormControl(
        { value: divisionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(divisionRawValue.name, {
        validators: [Validators.required],
      }),
      shortName: new FormControl(divisionRawValue.shortName),
      numberOfPeople: new FormControl(divisionRawValue.numberOfPeople),
      divisionType: new FormControl(divisionRawValue.divisionType, {
        validators: [Validators.required],
      }),
      colorBackground: new FormControl(divisionRawValue.colorBackground),
      colorText: new FormControl(divisionRawValue.colorText),
      preferredPlaces: new FormControl(divisionRawValue.preferredPlaces ?? []),
    });
  }

  getDivision(form: DivisionFormGroup): IDivision | NewDivision {
    return form.getRawValue() as IDivision | NewDivision;
  }

  resetForm(form: DivisionFormGroup, division: DivisionFormGroupInput): void {
    const divisionRawValue = { ...this.getFormDefaults(), ...division };
    form.reset(
      {
        ...divisionRawValue,
        id: { value: divisionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DivisionFormDefaults {
    return {
      id: null,
      preferredPlaces: [],
    };
  }
}
