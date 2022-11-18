import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEntityWithServiceImplAndDTO } from '../entity-with-service-impl-and-dto.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../entity-with-service-impl-and-dto.test-samples';

import { EntityWithServiceImplAndDTOService } from './entity-with-service-impl-and-dto.service';

const requireRestSample: IEntityWithServiceImplAndDTO = {
  ...sampleWithRequiredData,
};

describe('EntityWithServiceImplAndDTO Service', () => {
  let service: EntityWithServiceImplAndDTOService;
  let httpMock: HttpTestingController;
  let expectedResult: IEntityWithServiceImplAndDTO | IEntityWithServiceImplAndDTO[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EntityWithServiceImplAndDTOService);
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

    it('should create a EntityWithServiceImplAndDTO', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const entityWithServiceImplAndDTO = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(entityWithServiceImplAndDTO).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EntityWithServiceImplAndDTO', () => {
      const entityWithServiceImplAndDTO = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(entityWithServiceImplAndDTO).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EntityWithServiceImplAndDTO', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EntityWithServiceImplAndDTO', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EntityWithServiceImplAndDTO', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEntityWithServiceImplAndDTOToCollectionIfMissing', () => {
      it('should add a EntityWithServiceImplAndDTO to an empty array', () => {
        const entityWithServiceImplAndDTO: IEntityWithServiceImplAndDTO = sampleWithRequiredData;
        expectedResult = service.addEntityWithServiceImplAndDTOToCollectionIfMissing([], entityWithServiceImplAndDTO);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entityWithServiceImplAndDTO);
      });

      it('should not add a EntityWithServiceImplAndDTO to an array that contains it', () => {
        const entityWithServiceImplAndDTO: IEntityWithServiceImplAndDTO = sampleWithRequiredData;
        const entityWithServiceImplAndDTOCollection: IEntityWithServiceImplAndDTO[] = [
          {
            ...entityWithServiceImplAndDTO,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEntityWithServiceImplAndDTOToCollectionIfMissing(
          entityWithServiceImplAndDTOCollection,
          entityWithServiceImplAndDTO
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EntityWithServiceImplAndDTO to an array that doesn't contain it", () => {
        const entityWithServiceImplAndDTO: IEntityWithServiceImplAndDTO = sampleWithRequiredData;
        const entityWithServiceImplAndDTOCollection: IEntityWithServiceImplAndDTO[] = [sampleWithPartialData];
        expectedResult = service.addEntityWithServiceImplAndDTOToCollectionIfMissing(
          entityWithServiceImplAndDTOCollection,
          entityWithServiceImplAndDTO
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entityWithServiceImplAndDTO);
      });

      it('should add only unique EntityWithServiceImplAndDTO to an array', () => {
        const entityWithServiceImplAndDTOArray: IEntityWithServiceImplAndDTO[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const entityWithServiceImplAndDTOCollection: IEntityWithServiceImplAndDTO[] = [sampleWithRequiredData];
        expectedResult = service.addEntityWithServiceImplAndDTOToCollectionIfMissing(
          entityWithServiceImplAndDTOCollection,
          ...entityWithServiceImplAndDTOArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const entityWithServiceImplAndDTO: IEntityWithServiceImplAndDTO = sampleWithRequiredData;
        const entityWithServiceImplAndDTO2: IEntityWithServiceImplAndDTO = sampleWithPartialData;
        expectedResult = service.addEntityWithServiceImplAndDTOToCollectionIfMissing(
          [],
          entityWithServiceImplAndDTO,
          entityWithServiceImplAndDTO2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entityWithServiceImplAndDTO);
        expect(expectedResult).toContain(entityWithServiceImplAndDTO2);
      });

      it('should accept null and undefined values', () => {
        const entityWithServiceImplAndDTO: IEntityWithServiceImplAndDTO = sampleWithRequiredData;
        expectedResult = service.addEntityWithServiceImplAndDTOToCollectionIfMissing([], null, entityWithServiceImplAndDTO, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entityWithServiceImplAndDTO);
      });

      it('should return initial array if no EntityWithServiceImplAndDTO is added', () => {
        const entityWithServiceImplAndDTOCollection: IEntityWithServiceImplAndDTO[] = [sampleWithRequiredData];
        expectedResult = service.addEntityWithServiceImplAndDTOToCollectionIfMissing(
          entityWithServiceImplAndDTOCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(entityWithServiceImplAndDTOCollection);
      });
    });

    describe('compareEntityWithServiceImplAndDTO', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEntityWithServiceImplAndDTO(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareEntityWithServiceImplAndDTO(entity1, entity2);
        const compareResult2 = service.compareEntityWithServiceImplAndDTO(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareEntityWithServiceImplAndDTO(entity1, entity2);
        const compareResult2 = service.compareEntityWithServiceImplAndDTO(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareEntityWithServiceImplAndDTO(entity1, entity2);
        const compareResult2 = service.compareEntityWithServiceImplAndDTO(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
