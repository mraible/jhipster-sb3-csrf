import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IFieldTestEntity } from '../field-test-entity.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../field-test-entity.test-samples';

import { FieldTestEntityService, RestFieldTestEntity } from './field-test-entity.service';

const requireRestSample: RestFieldTestEntity = {
  ...sampleWithRequiredData,
  localDateTom: sampleWithRequiredData.localDateTom?.format(DATE_FORMAT),
  localDateRequiredTom: sampleWithRequiredData.localDateRequiredTom?.format(DATE_FORMAT),
  instantTom: sampleWithRequiredData.instantTom?.toJSON(),
  instantRequiredTom: sampleWithRequiredData.instantRequiredTom?.toJSON(),
  zonedDateTimeTom: sampleWithRequiredData.zonedDateTimeTom?.toJSON(),
  zonedDateTimeRequiredTom: sampleWithRequiredData.zonedDateTimeRequiredTom?.toJSON(),
};

describe('FieldTestEntity Service', () => {
  let service: FieldTestEntityService;
  let httpMock: HttpTestingController;
  let expectedResult: IFieldTestEntity | IFieldTestEntity[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FieldTestEntityService);
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

    it('should create a FieldTestEntity', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fieldTestEntity = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fieldTestEntity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FieldTestEntity', () => {
      const fieldTestEntity = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fieldTestEntity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FieldTestEntity', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FieldTestEntity', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FieldTestEntity', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFieldTestEntityToCollectionIfMissing', () => {
      it('should add a FieldTestEntity to an empty array', () => {
        const fieldTestEntity: IFieldTestEntity = sampleWithRequiredData;
        expectedResult = service.addFieldTestEntityToCollectionIfMissing([], fieldTestEntity);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fieldTestEntity);
      });

      it('should not add a FieldTestEntity to an array that contains it', () => {
        const fieldTestEntity: IFieldTestEntity = sampleWithRequiredData;
        const fieldTestEntityCollection: IFieldTestEntity[] = [
          {
            ...fieldTestEntity,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFieldTestEntityToCollectionIfMissing(fieldTestEntityCollection, fieldTestEntity);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FieldTestEntity to an array that doesn't contain it", () => {
        const fieldTestEntity: IFieldTestEntity = sampleWithRequiredData;
        const fieldTestEntityCollection: IFieldTestEntity[] = [sampleWithPartialData];
        expectedResult = service.addFieldTestEntityToCollectionIfMissing(fieldTestEntityCollection, fieldTestEntity);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fieldTestEntity);
      });

      it('should add only unique FieldTestEntity to an array', () => {
        const fieldTestEntityArray: IFieldTestEntity[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fieldTestEntityCollection: IFieldTestEntity[] = [sampleWithRequiredData];
        expectedResult = service.addFieldTestEntityToCollectionIfMissing(fieldTestEntityCollection, ...fieldTestEntityArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fieldTestEntity: IFieldTestEntity = sampleWithRequiredData;
        const fieldTestEntity2: IFieldTestEntity = sampleWithPartialData;
        expectedResult = service.addFieldTestEntityToCollectionIfMissing([], fieldTestEntity, fieldTestEntity2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fieldTestEntity);
        expect(expectedResult).toContain(fieldTestEntity2);
      });

      it('should accept null and undefined values', () => {
        const fieldTestEntity: IFieldTestEntity = sampleWithRequiredData;
        expectedResult = service.addFieldTestEntityToCollectionIfMissing([], null, fieldTestEntity, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fieldTestEntity);
      });

      it('should return initial array if no FieldTestEntity is added', () => {
        const fieldTestEntityCollection: IFieldTestEntity[] = [sampleWithRequiredData];
        expectedResult = service.addFieldTestEntityToCollectionIfMissing(fieldTestEntityCollection, undefined, null);
        expect(expectedResult).toEqual(fieldTestEntityCollection);
      });
    });

    describe('compareFieldTestEntity', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFieldTestEntity(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareFieldTestEntity(entity1, entity2);
        const compareResult2 = service.compareFieldTestEntity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareFieldTestEntity(entity1, entity2);
        const compareResult2 = service.compareFieldTestEntity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareFieldTestEntity(entity1, entity2);
        const compareResult2 = service.compareFieldTestEntity(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
