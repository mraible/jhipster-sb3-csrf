import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EntityWithPaginationAndDTOFormService } from './entity-with-pagination-and-dto-form.service';
import { EntityWithPaginationAndDTOService } from '../service/entity-with-pagination-and-dto.service';
import { IEntityWithPaginationAndDTO } from '../entity-with-pagination-and-dto.model';

import { EntityWithPaginationAndDTOUpdateComponent } from './entity-with-pagination-and-dto-update.component';

describe('EntityWithPaginationAndDTO Management Update Component', () => {
  let comp: EntityWithPaginationAndDTOUpdateComponent;
  let fixture: ComponentFixture<EntityWithPaginationAndDTOUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let entityWithPaginationAndDTOFormService: EntityWithPaginationAndDTOFormService;
  let entityWithPaginationAndDTOService: EntityWithPaginationAndDTOService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EntityWithPaginationAndDTOUpdateComponent],
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
      .overrideTemplate(EntityWithPaginationAndDTOUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntityWithPaginationAndDTOUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    entityWithPaginationAndDTOFormService = TestBed.inject(EntityWithPaginationAndDTOFormService);
    entityWithPaginationAndDTOService = TestBed.inject(EntityWithPaginationAndDTOService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const entityWithPaginationAndDTO: IEntityWithPaginationAndDTO = { id: 'CBA' };

      activatedRoute.data = of({ entityWithPaginationAndDTO });
      comp.ngOnInit();

      expect(comp.entityWithPaginationAndDTO).toEqual(entityWithPaginationAndDTO);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithPaginationAndDTO>>();
      const entityWithPaginationAndDTO = { id: 'ABC' };
      jest.spyOn(entityWithPaginationAndDTOFormService, 'getEntityWithPaginationAndDTO').mockReturnValue(entityWithPaginationAndDTO);
      jest.spyOn(entityWithPaginationAndDTOService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithPaginationAndDTO });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entityWithPaginationAndDTO }));
      saveSubject.complete();

      // THEN
      expect(entityWithPaginationAndDTOFormService.getEntityWithPaginationAndDTO).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(entityWithPaginationAndDTOService.update).toHaveBeenCalledWith(expect.objectContaining(entityWithPaginationAndDTO));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithPaginationAndDTO>>();
      const entityWithPaginationAndDTO = { id: 'ABC' };
      jest.spyOn(entityWithPaginationAndDTOFormService, 'getEntityWithPaginationAndDTO').mockReturnValue({ id: null });
      jest.spyOn(entityWithPaginationAndDTOService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithPaginationAndDTO: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entityWithPaginationAndDTO }));
      saveSubject.complete();

      // THEN
      expect(entityWithPaginationAndDTOFormService.getEntityWithPaginationAndDTO).toHaveBeenCalled();
      expect(entityWithPaginationAndDTOService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithPaginationAndDTO>>();
      const entityWithPaginationAndDTO = { id: 'ABC' };
      jest.spyOn(entityWithPaginationAndDTOService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithPaginationAndDTO });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(entityWithPaginationAndDTOService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
