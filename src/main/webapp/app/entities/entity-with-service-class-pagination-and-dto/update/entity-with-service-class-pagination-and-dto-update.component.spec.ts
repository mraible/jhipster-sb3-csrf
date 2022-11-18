import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EntityWithServiceClassPaginationAndDTOFormService } from './entity-with-service-class-pagination-and-dto-form.service';
import { EntityWithServiceClassPaginationAndDTOService } from '../service/entity-with-service-class-pagination-and-dto.service';
import { IEntityWithServiceClassPaginationAndDTO } from '../entity-with-service-class-pagination-and-dto.model';

import { EntityWithServiceClassPaginationAndDTOUpdateComponent } from './entity-with-service-class-pagination-and-dto-update.component';

describe('EntityWithServiceClassPaginationAndDTO Management Update Component', () => {
  let comp: EntityWithServiceClassPaginationAndDTOUpdateComponent;
  let fixture: ComponentFixture<EntityWithServiceClassPaginationAndDTOUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let entityWithServiceClassPaginationAndDTOFormService: EntityWithServiceClassPaginationAndDTOFormService;
  let entityWithServiceClassPaginationAndDTOService: EntityWithServiceClassPaginationAndDTOService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EntityWithServiceClassPaginationAndDTOUpdateComponent],
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
      .overrideTemplate(EntityWithServiceClassPaginationAndDTOUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntityWithServiceClassPaginationAndDTOUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    entityWithServiceClassPaginationAndDTOFormService = TestBed.inject(EntityWithServiceClassPaginationAndDTOFormService);
    entityWithServiceClassPaginationAndDTOService = TestBed.inject(EntityWithServiceClassPaginationAndDTOService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const entityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO = { id: 'CBA' };

      activatedRoute.data = of({ entityWithServiceClassPaginationAndDTO });
      comp.ngOnInit();

      expect(comp.entityWithServiceClassPaginationAndDTO).toEqual(entityWithServiceClassPaginationAndDTO);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithServiceClassPaginationAndDTO>>();
      const entityWithServiceClassPaginationAndDTO = { id: 'ABC' };
      jest
        .spyOn(entityWithServiceClassPaginationAndDTOFormService, 'getEntityWithServiceClassPaginationAndDTO')
        .mockReturnValue(entityWithServiceClassPaginationAndDTO);
      jest.spyOn(entityWithServiceClassPaginationAndDTOService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithServiceClassPaginationAndDTO });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entityWithServiceClassPaginationAndDTO }));
      saveSubject.complete();

      // THEN
      expect(entityWithServiceClassPaginationAndDTOFormService.getEntityWithServiceClassPaginationAndDTO).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(entityWithServiceClassPaginationAndDTOService.update).toHaveBeenCalledWith(
        expect.objectContaining(entityWithServiceClassPaginationAndDTO)
      );
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithServiceClassPaginationAndDTO>>();
      const entityWithServiceClassPaginationAndDTO = { id: 'ABC' };
      jest
        .spyOn(entityWithServiceClassPaginationAndDTOFormService, 'getEntityWithServiceClassPaginationAndDTO')
        .mockReturnValue({ id: null });
      jest.spyOn(entityWithServiceClassPaginationAndDTOService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithServiceClassPaginationAndDTO: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entityWithServiceClassPaginationAndDTO }));
      saveSubject.complete();

      // THEN
      expect(entityWithServiceClassPaginationAndDTOFormService.getEntityWithServiceClassPaginationAndDTO).toHaveBeenCalled();
      expect(entityWithServiceClassPaginationAndDTOService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithServiceClassPaginationAndDTO>>();
      const entityWithServiceClassPaginationAndDTO = { id: 'ABC' };
      jest.spyOn(entityWithServiceClassPaginationAndDTOService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithServiceClassPaginationAndDTO });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(entityWithServiceClassPaginationAndDTOService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
