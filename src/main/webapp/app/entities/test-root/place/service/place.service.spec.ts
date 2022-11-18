import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPlace } from '../place.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../place.test-samples';

import { PlaceService } from './place.service';

const requireRestSample: IPlace = {
  ...sampleWithRequiredData,
};

describe('Place Service', () => {
  let service: PlaceService;
  let httpMock: HttpTestingController;
  let expectedResult: IPlace | IPlace[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PlaceService);
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

    it('should create a Place', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const place = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(place).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Place', () => {
      const place = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(place).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Place', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Place', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Place', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPlaceToCollectionIfMissing', () => {
      it('should add a Place to an empty array', () => {
        const place: IPlace = sampleWithRequiredData;
        expectedResult = service.addPlaceToCollectionIfMissing([], place);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(place);
      });

      it('should not add a Place to an array that contains it', () => {
        const place: IPlace = sampleWithRequiredData;
        const placeCollection: IPlace[] = [
          {
            ...place,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPlaceToCollectionIfMissing(placeCollection, place);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Place to an array that doesn't contain it", () => {
        const place: IPlace = sampleWithRequiredData;
        const placeCollection: IPlace[] = [sampleWithPartialData];
        expectedResult = service.addPlaceToCollectionIfMissing(placeCollection, place);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(place);
      });

      it('should add only unique Place to an array', () => {
        const placeArray: IPlace[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const placeCollection: IPlace[] = [sampleWithRequiredData];
        expectedResult = service.addPlaceToCollectionIfMissing(placeCollection, ...placeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const place: IPlace = sampleWithRequiredData;
        const place2: IPlace = sampleWithPartialData;
        expectedResult = service.addPlaceToCollectionIfMissing([], place, place2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(place);
        expect(expectedResult).toContain(place2);
      });

      it('should accept null and undefined values', () => {
        const place: IPlace = sampleWithRequiredData;
        expectedResult = service.addPlaceToCollectionIfMissing([], null, place, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(place);
      });

      it('should return initial array if no Place is added', () => {
        const placeCollection: IPlace[] = [sampleWithRequiredData];
        expectedResult = service.addPlaceToCollectionIfMissing(placeCollection, undefined, null);
        expect(expectedResult).toEqual(placeCollection);
      });
    });

    describe('comparePlace', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePlace(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.comparePlace(entity1, entity2);
        const compareResult2 = service.comparePlace(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.comparePlace(entity1, entity2);
        const compareResult2 = service.comparePlace(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.comparePlace(entity1, entity2);
        const compareResult2 = service.comparePlace(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
