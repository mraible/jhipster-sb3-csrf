import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataUtils } from 'app/core/util/data-util.service';

import { DocumentBankAccountDetailComponent } from './document-bank-account-detail.component';

describe('DocumentBankAccount Management Detail Component', () => {
  let comp: DocumentBankAccountDetailComponent;
  let fixture: ComponentFixture<DocumentBankAccountDetailComponent>;
  let dataUtils: DataUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentBankAccountDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ documentBankAccount: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(DocumentBankAccountDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DocumentBankAccountDetailComponent);
    comp = fixture.componentInstance;
    dataUtils = TestBed.inject(DataUtils);
    jest.spyOn(window, 'open').mockImplementation(() => null);
  });

  describe('OnInit', () => {
    it('Should load documentBankAccount on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.documentBankAccount).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });

  describe('byteSize', () => {
    it('Should call byteSize from DataUtils', () => {
      // GIVEN
      jest.spyOn(dataUtils, 'byteSize');
      const fakeBase64 = 'fake base64';

      // WHEN
      comp.byteSize(fakeBase64);

      // THEN
      expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
    });
  });

  describe('openFile', () => {
    it('Should call openFile from DataUtils', () => {
      const newWindow = { ...window };
      newWindow.document.write = jest.fn();
      window.open = jest.fn(() => newWindow);
      window.onload = jest.fn(() => newWindow);
      window.URL.createObjectURL = jest.fn();
      // GIVEN
      jest.spyOn(dataUtils, 'openFile');
      const fakeContentType = 'fake content type';
      const fakeBase64 = 'fake base64';

      // WHEN
      comp.openFile(fakeBase64, fakeContentType);

      // THEN
      expect(dataUtils.openFile).toBeCalledWith(fakeBase64, fakeContentType);
    });
  });
});
