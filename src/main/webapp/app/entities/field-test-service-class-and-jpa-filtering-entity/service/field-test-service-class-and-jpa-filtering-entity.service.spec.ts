import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IFieldTestServiceClassAndJpaFilteringEntity } from '../field-test-service-class-and-jpa-filtering-entity.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../field-test-service-class-and-jpa-filtering-entity.test-samples';

import {
  FieldTestServiceClassAndJpaFilteringEntityService,
  RestFieldTestServiceClassAndJpaFilteringEntity,
} from './field-test-service-class-and-jpa-filtering-entity.service';

const requireRestSample: RestFieldTestServiceClassAndJpaFilteringEntity = {
  ...sampleWithRequiredData,
  localDateBob: sampleWithRequiredData.localDateBob?.format(DATE_FORMAT),
  localDateRequiredBob: sampleWithRequiredData.localDateRequiredBob?.format(DATE_FORMAT),
  instantBob: sampleWithRequiredData.instantBob?.toJSON(),
  instanteRequiredBob: sampleWithRequiredData.instanteRequiredBob?.toJSON(),
  zonedDateTimeBob: sampleWithRequiredData.zonedDateTimeBob?.toJSON(),
  zonedDateTimeRequiredBob: sampleWithRequiredData.zonedDateTimeRequiredBob?.toJSON(),
};

describe('FieldTestServiceClassAndJpaFilteringEntity Service', () => {
  let service: FieldTestServiceClassAndJpaFilteringEntityService;
  let httpMock: HttpTestingController;
  let expectedResult: IFieldTestServiceClassAndJpaFilteringEntity | IFieldTestServiceClassAndJpaFilteringEntity[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FieldTestServiceClassAndJpaFilteringEntityService);
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

    it('should create a FieldTestServiceClassAndJpaFilteringEntity', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fieldTestServiceClassAndJpaFilteringEntity = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fieldTestServiceClassAndJpaFilteringEntity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FieldTestServiceClassAndJpaFilteringEntity', () => {
      const fieldTestServiceClassAndJpaFilteringEntity = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fieldTestServiceClassAndJpaFilteringEntity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FieldTestServiceClassAndJpaFilteringEntity', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FieldTestServiceClassAndJpaFilteringEntity', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FieldTestServiceClassAndJpaFilteringEntity', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFieldTestServiceClassAndJpaFilteringEntityToCollectionIfMissing', () => {
      it('should add a FieldTestServiceClassAndJpaFilteringEntity to an empty array', () => {
        const fieldTestServiceClassAndJpaFilteringEntity: IFieldTestServiceClassAndJpaFilteringEntity = sampleWithRequiredData;
        expectedResult = service.addFieldTestServiceClassAndJpaFilteringEntityToCollectionIfMissing(
          [],
          fieldTestServiceClassAndJpaFilteringEntity
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fieldTestServiceClassAndJpaFilteringEntity);
      });

      it('should not add a FieldTestServiceClassAndJpaFilteringEntity to an array that contains it', () => {
        const fieldTestServiceClassAndJpaFilteringEntity: IFieldTestServiceClassAndJpaFilteringEntity = sampleWithRequiredData;
        const fieldTestServiceClassAndJpaFilteringEntityCollection: IFieldTestServiceClassAndJpaFilteringEntity[] = [
          {
            ...fieldTestServiceClassAndJpaFilteringEntity,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFieldTestServiceClassAndJpaFilteringEntityToCollectionIfMissing(
          fieldTestServiceClassAndJpaFilteringEntityCollection,
          fieldTestServiceClassAndJpaFilteringEntity
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FieldTestServiceClassAndJpaFilteringEntity to an array that doesn't contain it", () => {
        const fieldTestServiceClassAndJpaFilteringEntity: IFieldTestServiceClassAndJpaFilteringEntity = sampleWithRequiredData;
        const fieldTestServiceClassAndJpaFilteringEntityCollection: IFieldTestServiceClassAndJpaFilteringEntity[] = [sampleWithPartialData];
        expectedResult = service.addFieldTestServiceClassAndJpaFilteringEntityToCollectionIfMissing(
          fieldTestServiceClassAndJpaFilteringEntityCollection,
          fieldTestServiceClassAndJpaFilteringEntity
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fieldTestServiceClassAndJpaFilteringEntity);
      });

      it('should add only unique FieldTestServiceClassAndJpaFilteringEntity to an array', () => {
        const fieldTestServiceClassAndJpaFilteringEntityArray: IFieldTestServiceClassAndJpaFilteringEntity[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const fieldTestServiceClassAndJpaFilteringEntityCollection: IFieldTestServiceClassAndJpaFilteringEntity[] = [
          sampleWithRequiredData,
        ];
        expectedResult = service.addFieldTestServiceClassAndJpaFilteringEntityToCollectionIfMissing(
          fieldTestServiceClassAndJpaFilteringEntityCollection,
          ...fieldTestServiceClassAndJpaFilteringEntityArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fieldTestServiceClassAndJpaFilteringEntity: IFieldTestServiceClassAndJpaFilteringEntity = sampleWithRequiredData;
        const fieldTestServiceClassAndJpaFilteringEntity2: IFieldTestServiceClassAndJpaFilteringEntity = sampleWithPartialData;
        expectedResult = service.addFieldTestServiceClassAndJpaFilteringEntityToCollectionIfMissing(
          [],
          fieldTestServiceClassAndJpaFilteringEntity,
          fieldTestServiceClassAndJpaFilteringEntity2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fieldTestServiceClassAndJpaFilteringEntity);
        expect(expectedResult).toContain(fieldTestServiceClassAndJpaFilteringEntity2);
      });

      it('should accept null and undefined values', () => {
        const fieldTestServiceClassAndJpaFilteringEntity: IFieldTestServiceClassAndJpaFilteringEntity = sampleWithRequiredData;
        expectedResult = service.addFieldTestServiceClassAndJpaFilteringEntityToCollectionIfMissing(
          [],
          null,
          fieldTestServiceClassAndJpaFilteringEntity,
          undefined
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fieldTestServiceClassAndJpaFilteringEntity);
      });

      it('should return initial array if no FieldTestServiceClassAndJpaFilteringEntity is added', () => {
        const fieldTestServiceClassAndJpaFilteringEntityCollection: IFieldTestServiceClassAndJpaFilteringEntity[] = [
          sampleWithRequiredData,
        ];
        expectedResult = service.addFieldTestServiceClassAndJpaFilteringEntityToCollectionIfMissing(
          fieldTestServiceClassAndJpaFilteringEntityCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(fieldTestServiceClassAndJpaFilteringEntityCollection);
      });
    });

    describe('compareFieldTestServiceClassAndJpaFilteringEntity', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFieldTestServiceClassAndJpaFilteringEntity(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareFieldTestServiceClassAndJpaFilteringEntity(entity1, entity2);
        const compareResult2 = service.compareFieldTestServiceClassAndJpaFilteringEntity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareFieldTestServiceClassAndJpaFilteringEntity(entity1, entity2);
        const compareResult2 = service.compareFieldTestServiceClassAndJpaFilteringEntity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareFieldTestServiceClassAndJpaFilteringEntity(entity1, entity2);
        const compareResult2 = service.compareFieldTestServiceClassAndJpaFilteringEntity(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
