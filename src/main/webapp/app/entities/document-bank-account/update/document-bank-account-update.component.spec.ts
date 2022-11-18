import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DocumentBankAccountFormService } from './document-bank-account-form.service';
import { DocumentBankAccountService } from '../service/document-bank-account.service';
import { IDocumentBankAccount } from '../document-bank-account.model';

import { DocumentBankAccountUpdateComponent } from './document-bank-account-update.component';

describe('DocumentBankAccount Management Update Component', () => {
  let comp: DocumentBankAccountUpdateComponent;
  let fixture: ComponentFixture<DocumentBankAccountUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let documentBankAccountFormService: DocumentBankAccountFormService;
  let documentBankAccountService: DocumentBankAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DocumentBankAccountUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(DocumentBankAccountUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DocumentBankAccountUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    documentBankAccountFormService = TestBed.inject(DocumentBankAccountFormService);
    documentBankAccountService = TestBed.inject(DocumentBankAccountService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const documentBankAccount: IDocumentBankAccount = { id: 'CBA' };

      activatedRoute.data = of({ documentBankAccount });
      comp.ngOnInit();

      expect(comp.documentBankAccount).toEqual(documentBankAccount);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocumentBankAccount>>();
      const documentBankAccount = { id: 'ABC' };
      jest.spyOn(documentBankAccountFormService, 'getDocumentBankAccount').mockReturnValue(documentBankAccount);
      jest.spyOn(documentBankAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentBankAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: documentBankAccount }));
      saveSubject.complete();

      // THEN
      expect(documentBankAccountFormService.getDocumentBankAccount).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(documentBankAccountService.update).toHaveBeenCalledWith(expect.objectContaining(documentBankAccount));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocumentBankAccount>>();
      const documentBankAccount = { id: 'ABC' };
      jest.spyOn(documentBankAccountFormService, 'getDocumentBankAccount').mockReturnValue({ id: null });
      jest.spyOn(documentBankAccountService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentBankAccount: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: documentBankAccount }));
      saveSubject.complete();

      // THEN
      expect(documentBankAccountFormService.getDocumentBankAccount).toHaveBeenCalled();
      expect(documentBankAccountService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocumentBankAccount>>();
      const documentBankAccount = { id: 'ABC' };
      jest.spyOn(documentBankAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentBankAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(documentBankAccountService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
