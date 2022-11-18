import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../entity-with-service-class-and-pagination.test-samples';

import { EntityWithServiceClassAndPaginationFormService } from './entity-with-service-class-and-pagination-form.service';

describe('EntityWithServiceClassAndPagination Form Service', () => {
  let service: EntityWithServiceClassAndPaginationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityWithServiceClassAndPaginationFormService);
  });

  describe('Service methods', () => {
    describe('createEntityWithServiceClassAndPaginationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEntityWithServiceClassAndPaginationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            enzo: expect.any(Object),
          })
        );
      });

      it('passing IEntityWithServiceClassAndPagination should create a new form with FormGroup', () => {
        const formGroup = service.createEntityWithServiceClassAndPaginationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            enzo: expect.any(Object),
          })
        );
      });
    });

    describe('getEntityWithServiceClassAndPagination', () => {
      it('should return NewEntityWithServiceClassAndPagination for default EntityWithServiceClassAndPagination initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEntityWithServiceClassAndPaginationFormGroup(sampleWithNewData);

        const entityWithServiceClassAndPagination = service.getEntityWithServiceClassAndPagination(formGroup) as any;

        expect(entityWithServiceClassAndPagination).toMatchObject(sampleWithNewData);
      });

      it('should return NewEntityWithServiceClassAndPagination for empty EntityWithServiceClassAndPagination initial value', () => {
        const formGroup = service.createEntityWithServiceClassAndPaginationFormGroup();

        const entityWithServiceClassAndPagination = service.getEntityWithServiceClassAndPagination(formGroup) as any;

        expect(entityWithServiceClassAndPagination).toMatchObject({});
      });

      it('should return IEntityWithServiceClassAndPagination', () => {
        const formGroup = service.createEntityWithServiceClassAndPaginationFormGroup(sampleWithRequiredData);

        const entityWithServiceClassAndPagination = service.getEntityWithServiceClassAndPagination(formGroup) as any;

        expect(entityWithServiceClassAndPagination).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEntityWithServiceClassAndPagination should not enable id FormControl', () => {
        const formGroup = service.createEntityWithServiceClassAndPaginationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEntityWithServiceClassAndPagination should disable id FormControl', () => {
        const formGroup = service.createEntityWithServiceClassAndPaginationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
