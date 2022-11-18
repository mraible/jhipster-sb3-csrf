import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EntityWithServiceImplAndDTOFormService } from './entity-with-service-impl-and-dto-form.service';
import { EntityWithServiceImplAndDTOService } from '../service/entity-with-service-impl-and-dto.service';
import { IEntityWithServiceImplAndDTO } from '../entity-with-service-impl-and-dto.model';

import { EntityWithServiceImplAndDTOUpdateComponent } from './entity-with-service-impl-and-dto-update.component';

describe('EntityWithServiceImplAndDTO Management Update Component', () => {
  let comp: EntityWithServiceImplAndDTOUpdateComponent;
  let fixture: ComponentFixture<EntityWithServiceImplAndDTOUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let entityWithServiceImplAndDTOFormService: EntityWithServiceImplAndDTOFormService;
  let entityWithServiceImplAndDTOService: EntityWithServiceImplAndDTOService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EntityWithServiceImplAndDTOUpdateComponent],
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
      .overrideTemplate(EntityWithServiceImplAndDTOUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntityWithServiceImplAndDTOUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    entityWithServiceImplAndDTOFormService = TestBed.inject(EntityWithServiceImplAndDTOFormService);
    entityWithServiceImplAndDTOService = TestBed.inject(EntityWithServiceImplAndDTOService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const entityWithServiceImplAndDTO: IEntityWithServiceImplAndDTO = { id: 'CBA' };

      activatedRoute.data = of({ entityWithServiceImplAndDTO });
      comp.ngOnInit();

      expect(comp.entityWithServiceImplAndDTO).toEqual(entityWithServiceImplAndDTO);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithServiceImplAndDTO>>();
      const entityWithServiceImplAndDTO = { id: 'ABC' };
      jest.spyOn(entityWithServiceImplAndDTOFormService, 'getEntityWithServiceImplAndDTO').mockReturnValue(entityWithServiceImplAndDTO);
      jest.spyOn(entityWithServiceImplAndDTOService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithServiceImplAndDTO });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entityWithServiceImplAndDTO }));
      saveSubject.complete();

      // THEN
      expect(entityWithServiceImplAndDTOFormService.getEntityWithServiceImplAndDTO).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(entityWithServiceImplAndDTOService.update).toHaveBeenCalledWith(expect.objectContaining(entityWithServiceImplAndDTO));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithServiceImplAndDTO>>();
      const entityWithServiceImplAndDTO = { id: 'ABC' };
      jest.spyOn(entityWithServiceImplAndDTOFormService, 'getEntityWithServiceImplAndDTO').mockReturnValue({ id: null });
      jest.spyOn(entityWithServiceImplAndDTOService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithServiceImplAndDTO: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entityWithServiceImplAndDTO }));
      saveSubject.complete();

      // THEN
      expect(entityWithServiceImplAndDTOFormService.getEntityWithServiceImplAndDTO).toHaveBeenCalled();
      expect(entityWithServiceImplAndDTOService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithServiceImplAndDTO>>();
      const entityWithServiceImplAndDTO = { id: 'ABC' };
      jest.spyOn(entityWithServiceImplAndDTOService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithServiceImplAndDTO });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(entityWithServiceImplAndDTOService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
