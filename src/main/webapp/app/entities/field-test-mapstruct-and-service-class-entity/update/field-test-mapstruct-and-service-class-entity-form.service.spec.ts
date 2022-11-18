import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../field-test-mapstruct-and-service-class-entity.test-samples';

import { FieldTestMapstructAndServiceClassEntityFormService } from './field-test-mapstruct-and-service-class-entity-form.service';

describe('FieldTestMapstructAndServiceClassEntity Form Service', () => {
  let service: FieldTestMapstructAndServiceClassEntityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldTestMapstructAndServiceClassEntityFormService);
  });

  describe('Service methods', () => {
    describe('createFieldTestMapstructAndServiceClassEntityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFieldTestMapstructAndServiceClassEntityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stringEva: expect.any(Object),
            stringRequiredEva: expect.any(Object),
            stringMinlengthEva: expect.any(Object),
            stringMaxlengthEva: expect.any(Object),
            stringPatternEva: expect.any(Object),
            integerEva: expect.any(Object),
            integerRequiredEva: expect.any(Object),
            integerMinEva: expect.any(Object),
            integerMaxEva: expect.any(Object),
            longEva: expect.any(Object),
            longRequiredEva: expect.any(Object),
            longMinEva: expect.any(Object),
            longMaxEva: expect.any(Object),
            floatEva: expect.any(Object),
            floatRequiredEva: expect.any(Object),
            floatMinEva: expect.any(Object),
            floatMaxEva: expect.any(Object),
            doubleRequiredEva: expect.any(Object),
            doubleMinEva: expect.any(Object),
            doubleMaxEva: expect.any(Object),
            bigDecimalRequiredEva: expect.any(Object),
            bigDecimalMinEva: expect.any(Object),
            bigDecimalMaxEva: expect.any(Object),
            localDateEva: expect.any(Object),
            localDateRequiredEva: expect.any(Object),
            instantEva: expect.any(Object),
            instanteRequiredEva: expect.any(Object),
            zonedDateTimeEva: expect.any(Object),
            zonedDateTimeRequiredEva: expect.any(Object),
            durationEva: expect.any(Object),
            durationRequiredEva: expect.any(Object),
            booleanEva: expect.any(Object),
            booleanRequiredEva: expect.any(Object),
            enumEva: expect.any(Object),
            enumRequiredEva: expect.any(Object),
            uuidEva: expect.any(Object),
            uuidRequiredEva: expect.any(Object),
            byteImageEva: expect.any(Object),
            byteImageRequiredEva: expect.any(Object),
            byteImageMinbytesEva: expect.any(Object),
            byteImageMaxbytesEva: expect.any(Object),
            byteAnyEva: expect.any(Object),
            byteAnyRequiredEva: expect.any(Object),
            byteAnyMinbytesEva: expect.any(Object),
            byteAnyMaxbytesEva: expect.any(Object),
            byteTextEva: expect.any(Object),
            byteTextRequiredEva: expect.any(Object),
          })
        );
      });

      it('passing IFieldTestMapstructAndServiceClassEntity should create a new form with FormGroup', () => {
        const formGroup = service.createFieldTestMapstructAndServiceClassEntityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stringEva: expect.any(Object),
            stringRequiredEva: expect.any(Object),
            stringMinlengthEva: expect.any(Object),
            stringMaxlengthEva: expect.any(Object),
            stringPatternEva: expect.any(Object),
            integerEva: expect.any(Object),
            integerRequiredEva: expect.any(Object),
            integerMinEva: expect.any(Object),
            integerMaxEva: expect.any(Object),
            longEva: expect.any(Object),
            longRequiredEva: expect.any(Object),
            longMinEva: expect.any(Object),
            longMaxEva: expect.any(Object),
            floatEva: expect.any(Object),
            floatRequiredEva: expect.any(Object),
            floatMinEva: expect.any(Object),
            floatMaxEva: expect.any(Object),
            doubleRequiredEva: expect.any(Object),
            doubleMinEva: expect.any(Object),
            doubleMaxEva: expect.any(Object),
            bigDecimalRequiredEva: expect.any(Object),
            bigDecimalMinEva: expect.any(Object),
            bigDecimalMaxEva: expect.any(Object),
            localDateEva: expect.any(Object),
            localDateRequiredEva: expect.any(Object),
            instantEva: expect.any(Object),
            instanteRequiredEva: expect.any(Object),
            zonedDateTimeEva: expect.any(Object),
            zonedDateTimeRequiredEva: expect.any(Object),
            durationEva: expect.any(Object),
            durationRequiredEva: expect.any(Object),
            booleanEva: expect.any(Object),
            booleanRequiredEva: expect.any(Object),
            enumEva: expect.any(Object),
            enumRequiredEva: expect.any(Object),
            uuidEva: expect.any(Object),
            uuidRequiredEva: expect.any(Object),
            byteImageEva: expect.any(Object),
            byteImageRequiredEva: expect.any(Object),
            byteImageMinbytesEva: expect.any(Object),
            byteImageMaxbytesEva: expect.any(Object),
            byteAnyEva: expect.any(Object),
            byteAnyRequiredEva: expect.any(Object),
            byteAnyMinbytesEva: expect.any(Object),
            byteAnyMaxbytesEva: expect.any(Object),
            byteTextEva: expect.any(Object),
            byteTextRequiredEva: expect.any(Object),
          })
        );
      });
    });

    describe('getFieldTestMapstructAndServiceClassEntity', () => {
      it('should return NewFieldTestMapstructAndServiceClassEntity for default FieldTestMapstructAndServiceClassEntity initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFieldTestMapstructAndServiceClassEntityFormGroup(sampleWithNewData);

        const fieldTestMapstructAndServiceClassEntity = service.getFieldTestMapstructAndServiceClassEntity(formGroup) as any;

        expect(fieldTestMapstructAndServiceClassEntity).toMatchObject(sampleWithNewData);
      });

      it('should return NewFieldTestMapstructAndServiceClassEntity for empty FieldTestMapstructAndServiceClassEntity initial value', () => {
        const formGroup = service.createFieldTestMapstructAndServiceClassEntityFormGroup();

        const fieldTestMapstructAndServiceClassEntity = service.getFieldTestMapstructAndServiceClassEntity(formGroup) as any;

        expect(fieldTestMapstructAndServiceClassEntity).toMatchObject({});
      });

      it('should return IFieldTestMapstructAndServiceClassEntity', () => {
        const formGroup = service.createFieldTestMapstructAndServiceClassEntityFormGroup(sampleWithRequiredData);

        const fieldTestMapstructAndServiceClassEntity = service.getFieldTestMapstructAndServiceClassEntity(formGroup) as any;

        expect(fieldTestMapstructAndServiceClassEntity).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFieldTestMapstructAndServiceClassEntity should not enable id FormControl', () => {
        const formGroup = service.createFieldTestMapstructAndServiceClassEntityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFieldTestMapstructAndServiceClassEntity should disable id FormControl', () => {
        const formGroup = service.createFieldTestMapstructAndServiceClassEntityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
