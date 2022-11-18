import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IEntityWithServiceClassAndPagination } from '../entity-with-service-class-and-pagination.model';
import { EntityWithServiceClassAndPaginationService } from '../service/entity-with-service-class-and-pagination.service';

import { EntityWithServiceClassAndPaginationRoutingResolveService } from './entity-with-service-class-and-pagination-routing-resolve.service';

describe('EntityWithServiceClassAndPagination routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: EntityWithServiceClassAndPaginationRoutingResolveService;
  let service: EntityWithServiceClassAndPaginationService;
  let resultEntityWithServiceClassAndPagination: IEntityWithServiceClassAndPagination | null | undefined;

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
    routingResolveService = TestBed.inject(EntityWithServiceClassAndPaginationRoutingResolveService);
    service = TestBed.inject(EntityWithServiceClassAndPaginationService);
    resultEntityWithServiceClassAndPagination = undefined;
  });

  describe('resolve', () => {
    it('should return IEntityWithServiceClassAndPagination returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntityWithServiceClassAndPagination = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultEntityWithServiceClassAndPagination).toEqual({ id: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntityWithServiceClassAndPagination = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultEntityWithServiceClassAndPagination).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IEntityWithServiceClassAndPagination>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntityWithServiceClassAndPagination = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultEntityWithServiceClassAndPagination).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
