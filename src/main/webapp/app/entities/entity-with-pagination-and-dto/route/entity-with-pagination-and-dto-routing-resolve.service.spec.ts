import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IEntityWithPaginationAndDTO } from '../entity-with-pagination-and-dto.model';
import { EntityWithPaginationAndDTOService } from '../service/entity-with-pagination-and-dto.service';

import { EntityWithPaginationAndDTORoutingResolveService } from './entity-with-pagination-and-dto-routing-resolve.service';

describe('EntityWithPaginationAndDTO routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: EntityWithPaginationAndDTORoutingResolveService;
  let service: EntityWithPaginationAndDTOService;
  let resultEntityWithPaginationAndDTO: IEntityWithPaginationAndDTO | null | undefined;

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
    routingResolveService = TestBed.inject(EntityWithPaginationAndDTORoutingResolveService);
    service = TestBed.inject(EntityWithPaginationAndDTOService);
    resultEntityWithPaginationAndDTO = undefined;
  });

  describe('resolve', () => {
    it('should return IEntityWithPaginationAndDTO returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntityWithPaginationAndDTO = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultEntityWithPaginationAndDTO).toEqual({ id: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntityWithPaginationAndDTO = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultEntityWithPaginationAndDTO).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IEntityWithPaginationAndDTO>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntityWithPaginationAndDTO = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultEntityWithPaginationAndDTO).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
