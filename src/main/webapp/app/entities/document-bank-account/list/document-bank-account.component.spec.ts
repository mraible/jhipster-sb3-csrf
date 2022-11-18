import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DocumentBankAccountService } from '../service/document-bank-account.service';

import { DocumentBankAccountComponent } from './document-bank-account.component';

describe('DocumentBankAccount Management Component', () => {
  let comp: DocumentBankAccountComponent;
  let fixture: ComponentFixture<DocumentBankAccountComponent>;
  let service: DocumentBankAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'document-bank-account', component: DocumentBankAccountComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [DocumentBankAccountComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(DocumentBankAccountComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DocumentBankAccountComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DocumentBankAccountService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 'ABC' }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.documentBankAccounts?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to documentBankAccountService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getDocumentBankAccountIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getDocumentBankAccountIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
