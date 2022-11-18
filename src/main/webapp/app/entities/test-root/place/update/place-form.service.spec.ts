import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../place.test-samples';

import { PlaceFormService } from './place-form.service';

describe('Place Form Service', () => {
  let service: PlaceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceFormService);
  });

  describe('Service methods', () => {
    describe('createPlaceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPlaceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            numberOfSeats: expect.any(Object),
            shortName: expect.any(Object),
            colorBackground: expect.any(Object),
            colorText: expect.any(Object),
            description: expect.any(Object),
            preferredDivisions: expect.any(Object),
            owner: expect.any(Object),
          })
        );
      });

      it('passing IPlace should create a new form with FormGroup', () => {
        const formGroup = service.createPlaceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            numberOfSeats: expect.any(Object),
            shortName: expect.any(Object),
            colorBackground: expect.any(Object),
            colorText: expect.any(Object),
            description: expect.any(Object),
            preferredDivisions: expect.any(Object),
            owner: expect.any(Object),
          })
        );
      });
    });

    describe('getPlace', () => {
      it('should return NewPlace for default Place initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPlaceFormGroup(sampleWithNewData);

        const place = service.getPlace(formGroup) as any;

        expect(place).toMatchObject(sampleWithNewData);
      });

      it('should return NewPlace for empty Place initial value', () => {
        const formGroup = service.createPlaceFormGroup();

        const place = service.getPlace(formGroup) as any;

        expect(place).toMatchObject({});
      });

      it('should return IPlace', () => {
        const formGroup = service.createPlaceFormGroup(sampleWithRequiredData);

        const place = service.getPlace(formGroup) as any;

        expect(place).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPlace should not enable id FormControl', () => {
        const formGroup = service.createPlaceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPlace should disable id FormControl', () => {
        const formGroup = service.createPlaceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
