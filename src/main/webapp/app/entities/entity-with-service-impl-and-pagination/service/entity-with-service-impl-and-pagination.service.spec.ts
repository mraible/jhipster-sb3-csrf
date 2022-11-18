import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEntityWithServiceImplAndPagination } from '../entity-with-service-impl-and-pagination.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../entity-with-service-impl-and-pagination.test-samples';

import { EntityWithServiceImplAndPaginationService } from './entity-with-service-impl-and-pagination.service';

const requireRestSample: IEntityWithServiceImplAndPagination = {
  ...sampleWithRequiredData,
};

describe('EntityWithServiceImplAndPagination Service', () => {
  let service: EntityWithServiceImplAndPaginationService;
  let httpMock: HttpTestingController;
  let expectedResult: IEntityWithServiceImplAndPagination | IEntityWithServiceImplAndPagination[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EntityWithServiceImplAndPaginationService);
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

    it('should create a EntityWithServiceImplAndPagination', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const entityWithServiceImplAndPagination = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(entityWithServiceImplAndPagination).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EntityWithServiceImplAndPagination', () => {
      const entityWithServiceImplAndPagination = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(entityWithServiceImplAndPagination).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EntityWithServiceImplAndPagination', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EntityWithServiceImplAndPagination', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EntityWithServiceImplAndPagination', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEntityWithServiceImplAndPaginationToCollectionIfMissing', () => {
      it('should add a EntityWithServiceImplAndPagination to an empty array', () => {
        const entityWithServiceImplAndPagination: IEntityWithServiceImplAndPagination = sampleWithRequiredData;
        expectedResult = service.addEntityWithServiceImplAndPaginationToCollectionIfMissing([], entityWithServiceImplAndPagination);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entityWithServiceImplAndPagination);
      });

      it('should not add a EntityWithServiceImplAndPagination to an array that contains it', () => {
        const entityWithServiceImplAndPagination: IEntityWithServiceImplAndPagination = sampleWithRequiredData;
        const entityWithServiceImplAndPaginationCollection: IEntityWithServiceImplAndPagination[] = [
          {
            ...entityWithServiceImplAndPagination,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEntityWithServiceImplAndPaginationToCollectionIfMissing(
          entityWithServiceImplAndPaginationCollection,
          entityWithServiceImplAndPagination
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EntityWithServiceImplAndPagination to an array that doesn't contain it", () => {
        const entityWithServiceImplAndPagination: IEntityWithServiceImplAndPagination = sampleWithRequiredData;
        const entityWithServiceImplAndPaginationCollection: IEntityWithServiceImplAndPagination[] = [sampleWithPartialData];
        expectedResult = service.addEntityWithServiceImplAndPaginationToCollectionIfMissing(
          entityWithServiceImplAndPaginationCollection,
          entityWithServiceImplAndPagination
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entityWithServiceImplAndPagination);
      });

      it('should add only unique EntityWithServiceImplAndPagination to an array', () => {
        const entityWithServiceImplAndPaginationArray: IEntityWithServiceImplAndPagination[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const entityWithServiceImplAndPaginationCollection: IEntityWithServiceImplAndPagination[] = [sampleWithRequiredData];
        expectedResult = service.addEntityWithServiceImplAndPaginationToCollectionIfMissing(
          entityWithServiceImplAndPaginationCollection,
          ...entityWithServiceImplAndPaginationArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const entityWithServiceImplAndPagination: IEntityWithServiceImplAndPagination = sampleWithRequiredData;
        const entityWithServiceImplAndPagination2: IEntityWithServiceImplAndPagination = sampleWithPartialData;
        expectedResult = service.addEntityWithServiceImplAndPaginationToCollectionIfMissing(
          [],
          entityWithServiceImplAndPagination,
          entityWithServiceImplAndPagination2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entityWithServiceImplAndPagination);
        expect(expectedResult).toContain(entityWithServiceImplAndPagination2);
      });

      it('should accept null and undefined values', () => {
        const entityWithServiceImplAndPagination: IEntityWithServiceImplAndPagination = sampleWithRequiredData;
        expectedResult = service.addEntityWithServiceImplAndPaginationToCollectionIfMissing(
          [],
          null,
          entityWithServiceImplAndPagination,
          undefined
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entityWithServiceImplAndPagination);
      });

      it('should return initial array if no EntityWithServiceImplAndPagination is added', () => {
        const entityWithServiceImplAndPaginationCollection: IEntityWithServiceImplAndPagination[] = [sampleWithRequiredData];
        expectedResult = service.addEntityWithServiceImplAndPaginationToCollectionIfMissing(
          entityWithServiceImplAndPaginationCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(entityWithServiceImplAndPaginationCollection);
      });
    });

    describe('compareEntityWithServiceImplAndPagination', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEntityWithServiceImplAndPagination(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareEntityWithServiceImplAndPagination(entity1, entity2);
        const compareResult2 = service.compareEntityWithServiceImplAndPagination(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareEntityWithServiceImplAndPagination(entity1, entity2);
        const compareResult2 = service.compareEntityWithServiceImplAndPagination(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareEntityWithServiceImplAndPagination(entity1, entity2);
        const compareResult2 = service.compareEntityWithServiceImplAndPagination(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
