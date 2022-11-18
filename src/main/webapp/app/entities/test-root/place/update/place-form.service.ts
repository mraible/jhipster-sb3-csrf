import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPlace, NewPlace } from '../place.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPlace for edit and NewPlaceFormGroupInput for create.
 */
type PlaceFormGroupInput = IPlace | PartialWithRequiredKeyOf<NewPlace>;

type PlaceFormDefaults = Pick<NewPlace, 'id' | 'preferredDivisions'>;

type PlaceFormGroupContent = {
  id: FormControl<IPlace['id'] | NewPlace['id']>;
  name: FormControl<IPlace['name']>;
  numberOfSeats: FormControl<IPlace['numberOfSeats']>;
  shortName: FormControl<IPlace['shortName']>;
  colorBackground: FormControl<IPlace['colorBackground']>;
  colorText: FormControl<IPlace['colorText']>;
  description: FormControl<IPlace['description']>;
  preferredDivisions: FormControl<IPlace['preferredDivisions']>;
  owner: FormControl<IPlace['owner']>;
};

export type PlaceFormGroup = FormGroup<PlaceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PlaceFormService {
  createPlaceFormGroup(place: PlaceFormGroupInput = { id: null }): PlaceFormGroup {
    const placeRawValue = {
      ...this.getFormDefaults(),
      ...place,
    };
    return new FormGroup<PlaceFormGroupContent>({
      id: new FormControl(
        { value: placeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(placeRawValue.name, {
        validators: [Validators.required],
      }),
      numberOfSeats: new FormControl(placeRawValue.numberOfSeats),
      shortName: new FormControl(placeRawValue.shortName),
      colorBackground: new FormControl(placeRawValue.colorBackground),
      colorText: new FormControl(placeRawValue.colorText),
      description: new FormControl(placeRawValue.description),
      preferredDivisions: new FormControl(placeRawValue.preferredDivisions ?? []),
      owner: new FormControl(placeRawValue.owner),
    });
  }

  getPlace(form: PlaceFormGroup): IPlace | NewPlace {
    return form.getRawValue() as IPlace | NewPlace;
  }

  resetForm(form: PlaceFormGroup, place: PlaceFormGroupInput): void {
    const placeRawValue = { ...this.getFormDefaults(), ...place };
    form.reset(
      {
        ...placeRawValue,
        id: { value: placeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PlaceFormDefaults {
    return {
      id: null,
      preferredDivisions: [],
    };
  }
}
