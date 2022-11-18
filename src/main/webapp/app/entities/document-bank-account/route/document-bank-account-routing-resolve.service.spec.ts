import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IDocumentBankAccount } from '../document-bank-account.model';
import { DocumentBankAccountService } from '../service/document-bank-account.service';

import { DocumentBankAccountRoutingResolveService } from './document-bank-account-routing-resolve.service';

describe('DocumentBankAccount routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: DocumentBankAccountRoutingResolveService;
  let service: DocumentBankAccountService;
  let resultDocumentBankAccount: IDocumentBankAccount | null | undefined;

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
    routingResolveService = TestBed.inject(DocumentBankAccountRoutingResolveService);
    service = TestBed.inject(DocumentBankAccountService);
    resultDocumentBankAccount = undefined;
  });

  describe('resolve', () => {
    it('should return IDocumentBankAccount returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDocumentBankAccount = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultDocumentBankAccount).toEqual({ id: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDocumentBankAccount = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDocumentBankAccount).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDocumentBankAccount>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDocumentBankAccount = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultDocumentBankAccount).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
