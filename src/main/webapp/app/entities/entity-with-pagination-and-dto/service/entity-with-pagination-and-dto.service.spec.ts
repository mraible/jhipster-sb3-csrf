import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEntityWithPaginationAndDTO } from '../entity-with-pagination-and-dto.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../entity-with-pagination-and-dto.test-samples';

import { EntityWithPaginationAndDTOService } from './entity-with-pagination-and-dto.service';

const requireRestSample: IEntityWithPaginationAndDTO = {
  ...sampleWithRequiredData,
};

describe('EntityWithPaginationAndDTO Service', () => {
  let service: EntityWithPaginationAndDTOService;
  let httpMock: HttpTestingController;
  let expectedResult: IEntityWithPaginationAndDTO | IEntityWithPaginationAndDTO[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EntityWithPaginationAndDTOService);
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

    it('should create a EntityWithPaginationAndDTO', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const entityWithPaginationAndDTO = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(entityWithPaginationAndDTO).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EntityWithPaginationAndDTO', () => {
      const entityWithPaginationAndDTO = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(entityWithPaginationAndDTO).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EntityWithPaginationAndDTO', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EntityWithPaginationAndDTO', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EntityWithPaginationAndDTO', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEntityWithPaginationAndDTOToCollectionIfMissing', () => {
      it('should add a EntityWithPaginationAndDTO to an empty array', () => {
        const entityWithPaginationAndDTO: IEntityWithPaginationAndDTO = sampleWithRequiredData;
        expectedResult = service.addEntityWithPaginationAndDTOToCollectionIfMissing([], entityWithPaginationAndDTO);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entityWithPaginationAndDTO);
      });

      it('should not add a EntityWithPaginationAndDTO to an array that contains it', () => {
        const entityWithPaginationAndDTO: IEntityWithPaginationAndDTO = sampleWithRequiredData;
        const entityWithPaginationAndDTOCollection: IEntityWithPaginationAndDTO[] = [
          {
            ...entityWithPaginationAndDTO,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEntityWithPaginationAndDTOToCollectionIfMissing(
          entityWithPaginationAndDTOCollection,
          entityWithPaginationAndDTO
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EntityWithPaginationAndDTO to an array that doesn't contain it", () => {
        const entityWithPaginationAndDTO: IEntityWithPaginationAndDTO = sampleWithRequiredData;
        const entityWithPaginationAndDTOCollection: IEntityWithPaginationAndDTO[] = [sampleWithPartialData];
        expectedResult = service.addEntityWithPaginationAndDTOToCollectionIfMissing(
          entityWithPaginationAndDTOCollection,
          entityWithPaginationAndDTO
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entityWithPaginationAndDTO);
      });

      it('should add only unique EntityWithPaginationAndDTO to an array', () => {
        const entityWithPaginationAndDTOArray: IEntityWithPaginationAndDTO[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const entityWithPaginationAndDTOCollection: IEntityWithPaginationAndDTO[] = [sampleWithRequiredData];
        expectedResult = service.addEntityWithPaginationAndDTOToCollectionIfMissing(
          entityWithPaginationAndDTOCollection,
          ...entityWithPaginationAndDTOArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const entityWithPaginationAndDTO: IEntityWithPaginationAndDTO = sampleWithRequiredData;
        const entityWithPaginationAndDTO2: IEntityWithPaginationAndDTO = sampleWithPartialData;
        expectedResult = service.addEntityWithPaginationAndDTOToCollectionIfMissing(
          [],
          entityWithPaginationAndDTO,
          entityWithPaginationAndDTO2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entityWithPaginationAndDTO);
        expect(expectedResult).toContain(entityWithPaginationAndDTO2);
      });

      it('should accept null and undefined values', () => {
        const entityWithPaginationAndDTO: IEntityWithPaginationAndDTO = sampleWithRequiredData;
        expectedResult = service.addEntityWithPaginationAndDTOToCollectionIfMissing([], null, entityWithPaginationAndDTO, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entityWithPaginationAndDTO);
      });

      it('should return initial array if no EntityWithPaginationAndDTO is added', () => {
        const entityWithPaginationAndDTOCollection: IEntityWithPaginationAndDTO[] = [sampleWithRequiredData];
        expectedResult = service.addEntityWithPaginationAndDTOToCollectionIfMissing(entityWithPaginationAndDTOCollection, undefined, null);
        expect(expectedResult).toEqual(entityWithPaginationAndDTOCollection);
      });
    });

    describe('compareEntityWithPaginationAndDTO', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEntityWithPaginationAndDTO(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareEntityWithPaginationAndDTO(entity1, entity2);
        const compareResult2 = service.compareEntityWithPaginationAndDTO(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareEntityWithPaginationAndDTO(entity1, entity2);
        const compareResult2 = service.compareEntityWithPaginationAndDTO(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareEntityWithPaginationAndDTO(entity1, entity2);
        const compareResult2 = service.compareEntityWithPaginationAndDTO(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
