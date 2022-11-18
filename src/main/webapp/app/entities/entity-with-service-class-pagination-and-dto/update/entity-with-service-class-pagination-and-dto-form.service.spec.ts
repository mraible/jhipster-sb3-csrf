import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../entity-with-service-class-pagination-and-dto.test-samples';

import { EntityWithServiceClassPaginationAndDTOFormService } from './entity-with-service-class-pagination-and-dto-form.service';

describe('EntityWithServiceClassPaginationAndDTO Form Service', () => {
  let service: EntityWithServiceClassPaginationAndDTOFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityWithServiceClassPaginationAndDTOFormService);
  });

  describe('Service methods', () => {
    describe('createEntityWithServiceClassPaginationAndDTOFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEntityWithServiceClassPaginationAndDTOFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            lena: expect.any(Object),
          })
        );
      });

      it('passing IEntityWithServiceClassPaginationAndDTO should create a new form with FormGroup', () => {
        const formGroup = service.createEntityWithServiceClassPaginationAndDTOFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            lena: expect.any(Object),
          })
        );
      });
    });

    describe('getEntityWithServiceClassPaginationAndDTO', () => {
      it('should return NewEntityWithServiceClassPaginationAndDTO for default EntityWithServiceClassPaginationAndDTO initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEntityWithServiceClassPaginationAndDTOFormGroup(sampleWithNewData);

        const entityWithServiceClassPaginationAndDTO = service.getEntityWithServiceClassPaginationAndDTO(formGroup) as any;

        expect(entityWithServiceClassPaginationAndDTO).toMatchObject(sampleWithNewData);
      });

      it('should return NewEntityWithServiceClassPaginationAndDTO for empty EntityWithServiceClassPaginationAndDTO initial value', () => {
        const formGroup = service.createEntityWithServiceClassPaginationAndDTOFormGroup();

        const entityWithServiceClassPaginationAndDTO = service.getEntityWithServiceClassPaginationAndDTO(formGroup) as any;

        expect(entityWithServiceClassPaginationAndDTO).toMatchObject({});
      });

      it('should return IEntityWithServiceClassPaginationAndDTO', () => {
        const formGroup = service.createEntityWithServiceClassPaginationAndDTOFormGroup(sampleWithRequiredData);

        const entityWithServiceClassPaginationAndDTO = service.getEntityWithServiceClassPaginationAndDTO(formGroup) as any;

        expect(entityWithServiceClassPaginationAndDTO).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEntityWithServiceClassPaginationAndDTO should not enable id FormControl', () => {
        const formGroup = service.createEntityWithServiceClassPaginationAndDTOFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEntityWithServiceClassPaginationAndDTO should disable id FormControl', () => {
        const formGroup = service.createEntityWithServiceClassPaginationAndDTOFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
