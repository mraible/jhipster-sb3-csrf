import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IFieldTestServiceImplEntity } from '../field-test-service-impl-entity.model';
import { FieldTestServiceImplEntityService } from '../service/field-test-service-impl-entity.service';

import { FieldTestServiceImplEntityRoutingResolveService } from './field-test-service-impl-entity-routing-resolve.service';

describe('FieldTestServiceImplEntity routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: FieldTestServiceImplEntityRoutingResolveService;
  let service: FieldTestServiceImplEntityService;
  let resultFieldTestServiceImplEntity: IFieldTestServiceImplEntity | null | undefined;

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
    routingResolveService = TestBed.inject(FieldTestServiceImplEntityRoutingResolveService);
    service = TestBed.inject(FieldTestServiceImplEntityService);
    resultFieldTestServiceImplEntity = undefined;
  });

  describe('resolve', () => {
    it('should return IFieldTestServiceImplEntity returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFieldTestServiceImplEntity = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultFieldTestServiceImplEntity).toEqual({ id: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFieldTestServiceImplEntity = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultFieldTestServiceImplEntity).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IFieldTestServiceImplEntity>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFieldTestServiceImplEntity = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultFieldTestServiceImplEntity).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
