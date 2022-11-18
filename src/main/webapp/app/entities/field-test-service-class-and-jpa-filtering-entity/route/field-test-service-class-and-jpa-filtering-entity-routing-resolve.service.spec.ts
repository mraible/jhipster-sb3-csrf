import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IFieldTestServiceClassAndJpaFilteringEntity } from '../field-test-service-class-and-jpa-filtering-entity.model';
import { FieldTestServiceClassAndJpaFilteringEntityService } from '../service/field-test-service-class-and-jpa-filtering-entity.service';

import { FieldTestServiceClassAndJpaFilteringEntityRoutingResolveService } from './field-test-service-class-and-jpa-filtering-entity-routing-resolve.service';

describe('FieldTestServiceClassAndJpaFilteringEntity routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: FieldTestServiceClassAndJpaFilteringEntityRoutingResolveService;
  let service: FieldTestServiceClassAndJpaFilteringEntityService;
  let resultFieldTestServiceClassAndJpaFilteringEntity: IFieldTestServiceClassAndJpaFilteringEntity | null | undefined;

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
    routingResolveService = TestBed.inject(FieldTestServiceClassAndJpaFilteringEntityRoutingResolveService);
    service = TestBed.inject(FieldTestServiceClassAndJpaFilteringEntityService);
    resultFieldTestServiceClassAndJpaFilteringEntity = undefined;
  });

  describe('resolve', () => {
    it('should return IFieldTestServiceClassAndJpaFilteringEntity returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFieldTestServiceClassAndJpaFilteringEntity = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultFieldTestServiceClassAndJpaFilteringEntity).toEqual({ id: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFieldTestServiceClassAndJpaFilteringEntity = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultFieldTestServiceClassAndJpaFilteringEntity).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IFieldTestServiceClassAndJpaFilteringEntity>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFieldTestServiceClassAndJpaFilteringEntity = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultFieldTestServiceClassAndJpaFilteringEntity).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
