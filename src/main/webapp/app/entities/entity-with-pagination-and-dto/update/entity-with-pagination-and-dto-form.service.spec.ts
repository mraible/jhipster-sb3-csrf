import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../entity-with-pagination-and-dto.test-samples';

import { EntityWithPaginationAndDTOFormService } from './entity-with-pagination-and-dto-form.service';

describe('EntityWithPaginationAndDTO Form Service', () => {
  let service: EntityWithPaginationAndDTOFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityWithPaginationAndDTOFormService);
  });

  describe('Service methods', () => {
    describe('createEntityWithPaginationAndDTOFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEntityWithPaginationAndDTOFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            lea: expect.any(Object),
          })
        );
      });

      it('passing IEntityWithPaginationAndDTO should create a new form with FormGroup', () => {
        const formGroup = service.createEntityWithPaginationAndDTOFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            lea: expect.any(Object),
          })
        );
      });
    });

    describe('getEntityWithPaginationAndDTO', () => {
      it('should return NewEntityWithPaginationAndDTO for default EntityWithPaginationAndDTO initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEntityWithPaginationAndDTOFormGroup(sampleWithNewData);

        const entityWithPaginationAndDTO = service.getEntityWithPaginationAndDTO(formGroup) as any;

        expect(entityWithPaginationAndDTO).toMatchObject(sampleWithNewData);
      });

      it('should return NewEntityWithPaginationAndDTO for empty EntityWithPaginationAndDTO initial value', () => {
        const formGroup = service.createEntityWithPaginationAndDTOFormGroup();

        const entityWithPaginationAndDTO = service.getEntityWithPaginationAndDTO(formGroup) as any;

        expect(entityWithPaginationAndDTO).toMatchObject({});
      });

      it('should return IEntityWithPaginationAndDTO', () => {
        const formGroup = service.createEntityWithPaginationAndDTOFormGroup(sampleWithRequiredData);

        const entityWithPaginationAndDTO = service.getEntityWithPaginationAndDTO(formGroup) as any;

        expect(entityWithPaginationAndDTO).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEntityWithPaginationAndDTO should not enable id FormControl', () => {
        const formGroup = service.createEntityWithPaginationAndDTOFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEntityWithPaginationAndDTO should disable id FormControl', () => {
        const formGroup = service.createEntityWithPaginationAndDTOFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
