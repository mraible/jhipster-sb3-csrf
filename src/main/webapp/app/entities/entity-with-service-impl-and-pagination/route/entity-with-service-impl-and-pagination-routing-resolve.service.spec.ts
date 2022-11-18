import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IEntityWithServiceImplAndPagination } from '../entity-with-service-impl-and-pagination.model';
import { EntityWithServiceImplAndPaginationService } from '../service/entity-with-service-impl-and-pagination.service';

import { EntityWithServiceImplAndPaginationRoutingResolveService } from './entity-with-service-impl-and-pagination-routing-resolve.service';

describe('EntityWithServiceImplAndPagination routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: EntityWithServiceImplAndPaginationRoutingResolveService;
  let service: EntityWithServiceImplAndPaginationService;
  let resultEntityWithServiceImplAndPagination: IEntityWithServiceImplAndPagination | null | undefined;

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
    routingResolveService = TestBed.inject(EntityWithServiceImplAndPaginationRoutingResolveService);
    service = TestBed.inject(EntityWithServiceImplAndPaginationService);
    resultEntityWithServiceImplAndPagination = undefined;
  });

  describe('resolve', () => {
    it('should return IEntityWithServiceImplAndPagination returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntityWithServiceImplAndPagination = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultEntityWithServiceImplAndPagination).toEqual({ id: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntityWithServiceImplAndPagination = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultEntityWithServiceImplAndPagination).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IEntityWithServiceImplAndPagination>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntityWithServiceImplAndPagination = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultEntityWithServiceImplAndPagination).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
