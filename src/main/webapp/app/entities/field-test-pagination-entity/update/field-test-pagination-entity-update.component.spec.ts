import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FieldTestPaginationEntityFormService } from './field-test-pagination-entity-form.service';
import { FieldTestPaginationEntityService } from '../service/field-test-pagination-entity.service';
import { IFieldTestPaginationEntity } from '../field-test-pagination-entity.model';

import { FieldTestPaginationEntityUpdateComponent } from './field-test-pagination-entity-update.component';

describe('FieldTestPaginationEntity Management Update Component', () => {
  let comp: FieldTestPaginationEntityUpdateComponent;
  let fixture: ComponentFixture<FieldTestPaginationEntityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fieldTestPaginationEntityFormService: FieldTestPaginationEntityFormService;
  let fieldTestPaginationEntityService: FieldTestPaginationEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FieldTestPaginationEntityUpdateComponent],
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
      .overrideTemplate(FieldTestPaginationEntityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FieldTestPaginationEntityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fieldTestPaginationEntityFormService = TestBed.inject(FieldTestPaginationEntityFormService);
    fieldTestPaginationEntityService = TestBed.inject(FieldTestPaginationEntityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fieldTestPaginationEntity: IFieldTestPaginationEntity = { id: 'CBA' };

      activatedRoute.data = of({ fieldTestPaginationEntity });
      comp.ngOnInit();

      expect(comp.fieldTestPaginationEntity).toEqual(fieldTestPaginationEntity);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestPaginationEntity>>();
      const fieldTestPaginationEntity = { id: 'ABC' };
      jest.spyOn(fieldTestPaginationEntityFormService, 'getFieldTestPaginationEntity').mockReturnValue(fieldTestPaginationEntity);
      jest.spyOn(fieldTestPaginationEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestPaginationEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fieldTestPaginationEntity }));
      saveSubject.complete();

      // THEN
      expect(fieldTestPaginationEntityFormService.getFieldTestPaginationEntity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fieldTestPaginationEntityService.update).toHaveBeenCalledWith(expect.objectContaining(fieldTestPaginationEntity));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestPaginationEntity>>();
      const fieldTestPaginationEntity = { id: 'ABC' };
      jest.spyOn(fieldTestPaginationEntityFormService, 'getFieldTestPaginationEntity').mockReturnValue({ id: null });
      jest.spyOn(fieldTestPaginationEntityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestPaginationEntity: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fieldTestPaginationEntity }));
      saveSubject.complete();

      // THEN
      expect(fieldTestPaginationEntityFormService.getFieldTestPaginationEntity).toHaveBeenCalled();
      expect(fieldTestPaginationEntityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestPaginationEntity>>();
      const fieldTestPaginationEntity = { id: 'ABC' };
      jest.spyOn(fieldTestPaginationEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestPaginationEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fieldTestPaginationEntityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
