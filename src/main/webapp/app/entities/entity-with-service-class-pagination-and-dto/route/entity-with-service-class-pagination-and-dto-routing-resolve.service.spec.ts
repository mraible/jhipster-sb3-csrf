import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IEntityWithServiceClassPaginationAndDTO } from '../entity-with-service-class-pagination-and-dto.model';
import { EntityWithServiceClassPaginationAndDTOService } from '../service/entity-with-service-class-pagination-and-dto.service';

import { EntityWithServiceClassPaginationAndDTORoutingResolveService } from './entity-with-service-class-pagination-and-dto-routing-resolve.service';

describe('EntityWithServiceClassPaginationAndDTO routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: EntityWithServiceClassPaginationAndDTORoutingResolveService;
  let service: EntityWithServiceClassPaginationAndDTOService;
  let resultEntityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO | null | undefined;

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
    routingResolveService = TestBed.inject(EntityWithServiceClassPaginationAndDTORoutingResolveService);
    service = TestBed.inject(EntityWithServiceClassPaginationAndDTOService);
    resultEntityWithServiceClassPaginationAndDTO = undefined;
  });

  describe('resolve', () => {
    it('should return IEntityWithServiceClassPaginationAndDTO returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntityWithServiceClassPaginationAndDTO = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultEntityWithServiceClassPaginationAndDTO).toEqual({ id: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntityWithServiceClassPaginationAndDTO = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultEntityWithServiceClassPaginationAndDTO).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IEntityWithServiceClassPaginationAndDTO>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntityWithServiceClassPaginationAndDTO = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultEntityWithServiceClassPaginationAndDTO).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
