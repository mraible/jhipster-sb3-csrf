import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../entity-with-service-impl-and-pagination.test-samples';

import { EntityWithServiceImplAndPaginationFormService } from './entity-with-service-impl-and-pagination-form.service';

describe('EntityWithServiceImplAndPagination Form Service', () => {
  let service: EntityWithServiceImplAndPaginationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityWithServiceImplAndPaginationFormService);
  });

  describe('Service methods', () => {
    describe('createEntityWithServiceImplAndPaginationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEntityWithServiceImplAndPaginationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            hugo: expect.any(Object),
          })
        );
      });

      it('passing IEntityWithServiceImplAndPagination should create a new form with FormGroup', () => {
        const formGroup = service.createEntityWithServiceImplAndPaginationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            hugo: expect.any(Object),
          })
        );
      });
    });

    describe('getEntityWithServiceImplAndPagination', () => {
      it('should return NewEntityWithServiceImplAndPagination for default EntityWithServiceImplAndPagination initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEntityWithServiceImplAndPaginationFormGroup(sampleWithNewData);

        const entityWithServiceImplAndPagination = service.getEntityWithServiceImplAndPagination(formGroup) as any;

        expect(entityWithServiceImplAndPagination).toMatchObject(sampleWithNewData);
      });

      it('should return NewEntityWithServiceImplAndPagination for empty EntityWithServiceImplAndPagination initial value', () => {
        const formGroup = service.createEntityWithServiceImplAndPaginationFormGroup();

        const entityWithServiceImplAndPagination = service.getEntityWithServiceImplAndPagination(formGroup) as any;

        expect(entityWithServiceImplAndPagination).toMatchObject({});
      });

      it('should return IEntityWithServiceImplAndPagination', () => {
        const formGroup = service.createEntityWithServiceImplAndPaginationFormGroup(sampleWithRequiredData);

        const entityWithServiceImplAndPagination = service.getEntityWithServiceImplAndPagination(formGroup) as any;

        expect(entityWithServiceImplAndPagination).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEntityWithServiceImplAndPagination should not enable id FormControl', () => {
        const formGroup = service.createEntityWithServiceImplAndPaginationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEntityWithServiceImplAndPagination should disable id FormControl', () => {
        const formGroup = service.createEntityWithServiceImplAndPaginationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
