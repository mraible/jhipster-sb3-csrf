import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../entity-with-dto.test-samples';

import { EntityWithDTOFormService } from './entity-with-dto-form.service';

describe('EntityWithDTO Form Service', () => {
  let service: EntityWithDTOFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityWithDTOFormService);
  });

  describe('Service methods', () => {
    describe('createEntityWithDTOFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEntityWithDTOFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            emma: expect.any(Object),
          })
        );
      });

      it('passing IEntityWithDTO should create a new form with FormGroup', () => {
        const formGroup = service.createEntityWithDTOFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            emma: expect.any(Object),
          })
        );
      });
    });

    describe('getEntityWithDTO', () => {
      it('should return NewEntityWithDTO for default EntityWithDTO initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEntityWithDTOFormGroup(sampleWithNewData);

        const entityWithDTO = service.getEntityWithDTO(formGroup) as any;

        expect(entityWithDTO).toMatchObject(sampleWithNewData);
      });

      it('should return NewEntityWithDTO for empty EntityWithDTO initial value', () => {
        const formGroup = service.createEntityWithDTOFormGroup();

        const entityWithDTO = service.getEntityWithDTO(formGroup) as any;

        expect(entityWithDTO).toMatchObject({});
      });

      it('should return IEntityWithDTO', () => {
        const formGroup = service.createEntityWithDTOFormGroup(sampleWithRequiredData);

        const entityWithDTO = service.getEntityWithDTO(formGroup) as any;

        expect(entityWithDTO).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEntityWithDTO should not enable id FormControl', () => {
        const formGroup = service.createEntityWithDTOFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEntityWithDTO should disable id FormControl', () => {
        const formGroup = service.createEntityWithDTOFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
