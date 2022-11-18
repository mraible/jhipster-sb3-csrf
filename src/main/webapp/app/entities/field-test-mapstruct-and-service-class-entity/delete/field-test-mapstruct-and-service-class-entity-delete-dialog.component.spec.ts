jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FieldTestMapstructAndServiceClassEntityService } from '../service/field-test-mapstruct-and-service-class-entity.service';

import { FieldTestMapstructAndServiceClassEntityDeleteDialogComponent } from './field-test-mapstruct-and-service-class-entity-delete-dialog.component';

describe('FieldTestMapstructAndServiceClassEntity Management Delete Component', () => {
  let comp: FieldTestMapstructAndServiceClassEntityDeleteDialogComponent;
  let fixture: ComponentFixture<FieldTestMapstructAndServiceClassEntityDeleteDialogComponent>;
  let service: FieldTestMapstructAndServiceClassEntityService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FieldTestMapstructAndServiceClassEntityDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(FieldTestMapstructAndServiceClassEntityDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FieldTestMapstructAndServiceClassEntityDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FieldTestMapstructAndServiceClassEntityService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete('ABC');
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith('ABC');
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
