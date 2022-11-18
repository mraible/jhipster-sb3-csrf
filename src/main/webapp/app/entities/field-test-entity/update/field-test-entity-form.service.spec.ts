import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../field-test-entity.test-samples';

import { FieldTestEntityFormService } from './field-test-entity-form.service';

describe('FieldTestEntity Form Service', () => {
  let service: FieldTestEntityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldTestEntityFormService);
  });

  describe('Service methods', () => {
    describe('createFieldTestEntityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFieldTestEntityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stringTom: expect.any(Object),
            stringRequiredTom: expect.any(Object),
            stringMinlengthTom: expect.any(Object),
            stringMaxlengthTom: expect.any(Object),
            stringPatternTom: expect.any(Object),
            numberPatternTom: expect.any(Object),
            numberPatternRequiredTom: expect.any(Object),
            integerTom: expect.any(Object),
            integerRequiredTom: expect.any(Object),
            integerMinTom: expect.any(Object),
            integerMaxTom: expect.any(Object),
            longTom: expect.any(Object),
            longRequiredTom: expect.any(Object),
            longMinTom: expect.any(Object),
            longMaxTom: expect.any(Object),
            floatTom: expect.any(Object),
            floatRequiredTom: expect.any(Object),
            floatMinTom: expect.any(Object),
            floatMaxTom: expect.any(Object),
            doubleRequiredTom: expect.any(Object),
            doubleMinTom: expect.any(Object),
            doubleMaxTom: expect.any(Object),
            bigDecimalRequiredTom: expect.any(Object),
            bigDecimalMinTom: expect.any(Object),
            bigDecimalMaxTom: expect.any(Object),
            localDateTom: expect.any(Object),
            localDateRequiredTom: expect.any(Object),
            instantTom: expect.any(Object),
            instantRequiredTom: expect.any(Object),
            zonedDateTimeTom: expect.any(Object),
            zonedDateTimeRequiredTom: expect.any(Object),
            durationTom: expect.any(Object),
            durationRequiredTom: expect.any(Object),
            booleanTom: expect.any(Object),
            booleanRequiredTom: expect.any(Object),
            enumTom: expect.any(Object),
            enumRequiredTom: expect.any(Object),
            uuidTom: expect.any(Object),
            uuidRequiredTom: expect.any(Object),
            byteImageTom: expect.any(Object),
            byteImageRequiredTom: expect.any(Object),
            byteImageMinbytesTom: expect.any(Object),
            byteImageMaxbytesTom: expect.any(Object),
            byteAnyTom: expect.any(Object),
            byteAnyRequiredTom: expect.any(Object),
            byteAnyMinbytesTom: expect.any(Object),
            byteAnyMaxbytesTom: expect.any(Object),
            byteTextTom: expect.any(Object),
            byteTextRequiredTom: expect.any(Object),
          })
        );
      });

      it('passing IFieldTestEntity should create a new form with FormGroup', () => {
        const formGroup = service.createFieldTestEntityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stringTom: expect.any(Object),
            stringRequiredTom: expect.any(Object),
            stringMinlengthTom: expect.any(Object),
            stringMaxlengthTom: expect.any(Object),
            stringPatternTom: expect.any(Object),
            numberPatternTom: expect.any(Object),
            numberPatternRequiredTom: expect.any(Object),
            integerTom: expect.any(Object),
            integerRequiredTom: expect.any(Object),
            integerMinTom: expect.any(Object),
            integerMaxTom: expect.any(Object),
            longTom: expect.any(Object),
            longRequiredTom: expect.any(Object),
            longMinTom: expect.any(Object),
            longMaxTom: expect.any(Object),
            floatTom: expect.any(Object),
            floatRequiredTom: expect.any(Object),
            floatMinTom: expect.any(Object),
            floatMaxTom: expect.any(Object),
            doubleRequiredTom: expect.any(Object),
            doubleMinTom: expect.any(Object),
            doubleMaxTom: expect.any(Object),
            bigDecimalRequiredTom: expect.any(Object),
            bigDecimalMinTom: expect.any(Object),
            bigDecimalMaxTom: expect.any(Object),
            localDateTom: expect.any(Object),
            localDateRequiredTom: expect.any(Object),
            instantTom: expect.any(Object),
            instantRequiredTom: expect.any(Object),
            zonedDateTimeTom: expect.any(Object),
            zonedDateTimeRequiredTom: expect.any(Object),
            durationTom: expect.any(Object),
            durationRequiredTom: expect.any(Object),
            booleanTom: expect.any(Object),
            booleanRequiredTom: expect.any(Object),
            enumTom: expect.any(Object),
            enumRequiredTom: expect.any(Object),
            uuidTom: expect.any(Object),
            uuidRequiredTom: expect.any(Object),
            byteImageTom: expect.any(Object),
            byteImageRequiredTom: expect.any(Object),
            byteImageMinbytesTom: expect.any(Object),
            byteImageMaxbytesTom: expect.any(Object),
            byteAnyTom: expect.any(Object),
            byteAnyRequiredTom: expect.any(Object),
            byteAnyMinbytesTom: expect.any(Object),
            byteAnyMaxbytesTom: expect.any(Object),
            byteTextTom: expect.any(Object),
            byteTextRequiredTom: expect.any(Object),
          })
        );
      });
    });

    describe('getFieldTestEntity', () => {
      it('should return NewFieldTestEntity for default FieldTestEntity initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFieldTestEntityFormGroup(sampleWithNewData);

        const fieldTestEntity = service.getFieldTestEntity(formGroup) as any;

        expect(fieldTestEntity).toMatchObject(sampleWithNewData);
      });

      it('should return NewFieldTestEntity for empty FieldTestEntity initial value', () => {
        const formGroup = service.createFieldTestEntityFormGroup();

        const fieldTestEntity = service.getFieldTestEntity(formGroup) as any;

        expect(fieldTestEntity).toMatchObject({});
      });

      it('should return IFieldTestEntity', () => {
        const formGroup = service.createFieldTestEntityFormGroup(sampleWithRequiredData);

        const fieldTestEntity = service.getFieldTestEntity(formGroup) as any;

        expect(fieldTestEntity).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFieldTestEntity should not enable id FormControl', () => {
        const formGroup = service.createFieldTestEntityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFieldTestEntity should disable id FormControl', () => {
        const formGroup = service.createFieldTestEntityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
