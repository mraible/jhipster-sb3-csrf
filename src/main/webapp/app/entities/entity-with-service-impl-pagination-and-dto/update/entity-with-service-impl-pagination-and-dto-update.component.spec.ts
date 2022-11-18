import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EntityWithServiceImplPaginationAndDTOFormService } from './entity-with-service-impl-pagination-and-dto-form.service';
import { EntityWithServiceImplPaginationAndDTOService } from '../service/entity-with-service-impl-pagination-and-dto.service';
import { IEntityWithServiceImplPaginationAndDTO } from '../entity-with-service-impl-pagination-and-dto.model';

import { EntityWithServiceImplPaginationAndDTOUpdateComponent } from './entity-with-service-impl-pagination-and-dto-update.component';

describe('EntityWithServiceImplPaginationAndDTO Management Update Component', () => {
  let comp: EntityWithServiceImplPaginationAndDTOUpdateComponent;
  let fixture: ComponentFixture<EntityWithServiceImplPaginationAndDTOUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let entityWithServiceImplPaginationAndDTOFormService: EntityWithServiceImplPaginationAndDTOFormService;
  let entityWithServiceImplPaginationAndDTOService: EntityWithServiceImplPaginationAndDTOService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EntityWithServiceImplPaginationAndDTOUpdateComponent],
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
      .overrideTemplate(EntityWithServiceImplPaginationAndDTOUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntityWithServiceImplPaginationAndDTOUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    entityWithServiceImplPaginationAndDTOFormService = TestBed.inject(EntityWithServiceImplPaginationAndDTOFormService);
    entityWithServiceImplPaginationAndDTOService = TestBed.inject(EntityWithServiceImplPaginationAndDTOService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const entityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO = { id: 'CBA' };

      activatedRoute.data = of({ entityWithServiceImplPaginationAndDTO });
      comp.ngOnInit();

      expect(comp.entityWithServiceImplPaginationAndDTO).toEqual(entityWithServiceImplPaginationAndDTO);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithServiceImplPaginationAndDTO>>();
      const entityWithServiceImplPaginationAndDTO = { id: 'ABC' };
      jest
        .spyOn(entityWithServiceImplPaginationAndDTOFormService, 'getEntityWithServiceImplPaginationAndDTO')
        .mockReturnValue(entityWithServiceImplPaginationAndDTO);
      jest.spyOn(entityWithServiceImplPaginationAndDTOService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithServiceImplPaginationAndDTO });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entityWithServiceImplPaginationAndDTO }));
      saveSubject.complete();

      // THEN
      expect(entityWithServiceImplPaginationAndDTOFormService.getEntityWithServiceImplPaginationAndDTO).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(entityWithServiceImplPaginationAndDTOService.update).toHaveBeenCalledWith(
        expect.objectContaining(entityWithServiceImplPaginationAndDTO)
      );
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithServiceImplPaginationAndDTO>>();
      const entityWithServiceImplPaginationAndDTO = { id: 'ABC' };
      jest
        .spyOn(entityWithServiceImplPaginationAndDTOFormService, 'getEntityWithServiceImplPaginationAndDTO')
        .mockReturnValue({ id: null });
      jest.spyOn(entityWithServiceImplPaginationAndDTOService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithServiceImplPaginationAndDTO: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entityWithServiceImplPaginationAndDTO }));
      saveSubject.complete();

      // THEN
      expect(entityWithServiceImplPaginationAndDTOFormService.getEntityWithServiceImplPaginationAndDTO).toHaveBeenCalled();
      expect(entityWithServiceImplPaginationAndDTOService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithServiceImplPaginationAndDTO>>();
      const entityWithServiceImplPaginationAndDTO = { id: 'ABC' };
      jest.spyOn(entityWithServiceImplPaginationAndDTOService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithServiceImplPaginationAndDTO });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(entityWithServiceImplPaginationAndDTOService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
