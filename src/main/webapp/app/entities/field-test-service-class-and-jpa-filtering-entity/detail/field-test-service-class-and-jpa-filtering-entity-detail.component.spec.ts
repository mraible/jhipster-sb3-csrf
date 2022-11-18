import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataUtils } from 'app/core/util/data-util.service';

import { FieldTestServiceClassAndJpaFilteringEntityDetailComponent } from './field-test-service-class-and-jpa-filtering-entity-detail.component';

describe('FieldTestServiceClassAndJpaFilteringEntity Management Detail Component', () => {
  let comp: FieldTestServiceClassAndJpaFilteringEntityDetailComponent;
  let fixture: ComponentFixture<FieldTestServiceClassAndJpaFilteringEntityDetailComponent>;
  let dataUtils: DataUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldTestServiceClassAndJpaFilteringEntityDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ fieldTestServiceClassAndJpaFilteringEntity: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(FieldTestServiceClassAndJpaFilteringEntityDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FieldTestServiceClassAndJpaFilteringEntityDetailComponent);
    comp = fixture.componentInstance;
    dataUtils = TestBed.inject(DataUtils);
    jest.spyOn(window, 'open').mockImplementation(() => null);
  });

  describe('OnInit', () => {
    it('Should load fieldTestServiceClassAndJpaFilteringEntity on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.fieldTestServiceClassAndJpaFilteringEntity).toEqual(expect.objectContaining({ id: 'ABC' }));
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
