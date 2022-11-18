import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../field-test-infinite-scroll-entity.test-samples';

import { FieldTestInfiniteScrollEntityFormService } from './field-test-infinite-scroll-entity-form.service';

describe('FieldTestInfiniteScrollEntity Form Service', () => {
  let service: FieldTestInfiniteScrollEntityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldTestInfiniteScrollEntityFormService);
  });

  describe('Service methods', () => {
    describe('createFieldTestInfiniteScrollEntityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFieldTestInfiniteScrollEntityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stringHugo: expect.any(Object),
            stringRequiredHugo: expect.any(Object),
            stringMinlengthHugo: expect.any(Object),
            stringMaxlengthHugo: expect.any(Object),
            stringPatternHugo: expect.any(Object),
            integerHugo: expect.any(Object),
            integerRequiredHugo: expect.any(Object),
            integerMinHugo: expect.any(Object),
            integerMaxHugo: expect.any(Object),
            longHugo: expect.any(Object),
            longRequiredHugo: expect.any(Object),
            longMinHugo: expect.any(Object),
            longMaxHugo: expect.any(Object),
            floatHugo: expect.any(Object),
            floatRequiredHugo: expect.any(Object),
            floatMinHugo: expect.any(Object),
            floatMaxHugo: expect.any(Object),
            doubleRequiredHugo: expect.any(Object),
            doubleMinHugo: expect.any(Object),
            doubleMaxHugo: expect.any(Object),
            bigDecimalRequiredHugo: expect.any(Object),
            bigDecimalMinHugo: expect.any(Object),
            bigDecimalMaxHugo: expect.any(Object),
            localDateHugo: expect.any(Object),
            localDateRequiredHugo: expect.any(Object),
            instantHugo: expect.any(Object),
            instanteRequiredHugo: expect.any(Object),
            zonedDateTimeHugo: expect.any(Object),
            zonedDateTimeRequiredHugo: expect.any(Object),
            durationHugo: expect.any(Object),
            durationRequiredHugo: expect.any(Object),
            booleanHugo: expect.any(Object),
            booleanRequiredHugo: expect.any(Object),
            enumHugo: expect.any(Object),
            enumRequiredHugo: expect.any(Object),
            uuidHugo: expect.any(Object),
            uuidRequiredHugo: expect.any(Object),
            byteImageHugo: expect.any(Object),
            byteImageRequiredHugo: expect.any(Object),
            byteImageMinbytesHugo: expect.any(Object),
            byteImageMaxbytesHugo: expect.any(Object),
            byteAnyHugo: expect.any(Object),
            byteAnyRequiredHugo: expect.any(Object),
            byteAnyMinbytesHugo: expect.any(Object),
            byteAnyMaxbytesHugo: expect.any(Object),
            byteTextHugo: expect.any(Object),
            byteTextRequiredHugo: expect.any(Object),
          })
        );
      });

      it('passing IFieldTestInfiniteScrollEntity should create a new form with FormGroup', () => {
        const formGroup = service.createFieldTestInfiniteScrollEntityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stringHugo: expect.any(Object),
            stringRequiredHugo: expect.any(Object),
            stringMinlengthHugo: expect.any(Object),
            stringMaxlengthHugo: expect.any(Object),
            stringPatternHugo: expect.any(Object),
            integerHugo: expect.any(Object),
            integerRequiredHugo: expect.any(Object),
            integerMinHugo: expect.any(Object),
            integerMaxHugo: expect.any(Object),
            longHugo: expect.any(Object),
            longRequiredHugo: expect.any(Object),
            longMinHugo: expect.any(Object),
            longMaxHugo: expect.any(Object),
            floatHugo: expect.any(Object),
            floatRequiredHugo: expect.any(Object),
            floatMinHugo: expect.any(Object),
            floatMaxHugo: expect.any(Object),
            doubleRequiredHugo: expect.any(Object),
            doubleMinHugo: expect.any(Object),
            doubleMaxHugo: expect.any(Object),
            bigDecimalRequiredHugo: expect.any(Object),
            bigDecimalMinHugo: expect.any(Object),
            bigDecimalMaxHugo: expect.any(Object),
            localDateHugo: expect.any(Object),
            localDateRequiredHugo: expect.any(Object),
            instantHugo: expect.any(Object),
            instanteRequiredHugo: expect.any(Object),
            zonedDateTimeHugo: expect.any(Object),
            zonedDateTimeRequiredHugo: expect.any(Object),
            durationHugo: expect.any(Object),
            durationRequiredHugo: expect.any(Object),
            booleanHugo: expect.any(Object),
            booleanRequiredHugo: expect.any(Object),
            enumHugo: expect.any(Object),
            enumRequiredHugo: expect.any(Object),
            uuidHugo: expect.any(Object),
            uuidRequiredHugo: expect.any(Object),
            byteImageHugo: expect.any(Object),
            byteImageRequiredHugo: expect.any(Object),
            byteImageMinbytesHugo: expect.any(Object),
            byteImageMaxbytesHugo: expect.any(Object),
            byteAnyHugo: expect.any(Object),
            byteAnyRequiredHugo: expect.any(Object),
            byteAnyMinbytesHugo: expect.any(Object),
            byteAnyMaxbytesHugo: expect.any(Object),
            byteTextHugo: expect.any(Object),
            byteTextRequiredHugo: expect.any(Object),
          })
        );
      });
    });

    describe('getFieldTestInfiniteScrollEntity', () => {
      it('should return NewFieldTestInfiniteScrollEntity for default FieldTestInfiniteScrollEntity initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFieldTestInfiniteScrollEntityFormGroup(sampleWithNewData);

        const fieldTestInfiniteScrollEntity = service.getFieldTestInfiniteScrollEntity(formGroup) as any;

        expect(fieldTestInfiniteScrollEntity).toMatchObject(sampleWithNewData);
      });

      it('should return NewFieldTestInfiniteScrollEntity for empty FieldTestInfiniteScrollEntity initial value', () => {
        const formGroup = service.createFieldTestInfiniteScrollEntityFormGroup();

        const fieldTestInfiniteScrollEntity = service.getFieldTestInfiniteScrollEntity(formGroup) as any;

        expect(fieldTestInfiniteScrollEntity).toMatchObject({});
      });

      it('should return IFieldTestInfiniteScrollEntity', () => {
        const formGroup = service.createFieldTestInfiniteScrollEntityFormGroup(sampleWithRequiredData);

        const fieldTestInfiniteScrollEntity = service.getFieldTestInfiniteScrollEntity(formGroup) as any;

        expect(fieldTestInfiniteScrollEntity).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFieldTestInfiniteScrollEntity should not enable id FormControl', () => {
        const formGroup = service.createFieldTestInfiniteScrollEntityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFieldTestInfiniteScrollEntity should disable id FormControl', () => {
        const formGroup = service.createFieldTestInfiniteScrollEntityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
