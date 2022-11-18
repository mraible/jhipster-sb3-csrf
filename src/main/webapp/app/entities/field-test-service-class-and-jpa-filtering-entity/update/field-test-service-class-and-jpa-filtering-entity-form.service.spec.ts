import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../field-test-service-class-and-jpa-filtering-entity.test-samples';

import { FieldTestServiceClassAndJpaFilteringEntityFormService } from './field-test-service-class-and-jpa-filtering-entity-form.service';

describe('FieldTestServiceClassAndJpaFilteringEntity Form Service', () => {
  let service: FieldTestServiceClassAndJpaFilteringEntityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldTestServiceClassAndJpaFilteringEntityFormService);
  });

  describe('Service methods', () => {
    describe('createFieldTestServiceClassAndJpaFilteringEntityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFieldTestServiceClassAndJpaFilteringEntityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stringBob: expect.any(Object),
            stringRequiredBob: expect.any(Object),
            stringMinlengthBob: expect.any(Object),
            stringMaxlengthBob: expect.any(Object),
            stringPatternBob: expect.any(Object),
            integerBob: expect.any(Object),
            integerRequiredBob: expect.any(Object),
            integerMinBob: expect.any(Object),
            integerMaxBob: expect.any(Object),
            longBob: expect.any(Object),
            longRequiredBob: expect.any(Object),
            longMinBob: expect.any(Object),
            longMaxBob: expect.any(Object),
            floatBob: expect.any(Object),
            floatRequiredBob: expect.any(Object),
            floatMinBob: expect.any(Object),
            floatMaxBob: expect.any(Object),
            doubleRequiredBob: expect.any(Object),
            doubleMinBob: expect.any(Object),
            doubleMaxBob: expect.any(Object),
            bigDecimalRequiredBob: expect.any(Object),
            bigDecimalMinBob: expect.any(Object),
            bigDecimalMaxBob: expect.any(Object),
            localDateBob: expect.any(Object),
            localDateRequiredBob: expect.any(Object),
            instantBob: expect.any(Object),
            instanteRequiredBob: expect.any(Object),
            zonedDateTimeBob: expect.any(Object),
            zonedDateTimeRequiredBob: expect.any(Object),
            durationBob: expect.any(Object),
            durationRequiredBob: expect.any(Object),
            booleanBob: expect.any(Object),
            booleanRequiredBob: expect.any(Object),
            enumBob: expect.any(Object),
            enumRequiredBob: expect.any(Object),
            uuidBob: expect.any(Object),
            uuidRequiredBob: expect.any(Object),
            byteImageBob: expect.any(Object),
            byteImageRequiredBob: expect.any(Object),
            byteImageMinbytesBob: expect.any(Object),
            byteImageMaxbytesBob: expect.any(Object),
            byteAnyBob: expect.any(Object),
            byteAnyRequiredBob: expect.any(Object),
            byteAnyMinbytesBob: expect.any(Object),
            byteAnyMaxbytesBob: expect.any(Object),
            byteTextBob: expect.any(Object),
            byteTextRequiredBob: expect.any(Object),
          })
        );
      });

      it('passing IFieldTestServiceClassAndJpaFilteringEntity should create a new form with FormGroup', () => {
        const formGroup = service.createFieldTestServiceClassAndJpaFilteringEntityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stringBob: expect.any(Object),
            stringRequiredBob: expect.any(Object),
            stringMinlengthBob: expect.any(Object),
            stringMaxlengthBob: expect.any(Object),
            stringPatternBob: expect.any(Object),
            integerBob: expect.any(Object),
            integerRequiredBob: expect.any(Object),
            integerMinBob: expect.any(Object),
            integerMaxBob: expect.any(Object),
            longBob: expect.any(Object),
            longRequiredBob: expect.any(Object),
            longMinBob: expect.any(Object),
            longMaxBob: expect.any(Object),
            floatBob: expect.any(Object),
            floatRequiredBob: expect.any(Object),
            floatMinBob: expect.any(Object),
            floatMaxBob: expect.any(Object),
            doubleRequiredBob: expect.any(Object),
            doubleMinBob: expect.any(Object),
            doubleMaxBob: expect.any(Object),
            bigDecimalRequiredBob: expect.any(Object),
            bigDecimalMinBob: expect.any(Object),
            bigDecimalMaxBob: expect.any(Object),
            localDateBob: expect.any(Object),
            localDateRequiredBob: expect.any(Object),
            instantBob: expect.any(Object),
            instanteRequiredBob: expect.any(Object),
            zonedDateTimeBob: expect.any(Object),
            zonedDateTimeRequiredBob: expect.any(Object),
            durationBob: expect.any(Object),
            durationRequiredBob: expect.any(Object),
            booleanBob: expect.any(Object),
            booleanRequiredBob: expect.any(Object),
            enumBob: expect.any(Object),
            enumRequiredBob: expect.any(Object),
            uuidBob: expect.any(Object),
            uuidRequiredBob: expect.any(Object),
            byteImageBob: expect.any(Object),
            byteImageRequiredBob: expect.any(Object),
            byteImageMinbytesBob: expect.any(Object),
            byteImageMaxbytesBob: expect.any(Object),
            byteAnyBob: expect.any(Object),
            byteAnyRequiredBob: expect.any(Object),
            byteAnyMinbytesBob: expect.any(Object),
            byteAnyMaxbytesBob: expect.any(Object),
            byteTextBob: expect.any(Object),
            byteTextRequiredBob: expect.any(Object),
          })
        );
      });
    });

    describe('getFieldTestServiceClassAndJpaFilteringEntity', () => {
      it('should return NewFieldTestServiceClassAndJpaFilteringEntity for default FieldTestServiceClassAndJpaFilteringEntity initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFieldTestServiceClassAndJpaFilteringEntityFormGroup(sampleWithNewData);

        const fieldTestServiceClassAndJpaFilteringEntity = service.getFieldTestServiceClassAndJpaFilteringEntity(formGroup) as any;

        expect(fieldTestServiceClassAndJpaFilteringEntity).toMatchObject(sampleWithNewData);
      });

      it('should return NewFieldTestServiceClassAndJpaFilteringEntity for empty FieldTestServiceClassAndJpaFilteringEntity initial value', () => {
        const formGroup = service.createFieldTestServiceClassAndJpaFilteringEntityFormGroup();

        const fieldTestServiceClassAndJpaFilteringEntity = service.getFieldTestServiceClassAndJpaFilteringEntity(formGroup) as any;

        expect(fieldTestServiceClassAndJpaFilteringEntity).toMatchObject({});
      });

      it('should return IFieldTestServiceClassAndJpaFilteringEntity', () => {
        const formGroup = service.createFieldTestServiceClassAndJpaFilteringEntityFormGroup(sampleWithRequiredData);

        const fieldTestServiceClassAndJpaFilteringEntity = service.getFieldTestServiceClassAndJpaFilteringEntity(formGroup) as any;

        expect(fieldTestServiceClassAndJpaFilteringEntity).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFieldTestServiceClassAndJpaFilteringEntity should not enable id FormControl', () => {
        const formGroup = service.createFieldTestServiceClassAndJpaFilteringEntityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFieldTestServiceClassAndJpaFilteringEntity should disable id FormControl', () => {
        const formGroup = service.createFieldTestServiceClassAndJpaFilteringEntityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
