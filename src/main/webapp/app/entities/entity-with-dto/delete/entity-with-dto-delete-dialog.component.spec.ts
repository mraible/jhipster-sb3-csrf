jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EntityWithDTOService } from '../service/entity-with-dto.service';

import { EntityWithDTODeleteDialogComponent } from './entity-with-dto-delete-dialog.component';

describe('EntityWithDTO Management Delete Component', () => {
  let comp: EntityWithDTODeleteDialogComponent;
  let fixture: ComponentFixture<EntityWithDTODeleteDialogComponent>;
  let service: EntityWithDTOService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EntityWithDTODeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(EntityWithDTODeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EntityWithDTODeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EntityWithDTOService);
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
