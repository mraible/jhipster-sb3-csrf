import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DivisionFormService } from './division-form.service';
import { DivisionService } from '../service/division.service';
import { IDivision } from '../division.model';

import { DivisionUpdateComponent } from './division-update.component';

describe('Division Management Update Component', () => {
  let comp: DivisionUpdateComponent;
  let fixture: ComponentFixture<DivisionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let divisionFormService: DivisionFormService;
  let divisionService: DivisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DivisionUpdateComponent],
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
      .overrideTemplate(DivisionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DivisionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    divisionFormService = TestBed.inject(DivisionFormService);
    divisionService = TestBed.inject(DivisionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const division: IDivision = { id: 'CBA' };

      activatedRoute.data = of({ division });
      comp.ngOnInit();

      expect(comp.division).toEqual(division);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDivision>>();
      const division = { id: 'ABC' };
      jest.spyOn(divisionFormService, 'getDivision').mockReturnValue(division);
      jest.spyOn(divisionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ division });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: division }));
      saveSubject.complete();

      // THEN
      expect(divisionFormService.getDivision).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(divisionService.update).toHaveBeenCalledWith(expect.objectContaining(division));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDivision>>();
      const division = { id: 'ABC' };
      jest.spyOn(divisionFormService, 'getDivision').mockReturnValue({ id: null });
      jest.spyOn(divisionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ division: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: division }));
      saveSubject.complete();

      // THEN
      expect(divisionFormService.getDivision).toHaveBeenCalled();
      expect(divisionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDivision>>();
      const division = { id: 'ABC' };
      jest.spyOn(divisionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ division });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(divisionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
