import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FieldTestInfiniteScrollEntityFormService } from './field-test-infinite-scroll-entity-form.service';
import { FieldTestInfiniteScrollEntityService } from '../service/field-test-infinite-scroll-entity.service';
import { IFieldTestInfiniteScrollEntity } from '../field-test-infinite-scroll-entity.model';

import { FieldTestInfiniteScrollEntityUpdateComponent } from './field-test-infinite-scroll-entity-update.component';

describe('FieldTestInfiniteScrollEntity Management Update Component', () => {
  let comp: FieldTestInfiniteScrollEntityUpdateComponent;
  let fixture: ComponentFixture<FieldTestInfiniteScrollEntityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fieldTestInfiniteScrollEntityFormService: FieldTestInfiniteScrollEntityFormService;
  let fieldTestInfiniteScrollEntityService: FieldTestInfiniteScrollEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FieldTestInfiniteScrollEntityUpdateComponent],
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
      .overrideTemplate(FieldTestInfiniteScrollEntityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FieldTestInfiniteScrollEntityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fieldTestInfiniteScrollEntityFormService = TestBed.inject(FieldTestInfiniteScrollEntityFormService);
    fieldTestInfiniteScrollEntityService = TestBed.inject(FieldTestInfiniteScrollEntityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fieldTestInfiniteScrollEntity: IFieldTestInfiniteScrollEntity = { id: 'CBA' };

      activatedRoute.data = of({ fieldTestInfiniteScrollEntity });
      comp.ngOnInit();

      expect(comp.fieldTestInfiniteScrollEntity).toEqual(fieldTestInfiniteScrollEntity);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestInfiniteScrollEntity>>();
      const fieldTestInfiniteScrollEntity = { id: 'ABC' };
      jest
        .spyOn(fieldTestInfiniteScrollEntityFormService, 'getFieldTestInfiniteScrollEntity')
        .mockReturnValue(fieldTestInfiniteScrollEntity);
      jest.spyOn(fieldTestInfiniteScrollEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestInfiniteScrollEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fieldTestInfiniteScrollEntity }));
      saveSubject.complete();

      // THEN
      expect(fieldTestInfiniteScrollEntityFormService.getFieldTestInfiniteScrollEntity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fieldTestInfiniteScrollEntityService.update).toHaveBeenCalledWith(expect.objectContaining(fieldTestInfiniteScrollEntity));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestInfiniteScrollEntity>>();
      const fieldTestInfiniteScrollEntity = { id: 'ABC' };
      jest.spyOn(fieldTestInfiniteScrollEntityFormService, 'getFieldTestInfiniteScrollEntity').mockReturnValue({ id: null });
      jest.spyOn(fieldTestInfiniteScrollEntityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestInfiniteScrollEntity: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fieldTestInfiniteScrollEntity }));
      saveSubject.complete();

      // THEN
      expect(fieldTestInfiniteScrollEntityFormService.getFieldTestInfiniteScrollEntity).toHaveBeenCalled();
      expect(fieldTestInfiniteScrollEntityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestInfiniteScrollEntity>>();
      const fieldTestInfiniteScrollEntity = { id: 'ABC' };
      jest.spyOn(fieldTestInfiniteScrollEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestInfiniteScrollEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fieldTestInfiniteScrollEntityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
