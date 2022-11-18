import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PlaceFormService } from './place-form.service';
import { PlaceService } from '../service/place.service';
import { IPlace } from '../place.model';
import { IDivision } from 'app/entities/test-root/division/division.model';
import { DivisionService } from 'app/entities/test-root/division/service/division.service';

import { PlaceUpdateComponent } from './place-update.component';

describe('Place Management Update Component', () => {
  let comp: PlaceUpdateComponent;
  let fixture: ComponentFixture<PlaceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let placeFormService: PlaceFormService;
  let placeService: PlaceService;
  let divisionService: DivisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PlaceUpdateComponent],
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
      .overrideTemplate(PlaceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlaceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    placeFormService = TestBed.inject(PlaceFormService);
    placeService = TestBed.inject(PlaceService);
    divisionService = TestBed.inject(DivisionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Division query and add missing value', () => {
      const place: IPlace = { id: 'CBA' };
      const preferredDivisions: IDivision[] = [{ id: '5a815851-0b5b-4050-a3fb-9f6b55f4642c' }];
      place.preferredDivisions = preferredDivisions;
      const owner: IDivision = { id: '3e17127f-01b1-4875-8a3d-fc48c86d40e5' };
      place.owner = owner;

      const divisionCollection: IDivision[] = [{ id: 'b3a82381-4ab4-4ac0-bf22-35cdc84e0b55' }];
      jest.spyOn(divisionService, 'query').mockReturnValue(of(new HttpResponse({ body: divisionCollection })));
      const additionalDivisions = [...preferredDivisions, owner];
      const expectedCollection: IDivision[] = [...additionalDivisions, ...divisionCollection];
      jest.spyOn(divisionService, 'addDivisionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ place });
      comp.ngOnInit();

      expect(divisionService.query).toHaveBeenCalled();
      expect(divisionService.addDivisionToCollectionIfMissing).toHaveBeenCalledWith(
        divisionCollection,
        ...additionalDivisions.map(expect.objectContaining)
      );
      expect(comp.divisionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const place: IPlace = { id: 'CBA' };
      const preferredDivision: IDivision = { id: 'a5eb04e5-677f-4764-a01e-351d6dce9710' };
      place.preferredDivisions = [preferredDivision];
      const owner: IDivision = { id: '702fa415-e268-4d6e-8982-25017d987cfa' };
      place.owner = owner;

      activatedRoute.data = of({ place });
      comp.ngOnInit();

      expect(comp.divisionsSharedCollection).toContain(preferredDivision);
      expect(comp.divisionsSharedCollection).toContain(owner);
      expect(comp.place).toEqual(place);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlace>>();
      const place = { id: 'ABC' };
      jest.spyOn(placeFormService, 'getPlace').mockReturnValue(place);
      jest.spyOn(placeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ place });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: place }));
      saveSubject.complete();

      // THEN
      expect(placeFormService.getPlace).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(placeService.update).toHaveBeenCalledWith(expect.objectContaining(place));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlace>>();
      const place = { id: 'ABC' };
      jest.spyOn(placeFormService, 'getPlace').mockReturnValue({ id: null });
      jest.spyOn(placeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ place: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: place }));
      saveSubject.complete();

      // THEN
      expect(placeFormService.getPlace).toHaveBeenCalled();
      expect(placeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlace>>();
      const place = { id: 'ABC' };
      jest.spyOn(placeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ place });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(placeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDivision', () => {
      it('Should forward to divisionService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(divisionService, 'compareDivision');
        comp.compareDivision(entity, entity2);
        expect(divisionService.compareDivision).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
