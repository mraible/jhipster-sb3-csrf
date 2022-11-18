import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IFieldTestMapstructAndServiceClassEntity } from '../field-test-mapstruct-and-service-class-entity.model';
import { FieldTestMapstructAndServiceClassEntityService } from '../service/field-test-mapstruct-and-service-class-entity.service';

import { FieldTestMapstructAndServiceClassEntityRoutingResolveService } from './field-test-mapstruct-and-service-class-entity-routing-resolve.service';

describe('FieldTestMapstructAndServiceClassEntity routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: FieldTestMapstructAndServiceClassEntityRoutingResolveService;
  let service: FieldTestMapstructAndServiceClassEntityService;
  let resultFieldTestMapstructAndServiceClassEntity: IFieldTestMapstructAndServiceClassEntity | null | undefined;

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
    routingResolveService = TestBed.inject(FieldTestMapstructAndServiceClassEntityRoutingResolveService);
    service = TestBed.inject(FieldTestMapstructAndServiceClassEntityService);
    resultFieldTestMapstructAndServiceClassEntity = undefined;
  });

  describe('resolve', () => {
    it('should return IFieldTestMapstructAndServiceClassEntity returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFieldTestMapstructAndServiceClassEntity = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultFieldTestMapstructAndServiceClassEntity).toEqual({ id: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFieldTestMapstructAndServiceClassEntity = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultFieldTestMapstructAndServiceClassEntity).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IFieldTestMapstructAndServiceClassEntity>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFieldTestMapstructAndServiceClassEntity = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultFieldTestMapstructAndServiceClassEntity).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
