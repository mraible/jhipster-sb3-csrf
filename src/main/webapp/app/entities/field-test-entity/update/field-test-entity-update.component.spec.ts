import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FieldTestEntityFormService } from './field-test-entity-form.service';
import { FieldTestEntityService } from '../service/field-test-entity.service';
import { IFieldTestEntity } from '../field-test-entity.model';

import { FieldTestEntityUpdateComponent } from './field-test-entity-update.component';

describe('FieldTestEntity Management Update Component', () => {
  let comp: FieldTestEntityUpdateComponent;
  let fixture: ComponentFixture<FieldTestEntityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fieldTestEntityFormService: FieldTestEntityFormService;
  let fieldTestEntityService: FieldTestEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FieldTestEntityUpdateComponent],
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
      .overrideTemplate(FieldTestEntityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FieldTestEntityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fieldTestEntityFormService = TestBed.inject(FieldTestEntityFormService);
    fieldTestEntityService = TestBed.inject(FieldTestEntityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fieldTestEntity: IFieldTestEntity = { id: 'CBA' };

      activatedRoute.data = of({ fieldTestEntity });
      comp.ngOnInit();

      expect(comp.fieldTestEntity).toEqual(fieldTestEntity);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestEntity>>();
      const fieldTestEntity = { id: 'ABC' };
      jest.spyOn(fieldTestEntityFormService, 'getFieldTestEntity').mockReturnValue(fieldTestEntity);
      jest.spyOn(fieldTestEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fieldTestEntity }));
      saveSubject.complete();

      // THEN
      expect(fieldTestEntityFormService.getFieldTestEntity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fieldTestEntityService.update).toHaveBeenCalledWith(expect.objectContaining(fieldTestEntity));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestEntity>>();
      const fieldTestEntity = { id: 'ABC' };
      jest.spyOn(fieldTestEntityFormService, 'getFieldTestEntity').mockReturnValue({ id: null });
      jest.spyOn(fieldTestEntityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestEntity: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fieldTestEntity }));
      saveSubject.complete();

      // THEN
      expect(fieldTestEntityFormService.getFieldTestEntity).toHaveBeenCalled();
      expect(fieldTestEntityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestEntity>>();
      const fieldTestEntity = { id: 'ABC' };
      jest.spyOn(fieldTestEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fieldTestEntityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
