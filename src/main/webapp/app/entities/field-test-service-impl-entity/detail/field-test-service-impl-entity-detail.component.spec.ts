import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataUtils } from 'app/core/util/data-util.service';

import { FieldTestServiceImplEntityDetailComponent } from './field-test-service-impl-entity-detail.component';

describe('FieldTestServiceImplEntity Management Detail Component', () => {
  let comp: FieldTestServiceImplEntityDetailComponent;
  let fixture: ComponentFixture<FieldTestServiceImplEntityDetailComponent>;
  let dataUtils: DataUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldTestServiceImplEntityDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ fieldTestServiceImplEntity: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(FieldTestServiceImplEntityDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FieldTestServiceImplEntityDetailComponent);
    comp = fixture.componentInstance;
    dataUtils = TestBed.inject(DataUtils);
    jest.spyOn(window, 'open').mockImplementation(() => null);
  });

  describe('OnInit', () => {
    it('Should load fieldTestServiceImplEntity on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.fieldTestServiceImplEntity).toEqual(expect.objectContaining({ id: 'ABC' }));
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
