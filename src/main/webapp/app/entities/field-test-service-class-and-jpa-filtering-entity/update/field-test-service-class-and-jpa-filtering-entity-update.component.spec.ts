import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FieldTestServiceClassAndJpaFilteringEntityFormService } from './field-test-service-class-and-jpa-filtering-entity-form.service';
import { FieldTestServiceClassAndJpaFilteringEntityService } from '../service/field-test-service-class-and-jpa-filtering-entity.service';
import { IFieldTestServiceClassAndJpaFilteringEntity } from '../field-test-service-class-and-jpa-filtering-entity.model';

import { FieldTestServiceClassAndJpaFilteringEntityUpdateComponent } from './field-test-service-class-and-jpa-filtering-entity-update.component';

describe('FieldTestServiceClassAndJpaFilteringEntity Management Update Component', () => {
  let comp: FieldTestServiceClassAndJpaFilteringEntityUpdateComponent;
  let fixture: ComponentFixture<FieldTestServiceClassAndJpaFilteringEntityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fieldTestServiceClassAndJpaFilteringEntityFormService: FieldTestServiceClassAndJpaFilteringEntityFormService;
  let fieldTestServiceClassAndJpaFilteringEntityService: FieldTestServiceClassAndJpaFilteringEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FieldTestServiceClassAndJpaFilteringEntityUpdateComponent],
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
      .overrideTemplate(FieldTestServiceClassAndJpaFilteringEntityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FieldTestServiceClassAndJpaFilteringEntityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fieldTestServiceClassAndJpaFilteringEntityFormService = TestBed.inject(FieldTestServiceClassAndJpaFilteringEntityFormService);
    fieldTestServiceClassAndJpaFilteringEntityService = TestBed.inject(FieldTestServiceClassAndJpaFilteringEntityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fieldTestServiceClassAndJpaFilteringEntity: IFieldTestServiceClassAndJpaFilteringEntity = { id: 'CBA' };

      activatedRoute.data = of({ fieldTestServiceClassAndJpaFilteringEntity });
      comp.ngOnInit();

      expect(comp.fieldTestServiceClassAndJpaFilteringEntity).toEqual(fieldTestServiceClassAndJpaFilteringEntity);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestServiceClassAndJpaFilteringEntity>>();
      const fieldTestServiceClassAndJpaFilteringEntity = { id: 'ABC' };
      jest
        .spyOn(fieldTestServiceClassAndJpaFilteringEntityFormService, 'getFieldTestServiceClassAndJpaFilteringEntity')
        .mockReturnValue(fieldTestServiceClassAndJpaFilteringEntity);
      jest.spyOn(fieldTestServiceClassAndJpaFilteringEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestServiceClassAndJpaFilteringEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fieldTestServiceClassAndJpaFilteringEntity }));
      saveSubject.complete();

      // THEN
      expect(fieldTestServiceClassAndJpaFilteringEntityFormService.getFieldTestServiceClassAndJpaFilteringEntity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fieldTestServiceClassAndJpaFilteringEntityService.update).toHaveBeenCalledWith(
        expect.objectContaining(fieldTestServiceClassAndJpaFilteringEntity)
      );
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestServiceClassAndJpaFilteringEntity>>();
      const fieldTestServiceClassAndJpaFilteringEntity = { id: 'ABC' };
      jest
        .spyOn(fieldTestServiceClassAndJpaFilteringEntityFormService, 'getFieldTestServiceClassAndJpaFilteringEntity')
        .mockReturnValue({ id: null });
      jest.spyOn(fieldTestServiceClassAndJpaFilteringEntityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestServiceClassAndJpaFilteringEntity: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fieldTestServiceClassAndJpaFilteringEntity }));
      saveSubject.complete();

      // THEN
      expect(fieldTestServiceClassAndJpaFilteringEntityFormService.getFieldTestServiceClassAndJpaFilteringEntity).toHaveBeenCalled();
      expect(fieldTestServiceClassAndJpaFilteringEntityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldTestServiceClassAndJpaFilteringEntity>>();
      const fieldTestServiceClassAndJpaFilteringEntity = { id: 'ABC' };
      jest.spyOn(fieldTestServiceClassAndJpaFilteringEntityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldTestServiceClassAndJpaFilteringEntity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fieldTestServiceClassAndJpaFilteringEntityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
