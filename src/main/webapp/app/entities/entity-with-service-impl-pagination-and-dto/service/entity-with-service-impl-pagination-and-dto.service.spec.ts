import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEntityWithServiceImplPaginationAndDTO } from '../entity-with-service-impl-pagination-and-dto.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../entity-with-service-impl-pagination-and-dto.test-samples';

import { EntityWithServiceImplPaginationAndDTOService } from './entity-with-service-impl-pagination-and-dto.service';

const requireRestSample: IEntityWithServiceImplPaginationAndDTO = {
  ...sampleWithRequiredData,
};

describe('EntityWithServiceImplPaginationAndDTO Service', () => {
  let service: EntityWithServiceImplPaginationAndDTOService;
  let httpMock: HttpTestingController;
  let expectedResult: IEntityWithServiceImplPaginationAndDTO | IEntityWithServiceImplPaginationAndDTO[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EntityWithServiceImplPaginationAndDTOService);
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

    it('should create a EntityWithServiceImplPaginationAndDTO', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const entityWithServiceImplPaginationAndDTO = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(entityWithServiceImplPaginationAndDTO).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EntityWithServiceImplPaginationAndDTO', () => {
      const entityWithServiceImplPaginationAndDTO = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(entityWithServiceImplPaginationAndDTO).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EntityWithServiceImplPaginationAndDTO', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EntityWithServiceImplPaginationAndDTO', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EntityWithServiceImplPaginationAndDTO', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEntityWithServiceImplPaginationAndDTOToCollectionIfMissing', () => {
      it('should add a EntityWithServiceImplPaginationAndDTO to an empty array', () => {
        const entityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO = sampleWithRequiredData;
        expectedResult = service.addEntityWithServiceImplPaginationAndDTOToCollectionIfMissing([], entityWithServiceImplPaginationAndDTO);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entityWithServiceImplPaginationAndDTO);
      });

      it('should not add a EntityWithServiceImplPaginationAndDTO to an array that contains it', () => {
        const entityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO = sampleWithRequiredData;
        const entityWithServiceImplPaginationAndDTOCollection: IEntityWithServiceImplPaginationAndDTO[] = [
          {
            ...entityWithServiceImplPaginationAndDTO,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEntityWithServiceImplPaginationAndDTOToCollectionIfMissing(
          entityWithServiceImplPaginationAndDTOCollection,
          entityWithServiceImplPaginationAndDTO
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EntityWithServiceImplPaginationAndDTO to an array that doesn't contain it", () => {
        const entityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO = sampleWithRequiredData;
        const entityWithServiceImplPaginationAndDTOCollection: IEntityWithServiceImplPaginationAndDTO[] = [sampleWithPartialData];
        expectedResult = service.addEntityWithServiceImplPaginationAndDTOToCollectionIfMissing(
          entityWithServiceImplPaginationAndDTOCollection,
          entityWithServiceImplPaginationAndDTO
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entityWithServiceImplPaginationAndDTO);
      });

      it('should add only unique EntityWithServiceImplPaginationAndDTO to an array', () => {
        const entityWithServiceImplPaginationAndDTOArray: IEntityWithServiceImplPaginationAndDTO[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const entityWithServiceImplPaginationAndDTOCollection: IEntityWithServiceImplPaginationAndDTO[] = [sampleWithRequiredData];
        expectedResult = service.addEntityWithServiceImplPaginationAndDTOToCollectionIfMissing(
          entityWithServiceImplPaginationAndDTOCollection,
          ...entityWithServiceImplPaginationAndDTOArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const entityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO = sampleWithRequiredData;
        const entityWithServiceImplPaginationAndDTO2: IEntityWithServiceImplPaginationAndDTO = sampleWithPartialData;
        expectedResult = service.addEntityWithServiceImplPaginationAndDTOToCollectionIfMissing(
          [],
          entityWithServiceImplPaginationAndDTO,
          entityWithServiceImplPaginationAndDTO2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entityWithServiceImplPaginationAndDTO);
        expect(expectedResult).toContain(entityWithServiceImplPaginationAndDTO2);
      });

      it('should accept null and undefined values', () => {
        const entityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO = sampleWithRequiredData;
        expectedResult = service.addEntityWithServiceImplPaginationAndDTOToCollectionIfMissing(
          [],
          null,
          entityWithServiceImplPaginationAndDTO,
          undefined
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entityWithServiceImplPaginationAndDTO);
      });

      it('should return initial array if no EntityWithServiceImplPaginationAndDTO is added', () => {
        const entityWithServiceImplPaginationAndDTOCollection: IEntityWithServiceImplPaginationAndDTO[] = [sampleWithRequiredData];
        expectedResult = service.addEntityWithServiceImplPaginationAndDTOToCollectionIfMissing(
          entityWithServiceImplPaginationAndDTOCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(entityWithServiceImplPaginationAndDTOCollection);
      });
    });

    describe('compareEntityWithServiceImplPaginationAndDTO', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEntityWithServiceImplPaginationAndDTO(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareEntityWithServiceImplPaginationAndDTO(entity1, entity2);
        const compareResult2 = service.compareEntityWithServiceImplPaginationAndDTO(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareEntityWithServiceImplPaginationAndDTO(entity1, entity2);
        const compareResult2 = service.compareEntityWithServiceImplPaginationAndDTO(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareEntityWithServiceImplPaginationAndDTO(entity1, entity2);
        const compareResult2 = service.compareEntityWithServiceImplPaginationAndDTO(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
