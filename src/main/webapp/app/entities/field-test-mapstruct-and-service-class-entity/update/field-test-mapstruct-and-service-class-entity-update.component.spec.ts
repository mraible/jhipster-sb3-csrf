import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FieldTestMapstructAndServiceClassEntityFormService } from './field-test-mapstruct-and-service-class-entity-form.service';
import { FieldTestMapstructAndServiceClassEntityService } from '../service/field-test-mapstruct-and-service-class-entity.service';
import { IFieldTestMapstructAndServiceClassEntity } from '../field-test-mapstruct-and-service-class-entity.model';

import { FieldTestMapstructAndServiceClassEntityUpdateComponent } from './field-test-mapstruct-and-service-class-entity-update.component';

describe('FieldTestMapstructAndServiceClassEntity Management Update Component', () => {
  let comp: FieldTestMapstructAndServiceClassEntityUpdateComponent;
  let fixture: ComponentFixture<FieldTestMapstructAndServiceClassEntityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fieldTestMapstructAndServiceClassEntityFormService: FieldTestMapstructAndServiceClassEntityFormService;
  let fieldTestMapstructAndServiceClassEntityService: FieldTestMapstructAndServiceClassEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FieldTestMapstructAndServiceClassEntityUpdateComponent],
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
      .overrideTemplate(FieldTestMapstructAndServiceClassEntityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FieldTestMapstructAndServiceClassEntityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fieldTestMapstructAndServiceClassEntityFormService = TestBed.inject(FieldTestMapstructAndServiceClassEntityFormService);
    fieldTestMapstructAndServiceClassEntityService = TestBed.inject(FieldTestMapstructAndServiceClassEntityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fieldTestMapstructAndServiceClassEntity: IFieldTestMapstructAndServiceClassEntity = { id: 'CBA' };

      activatedRoute.data = of({ fieldTestMapstructAndServiceClassEntity });
      comp.ngOnInit();

      expect(comp.fieldTestMapstructAndServiceClassEntity).toEqual(fieldTestMapstructAndServiceClassEntity);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestMapstructAndServiceClassEntity>>();
      const fieldTestMapstructAndServiceClassEntity = { id: 'ABC' };
      jest
        .spyOn(fieldTestMapstructAndServiceClassEntityFormService, 'getFieldTestMapstructAndServiceClassEntity')
        .mockReturnValue(fieldTestMapstructAndServiceClassEntity);
      jest.spyOn(fieldTestMapstructAndServiceClassEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestMapstructAndServiceClassEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fieldTestMapstructAndServiceClassEntity }));
      saveSubject.complete();

      // THEN
      expect(fieldTestMapstructAndServiceClassEntityFormService.getFieldTestMapstructAndServiceClassEntity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fieldTestMapstructAndServiceClassEntityService.update).toHaveBeenCalledWith(
        expect.objectContaining(fieldTestMapstructAndServiceClassEntity)
      );
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestMapstructAndServiceClassEntity>>();
      const fieldTestMapstructAndServiceClassEntity = { id: 'ABC' };
      jest
        .spyOn(fieldTestMapstructAndServiceClassEntityFormService, 'getFieldTestMapstructAndServiceClassEntity')
        .mockReturnValue({ id: null });
      jest.spyOn(fieldTestMapstructAndServiceClassEntityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestMapstructAndServiceClassEntity: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fieldTestMapstructAndServiceClassEntity }));
      saveSubject.complete();

      // THEN
      expect(fieldTestMapstructAndServiceClassEntityFormService.getFieldTestMapstructAndServiceClassEntity).toHaveBeenCalled();
      expect(fieldTestMapstructAndServiceClassEntityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestMapstructAndServiceClassEntity>>();
      const fieldTestMapstructAndServiceClassEntity = { id: 'ABC' };
      jest.spyOn(fieldTestMapstructAndServiceClassEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestMapstructAndServiceClassEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fieldTestMapstructAndServiceClassEntityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
