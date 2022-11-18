import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IFieldTestMapstructAndServiceClassEntity } from '../field-test-mapstruct-and-service-class-entity.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../field-test-mapstruct-and-service-class-entity.test-samples';

import {
  FieldTestMapstructAndServiceClassEntityService,
  RestFieldTestMapstructAndServiceClassEntity,
} from './field-test-mapstruct-and-service-class-entity.service';

const requireRestSample: RestFieldTestMapstructAndServiceClassEntity = {
  ...sampleWithRequiredData,
  localDateEva: sampleWithRequiredData.localDateEva?.format(DATE_FORMAT),
  localDateRequiredEva: sampleWithRequiredData.localDateRequiredEva?.format(DATE_FORMAT),
  instantEva: sampleWithRequiredData.instantEva?.toJSON(),
  instanteRequiredEva: sampleWithRequiredData.instanteRequiredEva?.toJSON(),
  zonedDateTimeEva: sampleWithRequiredData.zonedDateTimeEva?.toJSON(),
  zonedDateTimeRequiredEva: sampleWithRequiredData.zonedDateTimeRequiredEva?.toJSON(),
};

describe('FieldTestMapstructAndServiceClassEntity Service', () => {
  let service: FieldTestMapstructAndServiceClassEntityService;
  let httpMock: HttpTestingController;
  let expectedResult: IFieldTestMapstructAndServiceClassEntity | IFieldTestMapstructAndServiceClassEntity[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FieldTestMapstructAndServiceClassEntityService);
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

    it('should create a FieldTestMapstructAndServiceClassEntity', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fieldTestMapstructAndServiceClassEntity = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fieldTestMapstructAndServiceClassEntity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FieldTestMapstructAndServiceClassEntity', () => {
      const fieldTestMapstructAndServiceClassEntity = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fieldTestMapstructAndServiceClassEntity).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FieldTestMapstructAndServiceClassEntity', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FieldTestMapstructAndServiceClassEntity', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FieldTestMapstructAndServiceClassEntity', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFieldTestMapstructAndServiceClassEntityToCollectionIfMissing', () => {
      it('should add a FieldTestMapstructAndServiceClassEntity to an empty array', () => {
        const fieldTestMapstructAndServiceClassEntity: IFieldTestMapstructAndServiceClassEntity = sampleWithRequiredData;
        expectedResult = service.addFieldTestMapstructAndServiceClassEntityToCollectionIfMissing(
          [],
          fieldTestMapstructAndServiceClassEntity
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fieldTestMapstructAndServiceClassEntity);
      });

      it('should not add a FieldTestMapstructAndServiceClassEntity to an array that contains it', () => {
        const fieldTestMapstructAndServiceClassEntity: IFieldTestMapstructAndServiceClassEntity = sampleWithRequiredData;
        const fieldTestMapstructAndServiceClassEntityCollection: IFieldTestMapstructAndServiceClassEntity[] = [
          {
            ...fieldTestMapstructAndServiceClassEntity,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFieldTestMapstructAndServiceClassEntityToCollectionIfMissing(
          fieldTestMapstructAndServiceClassEntityCollection,
          fieldTestMapstructAndServiceClassEntity
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FieldTestMapstructAndServiceClassEntity to an array that doesn't contain it", () => {
        const fieldTestMapstructAndServiceClassEntity: IFieldTestMapstructAndServiceClassEntity = sampleWithRequiredData;
        const fieldTestMapstructAndServiceClassEntityCollection: IFieldTestMapstructAndServiceClassEntity[] = [sampleWithPartialData];
        expectedResult = service.addFieldTestMapstructAndServiceClassEntityToCollectionIfMissing(
          fieldTestMapstructAndServiceClassEntityCollection,
          fieldTestMapstructAndServiceClassEntity
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fieldTestMapstructAndServiceClassEntity);
      });

      it('should add only unique FieldTestMapstructAndServiceClassEntity to an array', () => {
        const fieldTestMapstructAndServiceClassEntityArray: IFieldTestMapstructAndServiceClassEntity[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const fieldTestMapstructAndServiceClassEntityCollection: IFieldTestMapstructAndServiceClassEntity[] = [sampleWithRequiredData];
        expectedResult = service.addFieldTestMapstructAndServiceClassEntityToCollectionIfMissing(
          fieldTestMapstructAndServiceClassEntityCollection,
          ...fieldTestMapstructAndServiceClassEntityArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fieldTestMapstructAndServiceClassEntity: IFieldTestMapstructAndServiceClassEntity = sampleWithRequiredData;
        const fieldTestMapstructAndServiceClassEntity2: IFieldTestMapstructAndServiceClassEntity = sampleWithPartialData;
        expectedResult = service.addFieldTestMapstructAndServiceClassEntityToCollectionIfMissing(
          [],
          fieldTestMapstructAndServiceClassEntity,
          fieldTestMapstructAndServiceClassEntity2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fieldTestMapstructAndServiceClassEntity);
        expect(expectedResult).toContain(fieldTestMapstructAndServiceClassEntity2);
      });

      it('should accept null and undefined values', () => {
        const fieldTestMapstructAndServiceClassEntity: IFieldTestMapstructAndServiceClassEntity = sampleWithRequiredData;
        expectedResult = service.addFieldTestMapstructAndServiceClassEntityToCollectionIfMissing(
          [],
          null,
          fieldTestMapstructAndServiceClassEntity,
          undefined
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fieldTestMapstructAndServiceClassEntity);
      });

      it('should return initial array if no FieldTestMapstructAndServiceClassEntity is added', () => {
        const fieldTestMapstructAndServiceClassEntityCollection: IFieldTestMapstructAndServiceClassEntity[] = [sampleWithRequiredData];
        expectedResult = service.addFieldTestMapstructAndServiceClassEntityToCollectionIfMissing(
          fieldTestMapstructAndServiceClassEntityCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(fieldTestMapstructAndServiceClassEntityCollection);
      });
    });

    describe('compareFieldTestMapstructAndServiceClassEntity', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFieldTestMapstructAndServiceClassEntity(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareFieldTestMapstructAndServiceClassEntity(entity1, entity2);
        const compareResult2 = service.compareFieldTestMapstructAndServiceClassEntity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareFieldTestMapstructAndServiceClassEntity(entity1, entity2);
        const compareResult2 = service.compareFieldTestMapstructAndServiceClassEntity(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareFieldTestMapstructAndServiceClassEntity(entity1, entity2);
        const compareResult2 = service.compareFieldTestMapstructAndServiceClassEntity(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
