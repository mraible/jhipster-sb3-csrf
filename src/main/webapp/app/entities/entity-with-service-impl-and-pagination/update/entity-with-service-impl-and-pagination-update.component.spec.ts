import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EntityWithServiceImplAndPaginationFormService } from './entity-with-service-impl-and-pagination-form.service';
import { EntityWithServiceImplAndPaginationService } from '../service/entity-with-service-impl-and-pagination.service';
import { IEntityWithServiceImplAndPagination } from '../entity-with-service-impl-and-pagination.model';

import { EntityWithServiceImplAndPaginationUpdateComponent } from './entity-with-service-impl-and-pagination-update.component';

describe('EntityWithServiceImplAndPagination Management Update Component', () => {
  let comp: EntityWithServiceImplAndPaginationUpdateComponent;
  let fixture: ComponentFixture<EntityWithServiceImplAndPaginationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let entityWithServiceImplAndPaginationFormService: EntityWithServiceImplAndPaginationFormService;
  let entityWithServiceImplAndPaginationService: EntityWithServiceImplAndPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EntityWithServiceImplAndPaginationUpdateComponent],
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
      .overrideTemplate(EntityWithServiceImplAndPaginationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntityWithServiceImplAndPaginationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    entityWithServiceImplAndPaginationFormService = TestBed.inject(EntityWithServiceImplAndPaginationFormService);
    entityWithServiceImplAndPaginationService = TestBed.inject(EntityWithServiceImplAndPaginationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const entityWithServiceImplAndPagination: IEntityWithServiceImplAndPagination = { id: 'CBA' };

      activatedRoute.data = of({ entityWithServiceImplAndPagination });
      comp.ngOnInit();

      expect(comp.entityWithServiceImplAndPagination).toEqual(entityWithServiceImplAndPagination);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithServiceImplAndPagination>>();
      const entityWithServiceImplAndPagination = { id: 'ABC' };
      jest
        .spyOn(entityWithServiceImplAndPaginationFormService, 'getEntityWithServiceImplAndPagination')
        .mockReturnValue(entityWithServiceImplAndPagination);
      jest.spyOn(entityWithServiceImplAndPaginationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithServiceImplAndPagination });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entityWithServiceImplAndPagination }));
      saveSubject.complete();

      // THEN
      expect(entityWithServiceImplAndPaginationFormService.getEntityWithServiceImplAndPagination).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(entityWithServiceImplAndPaginationService.update).toHaveBeenCalledWith(
        expect.objectContaining(entityWithServiceImplAndPagination)
      );
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithServiceImplAndPagination>>();
      const entityWithServiceImplAndPagination = { id: 'ABC' };
      jest.spyOn(entityWithServiceImplAndPaginationFormService, 'getEntityWithServiceImplAndPagination').mockReturnValue({ id: null });
      jest.spyOn(entityWithServiceImplAndPaginationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithServiceImplAndPagination: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entityWithServiceImplAndPagination }));
      saveSubject.complete();

      // THEN
      expect(entityWithServiceImplAndPaginationFormService.getEntityWithServiceImplAndPagination).toHaveBeenCalled();
      expect(entityWithServiceImplAndPaginationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithServiceImplAndPagination>>();
      const entityWithServiceImplAndPagination = { id: 'ABC' };
      jest.spyOn(entityWithServiceImplAndPaginationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithServiceImplAndPagination });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(entityWithServiceImplAndPaginationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
