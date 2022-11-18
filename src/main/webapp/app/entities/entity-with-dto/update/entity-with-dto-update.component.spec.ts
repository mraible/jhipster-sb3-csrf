import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EntityWithDTOFormService } from './entity-with-dto-form.service';
import { EntityWithDTOService } from '../service/entity-with-dto.service';
import { IEntityWithDTO } from '../entity-with-dto.model';

import { EntityWithDTOUpdateComponent } from './entity-with-dto-update.component';

describe('EntityWithDTO Management Update Component', () => {
  let comp: EntityWithDTOUpdateComponent;
  let fixture: ComponentFixture<EntityWithDTOUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let entityWithDTOFormService: EntityWithDTOFormService;
  let entityWithDTOService: EntityWithDTOService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EntityWithDTOUpdateComponent],
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
      .overrideTemplate(EntityWithDTOUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntityWithDTOUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    entityWithDTOFormService = TestBed.inject(EntityWithDTOFormService);
    entityWithDTOService = TestBed.inject(EntityWithDTOService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const entityWithDTO: IEntityWithDTO = { id: 'CBA' };

      activatedRoute.data = of({ entityWithDTO });
      comp.ngOnInit();

      expect(comp.entityWithDTO).toEqual(entityWithDTO);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithDTO>>();
      const entityWithDTO = { id: 'ABC' };
      jest.spyOn(entityWithDTOFormService, 'getEntityWithDTO').mockReturnValue(entityWithDTO);
      jest.spyOn(entityWithDTOService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithDTO });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entityWithDTO }));
      saveSubject.complete();

      // THEN
      expect(entityWithDTOFormService.getEntityWithDTO).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(entityWithDTOService.update).toHaveBeenCalledWith(expect.objectContaining(entityWithDTO));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithDTO>>();
      const entityWithDTO = { id: 'ABC' };
      jest.spyOn(entityWithDTOFormService, 'getEntityWithDTO').mockReturnValue({ id: null });
      jest.spyOn(entityWithDTOService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithDTO: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entityWithDTO }));
      saveSubject.complete();

      // THEN
      expect(entityWithDTOFormService.getEntityWithDTO).toHaveBeenCalled();
      expect(entityWithDTOService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntityWithDTO>>();
      const entityWithDTO = { id: 'ABC' };
      jest.spyOn(entityWithDTOService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entityWithDTO });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(entityWithDTOService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
