import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../field-test-pagination-entity.test-samples';

import { FieldTestPaginationEntityFormService } from './field-test-pagination-entity-form.service';

describe('FieldTestPaginationEntity Form Service', () => {
  let service: FieldTestPaginationEntityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldTestPaginationEntityFormService);
  });

  describe('Service methods', () => {
    describe('createFieldTestPaginationEntityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFieldTestPaginationEntityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stringAlice: expect.any(Object),
            stringRequiredAlice: expect.any(Object),
            stringMinlengthAlice: expect.any(Object),
            stringMaxlengthAlice: expect.any(Object),
            stringPatternAlice: expect.any(Object),
            integerAlice: expect.any(Object),
            integerRequiredAlice: expect.any(Object),
            integerMinAlice: expect.any(Object),
            integerMaxAlice: expect.any(Object),
            longAlice: expect.any(Object),
            longRequiredAlice: expect.any(Object),
            longMinAlice: expect.any(Object),
            longMaxAlice: expect.any(Object),
            floatAlice: expect.any(Object),
            floatRequiredAlice: expect.any(Object),
            floatMinAlice: expect.any(Object),
            floatMaxAlice: expect.any(Object),
            doubleRequiredAlice: expect.any(Object),
            doubleMinAlice: expect.any(Object),
            doubleMaxAlice: expect.any(Object),
            bigDecimalRequiredAlice: expect.any(Object),
            bigDecimalMinAlice: expect.any(Object),
            bigDecimalMaxAlice: expect.any(Object),
            localDateAlice: expect.any(Object),
            localDateRequiredAlice: expect.any(Object),
            instantAlice: expect.any(Object),
            instanteRequiredAlice: expect.any(Object),
            zonedDateTimeAlice: expect.any(Object),
            zonedDateTimeRequiredAlice: expect.any(Object),
            durationAlice: expect.any(Object),
            durationRequiredAlice: expect.any(Object),
            booleanAlice: expect.any(Object),
            booleanRequiredAlice: expect.any(Object),
            enumAlice: expect.any(Object),
            enumRequiredAlice: expect.any(Object),
            uuidAlice: expect.any(Object),
            uuidRequiredAlice: expect.any(Object),
            byteImageAlice: expect.any(Object),
            byteImageRequiredAlice: expect.any(Object),
            byteImageMinbytesAlice: expect.any(Object),
            byteImageMaxbytesAlice: expect.any(Object),
            byteAnyAlice: expect.any(Object),
            byteAnyRequiredAlice: expect.any(Object),
            byteAnyMinbytesAlice: expect.any(Object),
            byteAnyMaxbytesAlice: expect.any(Object),
            byteTextAlice: expect.any(Object),
            byteTextRequiredAlice: expect.any(Object),
          })
        );
      });

      it('passing IFieldTestPaginationEntity should create a new form with FormGroup', () => {
        const formGroup = service.createFieldTestPaginationEntityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stringAlice: expect.any(Object),
            stringRequiredAlice: expect.any(Object),
            stringMinlengthAlice: expect.any(Object),
            stringMaxlengthAlice: expect.any(Object),
            stringPatternAlice: expect.any(Object),
            integerAlice: expect.any(Object),
            integerRequiredAlice: expect.any(Object),
            integerMinAlice: expect.any(Object),
            integerMaxAlice: expect.any(Object),
            longAlice: expect.any(Object),
            longRequiredAlice: expect.any(Object),
            longMinAlice: expect.any(Object),
            longMaxAlice: expect.any(Object),
            floatAlice: expect.any(Object),
            floatRequiredAlice: expect.any(Object),
            floatMinAlice: expect.any(Object),
            floatMaxAlice: expect.any(Object),
            doubleRequiredAlice: expect.any(Object),
            doubleMinAlice: expect.any(Object),
            doubleMaxAlice: expect.any(Object),
            bigDecimalRequiredAlice: expect.any(Object),
            bigDecimalMinAlice: expect.any(Object),
            bigDecimalMaxAlice: expect.any(Object),
            localDateAlice: expect.any(Object),
            localDateRequiredAlice: expect.any(Object),
            instantAlice: expect.any(Object),
            instanteRequiredAlice: expect.any(Object),
            zonedDateTimeAlice: expect.any(Object),
            zonedDateTimeRequiredAlice: expect.any(Object),
            durationAlice: expect.any(Object),
            durationRequiredAlice: expect.any(Object),
            booleanAlice: expect.any(Object),
            booleanRequiredAlice: expect.any(Object),
            enumAlice: expect.any(Object),
            enumRequiredAlice: expect.any(Object),
            uuidAlice: expect.any(Object),
            uuidRequiredAlice: expect.any(Object),
            byteImageAlice: expect.any(Object),
            byteImageRequiredAlice: expect.any(Object),
            byteImageMinbytesAlice: expect.any(Object),
            byteImageMaxbytesAlice: expect.any(Object),
            byteAnyAlice: expect.any(Object),
            byteAnyRequiredAlice: expect.any(Object),
            byteAnyMinbytesAlice: expect.any(Object),
            byteAnyMaxbytesAlice: expect.any(Object),
            byteTextAlice: expect.any(Object),
            byteTextRequiredAlice: expect.any(Object),
          })
        );
      });
    });

    describe('getFieldTestPaginationEntity', () => {
      it('should return NewFieldTestPaginationEntity for default FieldTestPaginationEntity initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFieldTestPaginationEntityFormGroup(sampleWithNewData);

        const fieldTestPaginationEntity = service.getFieldTestPaginationEntity(formGroup) as any;

        expect(fieldTestPaginationEntity).toMatchObject(sampleWithNewData);
      });

      it('should return NewFieldTestPaginationEntity for empty FieldTestPaginationEntity initial value', () => {
        const formGroup = service.createFieldTestPaginationEntityFormGroup();

        const fieldTestPaginationEntity = service.getFieldTestPaginationEntity(formGroup) as any;

        expect(fieldTestPaginationEntity).toMatchObject({});
      });

      it('should return IFieldTestPaginationEntity', () => {
        const formGroup = service.createFieldTestPaginationEntityFormGroup(sampleWithRequiredData);

        const fieldTestPaginationEntity = service.getFieldTestPaginationEntity(formGroup) as any;

        expect(fieldTestPaginationEntity).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFieldTestPaginationEntity should not enable id FormControl', () => {
        const formGroup = service.createFieldTestPaginationEntityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFieldTestPaginationEntity should disable id FormControl', () => {
        const formGroup = service.createFieldTestPaginationEntityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
