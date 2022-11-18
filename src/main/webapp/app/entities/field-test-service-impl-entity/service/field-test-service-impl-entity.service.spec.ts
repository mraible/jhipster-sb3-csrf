import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IFieldTestServiceImplEntity } from '../field-test-service-impl-entity.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../field-test-service-impl-entity.test-samples';

import { FieldTestServiceImplEntityService, RestFieldTestServiceImplEntity } from './field-test-service-impl-entity.service';

const requireRestSample: RestFieldTestServiceImplEntity = {
  ...sampleWithRequiredData,
  localDateMika: sampleWithRequiredData.localDateMika?.format(DATE_FORMAT),
  localDateRequiredMika: sampleWithRequiredData.localDateRequiredMika?.format(DATE_FORMAT),
  instantMika: sampleWithRequiredData.instantMika?.toJSON(),
  instanteRequiredMika: sampleWithRequiredData.instanteRequiredMika?.toJSON(),
  zonedDateTimeMika: sampleWithRequiredData.zonedDateTimeMika?.toJSON(),
  zonedDateTimeRequiredMika: sampleWithRequiredData.zonedDateTimeRequiredMika?.toJSON(),
};

describe('FieldTestServiceImplEntity Service', () => {
  let service: FieldTestServiceImplEntityService;
  let httpMock: HttpTestingController;
  let expectedResult: IFieldTestServiceImplEntity | IFieldTestServiceImplEntity[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FieldTestServiceImplEntityService);
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

    it('should create a FieldTestServiceImplEntity', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fieldTestServiceImplEntity = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fieldTestServiceImplEntity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FieldTestServiceImplEntity', () => {
      const fieldTestServiceImplEntity = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fieldTestServiceImplEntity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FieldTestServiceImplEntity', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FieldTestServiceImplEntity', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FieldTestServiceImplEntity', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFieldTestServiceImplEntityToCollectionIfMissing', () => {
      it('should add a FieldTestServiceImplEntity to an empty array', () => {
        const fieldTestServiceImplEntity: IFieldTestServiceImplEntity = sampleWithRequiredData;
        expectedResult = service.addFieldTestServiceImplEntityToCollectionIfMissing([], fieldTestServiceImplEntity);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fieldTestServiceImplEntity);
      });

      it('should not add a FieldTestServiceImplEntity to an array that contains it', () => {
        const fieldTestServiceImplEntity: IFieldTestServiceImplEntity = sampleWithRequiredData;
        const fieldTestServiceImplEntityCollection: IFieldTestServiceImplEntity[] = [
          {
            ...fieldTestServiceImplEntity,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFieldTestServiceImplEntityToCollectionIfMissing(
          fieldTestServiceImplEntityCollection,
          fieldTestServiceImplEntity
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FieldTestServiceImplEntity to an array that doesn't contain it", () => {
        const fieldTestServiceImplEntity: IFieldTestServiceImplEntity = sampleWithRequiredData;
        const fieldTestServiceImplEntityCollection: IFieldTestServiceImplEntity[] = [sampleWithPartialData];
        expectedResult = service.addFieldTestServiceImplEntityToCollectionIfMissing(
          fieldTestServiceImplEntityCollection,
          fieldTestServiceImplEntity
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fieldTestServiceImplEntity);
      });

      it('should add only unique FieldTestServiceImplEntity to an array', () => {
        const fieldTestServiceImplEntityArray: IFieldTestServiceImplEntity[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const fieldTestServiceImplEntityCollection: IFieldTestServiceImplEntity[] = [sampleWithRequiredData];
        expectedResult = service.addFieldTestServiceImplEntityToCollectionIfMissing(
          fieldTestServiceImplEntityCollection,
          ...fieldTestServiceImplEntityArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fieldTestServiceImplEntity: IFieldTestServiceImplEntity = sampleWithRequiredData;
        const fieldTestServiceImplEntity2: IFieldTestServiceImplEntity = sampleWithPartialData;
        expectedResult = service.addFieldTestServiceImplEntityToCollectionIfMissing(
          [],
          fieldTestServiceImplEntity,
          fieldTestServiceImplEntity2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fieldTestServiceImplEntity);
        expect(expectedResult).toContain(fieldTestServiceImplEntity2);
      });

      it('should accept null and undefined values', () => {
        const fieldTestServiceImplEntity: IFieldTestServiceImplEntity = sampleWithRequiredData;
        expectedResult = service.addFieldTestServiceImplEntityToCollectionIfMissing([], null, fieldTestServiceImplEntity, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fieldTestServiceImplEntity);
      });

      it('should return initial array if no FieldTestServiceImplEntity is added', () => {
        const fieldTestServiceImplEntityCollection: IFieldTestServiceImplEntity[] = [sampleWithRequiredData];
        expectedResult = service.addFieldTestServiceImplEntityToCollectionIfMissing(fieldTestServiceImplEntityCollection, undefined, null);
        expect(expectedResult).toEqual(fieldTestServiceImplEntityCollection);
      });
    });

    describe('compareFieldTestServiceImplEntity', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFieldTestServiceImplEntity(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareFieldTestServiceImplEntity(entity1, entity2);
        const compareResult2 = service.compareFieldTestServiceImplEntity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareFieldTestServiceImplEntity(entity1, entity2);
        const compareResult2 = service.compareFieldTestServiceImplEntity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareFieldTestServiceImplEntity(entity1, entity2);
        const compareResult2 = service.compareFieldTestServiceImplEntity(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
