import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEntityWithDTO } from '../entity-with-dto.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../entity-with-dto.test-samples';

import { EntityWithDTOService } from './entity-with-dto.service';

const requireRestSample: IEntityWithDTO = {
  ...sampleWithRequiredData,
};

describe('EntityWithDTO Service', () => {
  let service: EntityWithDTOService;
  let httpMock: HttpTestingController;
  let expectedResult: IEntityWithDTO | IEntityWithDTO[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EntityWithDTOService);
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

    it('should create a EntityWithDTO', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const entityWithDTO = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(entityWithDTO).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EntityWithDTO', () => {
      const entityWithDTO = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(entityWithDTO).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EntityWithDTO', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EntityWithDTO', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EntityWithDTO', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEntityWithDTOToCollectionIfMissing', () => {
      it('should add a EntityWithDTO to an empty array', () => {
        const entityWithDTO: IEntityWithDTO = sampleWithRequiredData;
        expectedResult = service.addEntityWithDTOToCollectionIfMissing([], entityWithDTO);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entityWithDTO);
      });

      it('should not add a EntityWithDTO to an array that contains it', () => {
        const entityWithDTO: IEntityWithDTO = sampleWithRequiredData;
        const entityWithDTOCollection: IEntityWithDTO[] = [
          {
            ...entityWithDTO,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEntityWithDTOToCollectionIfMissing(entityWithDTOCollection, entityWithDTO);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EntityWithDTO to an array that doesn't contain it", () => {
        const entityWithDTO: IEntityWithDTO = sampleWithRequiredData;
        const entityWithDTOCollection: IEntityWithDTO[] = [sampleWithPartialData];
        expectedResult = service.addEntityWithDTOToCollectionIfMissing(entityWithDTOCollection, entityWithDTO);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entityWithDTO);
      });

      it('should add only unique EntityWithDTO to an array', () => {
        const entityWithDTOArray: IEntityWithDTO[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const entityWithDTOCollection: IEntityWithDTO[] = [sampleWithRequiredData];
        expectedResult = service.addEntityWithDTOToCollectionIfMissing(entityWithDTOCollection, ...entityWithDTOArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const entityWithDTO: IEntityWithDTO = sampleWithRequiredData;
        const entityWithDTO2: IEntityWithDTO = sampleWithPartialData;
        expectedResult = service.addEntityWithDTOToCollectionIfMissing([], entityWithDTO, entityWithDTO2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entityWithDTO);
        expect(expectedResult).toContain(entityWithDTO2);
      });

      it('should accept null and undefined values', () => {
        const entityWithDTO: IEntityWithDTO = sampleWithRequiredData;
        expectedResult = service.addEntityWithDTOToCollectionIfMissing([], null, entityWithDTO, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entityWithDTO);
      });

      it('should return initial array if no EntityWithDTO is added', () => {
        const entityWithDTOCollection: IEntityWithDTO[] = [sampleWithRequiredData];
        expectedResult = service.addEntityWithDTOToCollectionIfMissing(entityWithDTOCollection, undefined, null);
        expect(expectedResult).toEqual(entityWithDTOCollection);
      });
    });

    describe('compareEntityWithDTO', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEntityWithDTO(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareEntityWithDTO(entity1, entity2);
        const compareResult2 = service.compareEntityWithDTO(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareEntityWithDTO(entity1, entity2);
        const compareResult2 = service.compareEntityWithDTO(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareEntityWithDTO(entity1, entity2);
        const compareResult2 = service.compareEntityWithDTO(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
