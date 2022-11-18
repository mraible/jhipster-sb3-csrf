import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEntityWithServiceClassPaginationAndDTO } from '../entity-with-service-class-pagination-and-dto.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../entity-with-service-class-pagination-and-dto.test-samples';

import { EntityWithServiceClassPaginationAndDTOService } from './entity-with-service-class-pagination-and-dto.service';

const requireRestSample: IEntityWithServiceClassPaginationAndDTO = {
  ...sampleWithRequiredData,
};

describe('EntityWithServiceClassPaginationAndDTO Service', () => {
  let service: EntityWithServiceClassPaginationAndDTOService;
  let httpMock: HttpTestingController;
  let expectedResult: IEntityWithServiceClassPaginationAndDTO | IEntityWithServiceClassPaginationAndDTO[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EntityWithServiceClassPaginationAndDTOService);
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

    it('should create a EntityWithServiceClassPaginationAndDTO', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const entityWithServiceClassPaginationAndDTO = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(entityWithServiceClassPaginationAndDTO).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EntityWithServiceClassPaginationAndDTO', () => {
      const entityWithServiceClassPaginationAndDTO = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(entityWithServiceClassPaginationAndDTO).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EntityWithServiceClassPaginationAndDTO', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EntityWithServiceClassPaginationAndDTO', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EntityWithServiceClassPaginationAndDTO', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEntityWithServiceClassPaginationAndDTOToCollectionIfMissing', () => {
      it('should add a EntityWithServiceClassPaginationAndDTO to an empty array', () => {
        const entityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO = sampleWithRequiredData;
        expectedResult = service.addEntityWithServiceClassPaginationAndDTOToCollectionIfMissing([], entityWithServiceClassPaginationAndDTO);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entityWithServiceClassPaginationAndDTO);
      });

      it('should not add a EntityWithServiceClassPaginationAndDTO to an array that contains it', () => {
        const entityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO = sampleWithRequiredData;
        const entityWithServiceClassPaginationAndDTOCollection: IEntityWithServiceClassPaginationAndDTO[] = [
          {
            ...entityWithServiceClassPaginationAndDTO,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEntityWithServiceClassPaginationAndDTOToCollectionIfMissing(
          entityWithServiceClassPaginationAndDTOCollection,
          entityWithServiceClassPaginationAndDTO
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EntityWithServiceClassPaginationAndDTO to an array that doesn't contain it", () => {
        const entityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO = sampleWithRequiredData;
        const entityWithServiceClassPaginationAndDTOCollection: IEntityWithServiceClassPaginationAndDTO[] = [sampleWithPartialData];
        expectedResult = service.addEntityWithServiceClassPaginationAndDTOToCollectionIfMissing(
          entityWithServiceClassPaginationAndDTOCollection,
          entityWithServiceClassPaginationAndDTO
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entityWithServiceClassPaginationAndDTO);
      });

      it('should add only unique EntityWithServiceClassPaginationAndDTO to an array', () => {
        const entityWithServiceClassPaginationAndDTOArray: IEntityWithServiceClassPaginationAndDTO[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const entityWithServiceClassPaginationAndDTOCollection: IEntityWithServiceClassPaginationAndDTO[] = [sampleWithRequiredData];
        expectedResult = service.addEntityWithServiceClassPaginationAndDTOToCollectionIfMissing(
          entityWithServiceClassPaginationAndDTOCollection,
          ...entityWithServiceClassPaginationAndDTOArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const entityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO = sampleWithRequiredData;
        const entityWithServiceClassPaginationAndDTO2: IEntityWithServiceClassPaginationAndDTO = sampleWithPartialData;
        expectedResult = service.addEntityWithServiceClassPaginationAndDTOToCollectionIfMissing(
          [],
          entityWithServiceClassPaginationAndDTO,
          entityWithServiceClassPaginationAndDTO2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entityWithServiceClassPaginationAndDTO);
        expect(expectedResult).toContain(entityWithServiceClassPaginationAndDTO2);
      });

      it('should accept null and undefined values', () => {
        const entityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO = sampleWithRequiredData;
        expectedResult = service.addEntityWithServiceClassPaginationAndDTOToCollectionIfMissing(
          [],
          null,
          entityWithServiceClassPaginationAndDTO,
          undefined
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entityWithServiceClassPaginationAndDTO);
      });

      it('should return initial array if no EntityWithServiceClassPaginationAndDTO is added', () => {
        const entityWithServiceClassPaginationAndDTOCollection: IEntityWithServiceClassPaginationAndDTO[] = [sampleWithRequiredData];
        expectedResult = service.addEntityWithServiceClassPaginationAndDTOToCollectionIfMissing(
          entityWithServiceClassPaginationAndDTOCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(entityWithServiceClassPaginationAndDTOCollection);
      });
    });

    describe('compareEntityWithServiceClassPaginationAndDTO', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEntityWithServiceClassPaginationAndDTO(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareEntityWithServiceClassPaginationAndDTO(entity1, entity2);
        const compareResult2 = service.compareEntityWithServiceClassPaginationAndDTO(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareEntityWithServiceClassPaginationAndDTO(entity1, entity2);
        const compareResult2 = service.compareEntityWithServiceClassPaginationAndDTO(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareEntityWithServiceClassPaginationAndDTO(entity1, entity2);
        const compareResult2 = service.compareEntityWithServiceClassPaginationAndDTO(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
