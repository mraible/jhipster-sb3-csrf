import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../entity-with-service-impl-and-dto.test-samples';

import { EntityWithServiceImplAndDTOFormService } from './entity-with-service-impl-and-dto-form.service';

describe('EntityWithServiceImplAndDTO Form Service', () => {
  let service: EntityWithServiceImplAndDTOFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityWithServiceImplAndDTOFormService);
  });

  describe('Service methods', () => {
    describe('createEntityWithServiceImplAndDTOFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEntityWithServiceImplAndDTOFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            louis: expect.any(Object),
          })
        );
      });

      it('passing IEntityWithServiceImplAndDTO should create a new form with FormGroup', () => {
        const formGroup = service.createEntityWithServiceImplAndDTOFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            louis: expect.any(Object),
          })
        );
      });
    });

    describe('getEntityWithServiceImplAndDTO', () => {
      it('should return NewEntityWithServiceImplAndDTO for default EntityWithServiceImplAndDTO initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEntityWithServiceImplAndDTOFormGroup(sampleWithNewData);

        const entityWithServiceImplAndDTO = service.getEntityWithServiceImplAndDTO(formGroup) as any;

        expect(entityWithServiceImplAndDTO).toMatchObject(sampleWithNewData);
      });

      it('should return NewEntityWithServiceImplAndDTO for empty EntityWithServiceImplAndDTO initial value', () => {
        const formGroup = service.createEntityWithServiceImplAndDTOFormGroup();

        const entityWithServiceImplAndDTO = service.getEntityWithServiceImplAndDTO(formGroup) as any;

        expect(entityWithServiceImplAndDTO).toMatchObject({});
      });

      it('should return IEntityWithServiceImplAndDTO', () => {
        const formGroup = service.createEntityWithServiceImplAndDTOFormGroup(sampleWithRequiredData);

        const entityWithServiceImplAndDTO = service.getEntityWithServiceImplAndDTO(formGroup) as any;

        expect(entityWithServiceImplAndDTO).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEntityWithServiceImplAndDTO should not enable id FormControl', () => {
        const formGroup = service.createEntityWithServiceImplAndDTOFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEntityWithServiceImplAndDTO should disable id FormControl', () => {
        const formGroup = service.createEntityWithServiceImplAndDTOFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
