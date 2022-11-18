import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../document-bank-account.test-samples';

import { DocumentBankAccountFormService } from './document-bank-account-form.service';

describe('DocumentBankAccount Form Service', () => {
  let service: DocumentBankAccountFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentBankAccountFormService);
  });

  describe('Service methods', () => {
    describe('createDocumentBankAccountFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDocumentBankAccountFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            bankNumber: expect.any(Object),
            agencyNumber: expect.any(Object),
            lastOperationDuration: expect.any(Object),
            meanOperationDuration: expect.any(Object),
            balance: expect.any(Object),
            openingDay: expect.any(Object),
            lastOperationDate: expect.any(Object),
            active: expect.any(Object),
            accountType: expect.any(Object),
            attachment: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });

      it('passing IDocumentBankAccount should create a new form with FormGroup', () => {
        const formGroup = service.createDocumentBankAccountFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            bankNumber: expect.any(Object),
            agencyNumber: expect.any(Object),
            lastOperationDuration: expect.any(Object),
            meanOperationDuration: expect.any(Object),
            balance: expect.any(Object),
            openingDay: expect.any(Object),
            lastOperationDate: expect.any(Object),
            active: expect.any(Object),
            accountType: expect.any(Object),
            attachment: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });
    });

    describe('getDocumentBankAccount', () => {
      it('should return NewDocumentBankAccount for default DocumentBankAccount initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDocumentBankAccountFormGroup(sampleWithNewData);

        const documentBankAccount = service.getDocumentBankAccount(formGroup) as any;

        expect(documentBankAccount).toMatchObject(sampleWithNewData);
      });

      it('should return NewDocumentBankAccount for empty DocumentBankAccount initial value', () => {
        const formGroup = service.createDocumentBankAccountFormGroup();

        const documentBankAccount = service.getDocumentBankAccount(formGroup) as any;

        expect(documentBankAccount).toMatchObject({});
      });

      it('should return IDocumentBankAccount', () => {
        const formGroup = service.createDocumentBankAccountFormGroup(sampleWithRequiredData);

        const documentBankAccount = service.getDocumentBankAccount(formGroup) as any;

        expect(documentBankAccount).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDocumentBankAccount should not enable id FormControl', () => {
        const formGroup = service.createDocumentBankAccountFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDocumentBankAccount should disable id FormControl', () => {
        const formGroup = service.createDocumentBankAccountFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
