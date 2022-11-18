import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EntityWithServiceClassAndPaginationFormService } from './entity-with-service-class-and-pagination-form.service';
import { EntityWithServiceClassAndPaginationService } from '../service/entity-with-service-class-and-pagination.service';
import { IEntityWithServiceClassAndPagination } from '../entity-with-service-class-and-pagination.model';

import { EntityWithServiceClassAndPaginationUpdateComponent } from './entity-with-service-class-and-pagination-update.component';

describe('EntityWithServiceClassAndPagination Management Update Component', () => {
  let comp: EntityWithServiceClassAndPaginationUpdateComponent;
  let fixture: ComponentFixture<EntityWithServiceClassAndPaginationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let entityWithServiceClassAndPaginationFormService: EntityWithServiceClassAndPaginationFormService;
  let entityWithServiceClassAndPaginationService: EntityWithServiceClassAndPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EntityWithServiceClassAndPaginationUpdateComponent],
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
      .overrideTemplate(EntityWithServiceClassAndPaginationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntityWithServiceClassAndPaginationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    entityWithServiceClassAndPaginationFormService = TestBed.inject(EntityWithServiceClassAndPaginationFormService);
    entityWithServiceClassAndPaginationService = TestBed.inject(EntityWithServiceClassAndPaginationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const entityWithServiceClassAndPagination: IEntityWithServiceClassAndPagination = { id: 'CBA' };

      activatedRoute.data = of({ entityWithServiceClassAndPagination });
      comp.ngOnInit();

      expect(comp.entityWithServiceClassAndPagination).toEqual(entityWithServiceClassAndPagination);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithServiceClassAndPagination>>();
      const entityWithServiceClassAndPagination = { id: 'ABC' };
      jest
        .spyOn(entityWithServiceClassAndPaginationFormService, 'getEntityWithServiceClassAndPagination')
        .mockReturnValue(entityWithServiceClassAndPagination);
      jest.spyOn(entityWithServiceClassAndPaginationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithServiceClassAndPagination });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entityWithServiceClassAndPagination }));
      saveSubject.complete();

      // THEN
      expect(entityWithServiceClassAndPaginationFormService.getEntityWithServiceClassAndPagination).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(entityWithServiceClassAndPaginationService.update).toHaveBeenCalledWith(
        expect.objectContaining(entityWithServiceClassAndPagination)
      );
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithServiceClassAndPagination>>();
      const entityWithServiceClassAndPagination = { id: 'ABC' };
      jest.spyOn(entityWithServiceClassAndPaginationFormService, 'getEntityWithServiceClassAndPagination').mockReturnValue({ id: null });
      jest.spyOn(entityWithServiceClassAndPaginationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithServiceClassAndPagination: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entityWithServiceClassAndPagination }));
      saveSubject.complete();

      // THEN
      expect(entityWithServiceClassAndPaginationFormService.getEntityWithServiceClassAndPagination).toHaveBeenCalled();
      expect(entityWithServiceClassAndPaginationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithServiceClassAndPagination>>();
      const entityWithServiceClassAndPagination = { id: 'ABC' };
      jest.spyOn(entityWithServiceClassAndPaginationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithServiceClassAndPagination });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(entityWithServiceClassAndPaginationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
