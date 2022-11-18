import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDocumentBankAccount } from '../document-bank-account.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../document-bank-account.test-samples';

import { DocumentBankAccountService, RestDocumentBankAccount } from './document-bank-account.service';

const requireRestSample: RestDocumentBankAccount = {
  ...sampleWithRequiredData,
  openingDay: sampleWithRequiredData.openingDay?.format(DATE_FORMAT),
  lastOperationDate: sampleWithRequiredData.lastOperationDate?.toJSON(),
};

describe('DocumentBankAccount Service', () => {
  let service: DocumentBankAccountService;
  let httpMock: HttpTestingController;
  let expectedResult: IDocumentBankAccount | IDocumentBankAccount[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DocumentBankAccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a DocumentBankAccount', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const documentBankAccount = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(documentBankAccount).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DocumentBankAccount', () => {
      const documentBankAccount = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(documentBankAccount).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DocumentBankAccount', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DocumentBankAccount', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DocumentBankAccount', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDocumentBankAccountToCollectionIfMissing', () => {
      it('should add a DocumentBankAccount to an empty array', () => {
        const documentBankAccount: IDocumentBankAccount = sampleWithRequiredData;
        expectedResult = service.addDocumentBankAccountToCollectionIfMissing([], documentBankAccount);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(documentBankAccount);
      });

      it('should not add a DocumentBankAccount to an array that contains it', () => {
        const documentBankAccount: IDocumentBankAccount = sampleWithRequiredData;
        const documentBankAccountCollection: IDocumentBankAccount[] = [
          {
            ...documentBankAccount,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDocumentBankAccountToCollectionIfMissing(documentBankAccountCollection, documentBankAccount);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DocumentBankAccount to an array that doesn't contain it", () => {
        const documentBankAccount: IDocumentBankAccount = sampleWithRequiredData;
        const documentBankAccountCollection: IDocumentBankAccount[] = [sampleWithPartialData];
        expectedResult = service.addDocumentBankAccountToCollectionIfMissing(documentBankAccountCollection, documentBankAccount);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(documentBankAccount);
      });

      it('should add only unique DocumentBankAccount to an array', () => {
        const documentBankAccountArray: IDocumentBankAccount[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const documentBankAccountCollection: IDocumentBankAccount[] = [sampleWithRequiredData];
        expectedResult = service.addDocumentBankAccountToCollectionIfMissing(documentBankAccountCollection, ...documentBankAccountArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const documentBankAccount: IDocumentBankAccount = sampleWithRequiredData;
        const documentBankAccount2: IDocumentBankAccount = sampleWithPartialData;
        expectedResult = service.addDocumentBankAccountToCollectionIfMissing([], documentBankAccount, documentBankAccount2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(documentBankAccount);
        expect(expectedResult).toContain(documentBankAccount2);
      });

      it('should accept null and undefined values', () => {
        const documentBankAccount: IDocumentBankAccount = sampleWithRequiredData;
        expectedResult = service.addDocumentBankAccountToCollectionIfMissing([], null, documentBankAccount, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(documentBankAccount);
      });

      it('should return initial array if no DocumentBankAccount is added', () => {
        const documentBankAccountCollection: IDocumentBankAccount[] = [sampleWithRequiredData];
        expectedResult = service.addDocumentBankAccountToCollectionIfMissing(documentBankAccountCollection, undefined, null);
        expect(expectedResult).toEqual(documentBankAccountCollection);
      });
    });

    describe('compareDocumentBankAccount', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDocumentBankAccount(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareDocumentBankAccount(entity1, entity2);
        const compareResult2 = service.compareDocumentBankAccount(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareDocumentBankAccount(entity1, entity2);
        const compareResult2 = service.compareDocumentBankAccount(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareDocumentBankAccount(entity1, entity2);
        const compareResult2 = service.compareDocumentBankAccount(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
