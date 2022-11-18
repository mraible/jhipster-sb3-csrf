import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IEntityWithServiceImplPaginationAndDTO } from '../entity-with-service-impl-pagination-and-dto.model';
import { EntityWithServiceImplPaginationAndDTOService } from '../service/entity-with-service-impl-pagination-and-dto.service';

import { EntityWithServiceImplPaginationAndDTORoutingResolveService } from './entity-with-service-impl-pagination-and-dto-routing-resolve.service';

describe('EntityWithServiceImplPaginationAndDTO routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: EntityWithServiceImplPaginationAndDTORoutingResolveService;
  let service: EntityWithServiceImplPaginationAndDTOService;
  let resultEntityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO | null | undefined;

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
    routingResolveService = TestBed.inject(EntityWithServiceImplPaginationAndDTORoutingResolveService);
    service = TestBed.inject(EntityWithServiceImplPaginationAndDTOService);
    resultEntityWithServiceImplPaginationAndDTO = undefined;
  });

  describe('resolve', () => {
    it('should return IEntityWithServiceImplPaginationAndDTO returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntityWithServiceImplPaginationAndDTO = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultEntityWithServiceImplPaginationAndDTO).toEqual({ id: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntityWithServiceImplPaginationAndDTO = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultEntityWithServiceImplPaginationAndDTO).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IEntityWithServiceImplPaginationAndDTO>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntityWithServiceImplPaginationAndDTO = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultEntityWithServiceImplPaginationAndDTO).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
