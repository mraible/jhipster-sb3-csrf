import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FieldTestServiceImplEntityFormService } from './field-test-service-impl-entity-form.service';
import { FieldTestServiceImplEntityService } from '../service/field-test-service-impl-entity.service';
import { IFieldTestServiceImplEntity } from '../field-test-service-impl-entity.model';

import { FieldTestServiceImplEntityUpdateComponent } from './field-test-service-impl-entity-update.component';

describe('FieldTestServiceImplEntity Management Update Component', () => {
  let comp: FieldTestServiceImplEntityUpdateComponent;
  let fixture: ComponentFixture<FieldTestServiceImplEntityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fieldTestServiceImplEntityFormService: FieldTestServiceImplEntityFormService;
  let fieldTestServiceImplEntityService: FieldTestServiceImplEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FieldTestServiceImplEntityUpdateComponent],
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
      .overrideTemplate(FieldTestServiceImplEntityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FieldTestServiceImplEntityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fieldTestServiceImplEntityFormService = TestBed.inject(FieldTestServiceImplEntityFormService);
    fieldTestServiceImplEntityService = TestBed.inject(FieldTestServiceImplEntityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fieldTestServiceImplEntity: IFieldTestServiceImplEntity = { id: 'CBA' };

      activatedRoute.data = of({ fieldTestServiceImplEntity });
      comp.ngOnInit();

      expect(comp.fieldTestServiceImplEntity).toEqual(fieldTestServiceImplEntity);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestServiceImplEntity>>();
      const fieldTestServiceImplEntity = { id: 'ABC' };
      jest.spyOn(fieldTestServiceImplEntityFormService, 'getFieldTestServiceImplEntity').mockReturnValue(fieldTestServiceImplEntity);
      jest.spyOn(fieldTestServiceImplEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestServiceImplEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fieldTestServiceImplEntity }));
      saveSubject.complete();

      // THEN
      expect(fieldTestServiceImplEntityFormService.getFieldTestServiceImplEntity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fieldTestServiceImplEntityService.update).toHaveBeenCalledWith(expect.objectContaining(fieldTestServiceImplEntity));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestServiceImplEntity>>();
      const fieldTestServiceImplEntity = { id: 'ABC' };
      jest.spyOn(fieldTestServiceImplEntityFormService, 'getFieldTestServiceImplEntity').mockReturnValue({ id: null });
      jest.spyOn(fieldTestServiceImplEntityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestServiceImplEntity: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fieldTestServiceImplEntity }));
      saveSubject.complete();

      // THEN
      expect(fieldTestServiceImplEntityFormService.getFieldTestServiceImplEntity).toHaveBeenCalled();
      expect(fieldTestServiceImplEntityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestServiceImplEntity>>();
      const fieldTestServiceImplEntity = { id: 'ABC' };
      jest.spyOn(fieldTestServiceImplEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestServiceImplEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fieldTestServiceImplEntityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
