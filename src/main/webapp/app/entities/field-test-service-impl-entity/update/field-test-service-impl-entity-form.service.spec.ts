import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../field-test-service-impl-entity.test-samples';

import { FieldTestServiceImplEntityFormService } from './field-test-service-impl-entity-form.service';

describe('FieldTestServiceImplEntity Form Service', () => {
  let service: FieldTestServiceImplEntityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldTestServiceImplEntityFormService);
  });

  describe('Service methods', () => {
    describe('createFieldTestServiceImplEntityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFieldTestServiceImplEntityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stringMika: expect.any(Object),
            stringRequiredMika: expect.any(Object),
            stringMinlengthMika: expect.any(Object),
            stringMaxlengthMika: expect.any(Object),
            stringPatternMika: expect.any(Object),
            integerMika: expect.any(Object),
            integerRequiredMika: expect.any(Object),
            integerMinMika: expect.any(Object),
            integerMaxMika: expect.any(Object),
            longMika: expect.any(Object),
            longRequiredMika: expect.any(Object),
            longMinMika: expect.any(Object),
            longMaxMika: expect.any(Object),
            floatMika: expect.any(Object),
            floatRequiredMika: expect.any(Object),
            floatMinMika: expect.any(Object),
            floatMaxMika: expect.any(Object),
            doubleRequiredMika: expect.any(Object),
            doubleMinMika: expect.any(Object),
            doubleMaxMika: expect.any(Object),
            bigDecimalRequiredMika: expect.any(Object),
            bigDecimalMinMika: expect.any(Object),
            bigDecimalMaxMika: expect.any(Object),
            localDateMika: expect.any(Object),
            localDateRequiredMika: expect.any(Object),
            instantMika: expect.any(Object),
            instanteRequiredMika: expect.any(Object),
            zonedDateTimeMika: expect.any(Object),
            zonedDateTimeRequiredMika: expect.any(Object),
            durationMika: expect.any(Object),
            durationRequiredMika: expect.any(Object),
            booleanMika: expect.any(Object),
            booleanRequiredMika: expect.any(Object),
            enumMika: expect.any(Object),
            enumRequiredMika: expect.any(Object),
            uuidMika: expect.any(Object),
            uuidRequiredMika: expect.any(Object),
            byteImageMika: expect.any(Object),
            byteImageRequiredMika: expect.any(Object),
            byteImageMinbytesMika: expect.any(Object),
            byteImageMaxbytesMika: expect.any(Object),
            byteAnyMika: expect.any(Object),
            byteAnyRequiredMika: expect.any(Object),
            byteAnyMinbytesMika: expect.any(Object),
            byteAnyMaxbytesMika: expect.any(Object),
            byteTextMika: expect.any(Object),
            byteTextRequiredMika: expect.any(Object),
          })
        );
      });

      it('passing IFieldTestServiceImplEntity should create a new form with FormGroup', () => {
        const formGroup = service.createFieldTestServiceImplEntityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stringMika: expect.any(Object),
            stringRequiredMika: expect.any(Object),
            stringMinlengthMika: expect.any(Object),
            stringMaxlengthMika: expect.any(Object),
            stringPatternMika: expect.any(Object),
            integerMika: expect.any(Object),
            integerRequiredMika: expect.any(Object),
            integerMinMika: expect.any(Object),
            integerMaxMika: expect.any(Object),
            longMika: expect.any(Object),
            longRequiredMika: expect.any(Object),
            longMinMika: expect.any(Object),
            longMaxMika: expect.any(Object),
            floatMika: expect.any(Object),
            floatRequiredMika: expect.any(Object),
            floatMinMika: expect.any(Object),
            floatMaxMika: expect.any(Object),
            doubleRequiredMika: expect.any(Object),
            doubleMinMika: expect.any(Object),
            doubleMaxMika: expect.any(Object),
            bigDecimalRequiredMika: expect.any(Object),
            bigDecimalMinMika: expect.any(Object),
            bigDecimalMaxMika: expect.any(Object),
            localDateMika: expect.any(Object),
            localDateRequiredMika: expect.any(Object),
            instantMika: expect.any(Object),
            instanteRequiredMika: expect.any(Object),
            zonedDateTimeMika: expect.any(Object),
            zonedDateTimeRequiredMika: expect.any(Object),
            durationMika: expect.any(Object),
            durationRequiredMika: expect.any(Object),
            booleanMika: expect.any(Object),
            booleanRequiredMika: expect.any(Object),
            enumMika: expect.any(Object),
            enumRequiredMika: expect.any(Object),
            uuidMika: expect.any(Object),
            uuidRequiredMika: expect.any(Object),
            byteImageMika: expect.any(Object),
            byteImageRequiredMika: expect.any(Object),
            byteImageMinbytesMika: expect.any(Object),
            byteImageMaxbytesMika: expect.any(Object),
            byteAnyMika: expect.any(Object),
            byteAnyRequiredMika: expect.any(Object),
            byteAnyMinbytesMika: expect.any(Object),
            byteAnyMaxbytesMika: expect.any(Object),
            byteTextMika: expect.any(Object),
            byteTextRequiredMika: expect.any(Object),
          })
        );
      });
    });

    describe('getFieldTestServiceImplEntity', () => {
      it('should return NewFieldTestServiceImplEntity for default FieldTestServiceImplEntity initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFieldTestServiceImplEntityFormGroup(sampleWithNewData);

        const fieldTestServiceImplEntity = service.getFieldTestServiceImplEntity(formGroup) as any;

        expect(fieldTestServiceImplEntity).toMatchObject(sampleWithNewData);
      });

      it('should return NewFieldTestServiceImplEntity for empty FieldTestServiceImplEntity initial value', () => {
        const formGroup = service.createFieldTestServiceImplEntityFormGroup();

        const fieldTestServiceImplEntity = service.getFieldTestServiceImplEntity(formGroup) as any;

        expect(fieldTestServiceImplEntity).toMatchObject({});
      });

      it('should return IFieldTestServiceImplEntity', () => {
        const formGroup = service.createFieldTestServiceImplEntityFormGroup(sampleWithRequiredData);

        const fieldTestServiceImplEntity = service.getFieldTestServiceImplEntity(formGroup) as any;

        expect(fieldTestServiceImplEntity).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFieldTestServiceImplEntity should not enable id FormControl', () => {
        const formGroup = service.createFieldTestServiceImplEntityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFieldTestServiceImplEntity should disable id FormControl', () => {
        const formGroup = service.createFieldTestServiceImplEntityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
