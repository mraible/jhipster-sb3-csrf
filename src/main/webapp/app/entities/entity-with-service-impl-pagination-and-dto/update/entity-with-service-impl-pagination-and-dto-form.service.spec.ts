import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../entity-with-service-impl-pagination-and-dto.test-samples';

import { EntityWithServiceImplPaginationAndDTOFormService } from './entity-with-service-impl-pagination-and-dto-form.service';

describe('EntityWithServiceImplPaginationAndDTO Form Service', () => {
  let service: EntityWithServiceImplPaginationAndDTOFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityWithServiceImplPaginationAndDTOFormService);
  });

  describe('Service methods', () => {
    describe('createEntityWithServiceImplPaginationAndDTOFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEntityWithServiceImplPaginationAndDTOFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            theo: expect.any(Object),
          })
        );
      });

      it('passing IEntityWithServiceImplPaginationAndDTO should create a new form with FormGroup', () => {
        const formGroup = service.createEntityWithServiceImplPaginationAndDTOFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            theo: expect.any(Object),
          })
        );
      });
    });

    describe('getEntityWithServiceImplPaginationAndDTO', () => {
      it('should return NewEntityWithServiceImplPaginationAndDTO for default EntityWithServiceImplPaginationAndDTO initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEntityWithServiceImplPaginationAndDTOFormGroup(sampleWithNewData);

        const entityWithServiceImplPaginationAndDTO = service.getEntityWithServiceImplPaginationAndDTO(formGroup) as any;

        expect(entityWithServiceImplPaginationAndDTO).toMatchObject(sampleWithNewData);
      });

      it('should return NewEntityWithServiceImplPaginationAndDTO for empty EntityWithServiceImplPaginationAndDTO initial value', () => {
        const formGroup = service.createEntityWithServiceImplPaginationAndDTOFormGroup();

        const entityWithServiceImplPaginationAndDTO = service.getEntityWithServiceImplPaginationAndDTO(formGroup) as any;

        expect(entityWithServiceImplPaginationAndDTO).toMatchObject({});
      });

      it('should return IEntityWithServiceImplPaginationAndDTO', () => {
        const formGroup = service.createEntityWithServiceImplPaginationAndDTOFormGroup(sampleWithRequiredData);

        const entityWithServiceImplPaginationAndDTO = service.getEntityWithServiceImplPaginationAndDTO(formGroup) as any;

        expect(entityWithServiceImplPaginationAndDTO).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEntityWithServiceImplPaginationAndDTO should not enable id FormControl', () => {
        const formGroup = service.createEntityWithServiceImplPaginationAndDTOFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEntityWithServiceImplPaginationAndDTO should disable id FormControl', () => {
        const formGroup = service.createEntityWithServiceImplPaginationAndDTOFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
