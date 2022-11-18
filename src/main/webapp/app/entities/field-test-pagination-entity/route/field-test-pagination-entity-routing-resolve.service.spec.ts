import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IFieldTestPaginationEntity } from '../field-test-pagination-entity.model';
import { FieldTestPaginationEntityService } from '../service/field-test-pagination-entity.service';

import { FieldTestPaginationEntityRoutingResolveService } from './field-test-pagination-entity-routing-resolve.service';

describe('FieldTestPaginationEntity routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: FieldTestPaginationEntityRoutingResolveService;
  let service: FieldTestPaginationEntityService;
  let resultFieldTestPaginationEntity: IFieldTestPaginationEntity | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(FieldTestPaginationEntityRoutingResolveService);
    service = TestBed.inject(FieldTestPaginationEntityService);
    resultFieldTestPaginationEntity = undefined;
  });

  describe('resolve', () => {
    it('should return IFieldTestPaginationEntity returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFieldTestPaginationEntity = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultFieldTestPaginationEntity).toEqual({ id: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFieldTestPaginationEntity = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultFieldTestPaginationEntity).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IFieldTestPaginationEntity>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFieldTestPaginationEntity = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultFieldTestPaginationEntity).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
